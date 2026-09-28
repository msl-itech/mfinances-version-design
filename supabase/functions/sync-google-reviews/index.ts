// Edge function `sync-google-reviews` — synchronisation quotidienne des avis Google Business Profile.
//
// Sécurité : la fonction refuse toute exécution sans l'en-tête `x-sync-secret` valide.
// Ce secret est généré dans Supabase Vault par la migration et transmis uniquement par la
// tâche planifiée (pg_cron). Le site ne déclenche jamais cette fonction : il lit la base.
//
// Secrets requis :
//   GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN
//   GBP_LOCATION_NAME (obligatoire, format « accounts/123/locations/456 »)
//
// Corps de requête :
//   {}                   → synchronisation normale
//   { "discover": true } → liste les fiches du compte Google (pour trouver GBP_LOCATION_NAME),
//                          sans rien écrire en base.
//
// Un avis absent de Google n'est supprimé qu'après 3 synchronisations complètes et réussies
// consécutives où il manque (compteur missing_sync_count, remis à 0 dès qu'il réapparaît).
// En cas d'échec, les dernières données synchronisées restent en place : seuls
// last_attempt_at et last_error sont mis à jour.

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-sync-secret',
}

const STARS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function googleGet(url: string, token: string) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error(`Google ${res.status} sur ${url} : ${await res.text()}`)
  return res.json()
}

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: Deno.env.get('GOOGLE_OAUTH_CLIENT_ID') ?? '',
      client_secret: Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET') ?? '',
      refresh_token: Deno.env.get('GOOGLE_OAUTH_REFRESH_TOKEN') ?? '',
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  if (!res.ok || !data.access_token) throw new Error(`Jeton Google refusé : ${JSON.stringify(data)}`)
  return data.access_token
}

async function discoverLocations(token: string) {
  const accounts = await googleGet('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', token)
  const found: { location_name: string; title: string }[] = []
  for (const account of accounts.accounts ?? []) {
    const locs = await googleGet(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title&pageSize=100`,
      token,
    )
    for (const loc of locs.locations ?? []) {
      // loc.name = « locations/456 » → nom attendu par l'API avis : « accounts/123/locations/456 »
      found.push({ location_name: `${account.name}/${loc.name}`, title: loc.title ?? '' })
    }
  }
  return found
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ ok: false, error: 'Méthode non autorisée' }, 405)

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  // 1. Autorisation : seul le secret de synchronisation permet l'exécution.
  const candidate = req.headers.get('x-sync-secret')
  const { data: authorized, error: authError } = await supabase.rpc('verify_google_reviews_sync_secret', { candidate })
  if (authError || authorized !== true) return json({ ok: false, error: 'Non autorisé' }, 401)

  let body: { discover?: boolean } = {}
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const attemptAt = new Date().toISOString()

  try {
    const token = await getAccessToken()

    // Mode découverte : aide à renseigner GBP_LOCATION_NAME, n'écrit rien.
    if (body.discover) return json({ ok: true, mode: 'discover', locations: await discoverLocations(token) })

    const location = Deno.env.get('GBP_LOCATION_NAME')
    if (!location || !/^accounts\/[^/]+\/locations\/[^/]+$/.test(location)) {
      throw new Error('GBP_LOCATION_NAME manquant ou invalide (format attendu : accounts/123/locations/456).')
    }

    // 2. Récupération complète de tous les avis (50 par page).
    const rows: Record<string, unknown>[] = []
    let averageRating: number | null = null
    let totalReviewCount: number | null = null
    let pageToken = ''
    do {
      const url =
        `https://mybusiness.googleapis.com/v4/${location}/reviews?pageSize=50&orderBy=updateTime%20desc` +
        (pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '')
      const page = await googleGet(url, token)
      averageRating = page.averageRating ?? averageRating
      totalReviewCount = page.totalReviewCount ?? totalReviewCount
      for (const r of page.reviews ?? []) {
        rows.push({
          review_id: r.reviewId ?? r.name,
          reviewer_name: r.reviewer?.isAnonymous ? 'Utilisateur Google' : (r.reviewer?.displayName ?? 'Utilisateur Google'),
          rating: STARS[r.starRating] ?? 5,
          comment: typeof r.comment === 'string' ? r.comment : null, // verbatim Google, sans modification
          create_time: r.createTime ?? null,
          update_time: r.updateTime ?? null,
          synced_at: attemptAt,
          last_seen_at: attemptAt,
          missing_sync_count: 0, // présent sur Google : compteur d'absences remis à zéro
        })
      }
      pageToken = page.nextPageToken ?? ''
    } while (pageToken)

    // 3. Écriture : uniquement après une récupération complète réussie.
    if (rows.length > 0) {
      const { error } = await supabase.from('google_reviews').upsert(rows, { onConflict: 'review_id' })
      if (error) throw error
      // Suppression différée : chaque avis absent de cette récupération complète voit son compteur
      // d'absences augmenter de 1 ; il n'est supprimé qu'à 3 synchronisations réussies consécutives
      // où il manque. Une panne (aucune récupération complète) n'incrémente rien.
      const presentIds = rows.map((r) => String(r.review_id))
      const { error: missError } = await supabase.rpc('mark_missing_google_reviews', { present_ids: presentIds })
      if (missError) throw missError
    }

    const { error: sumError } = await supabase.from('google_reviews_summary').upsert({
      id: 1,
      average_rating: averageRating,
      total_review_count: totalReviewCount ?? rows.length,
      location_name: location,
      last_synced_at: attemptAt,
      last_attempt_at: attemptAt,
      last_error: null,
    })
    if (sumError) throw sumError

    return json({ ok: true, location, reviews: rows.length, averageRating, totalReviewCount })
  } catch (err) {
    console.error('[sync-google-reviews]', err)
    // Les dernières données synchronisées restent intactes ; on trace seulement l'échec.
    await supabase
      .from('google_reviews_summary')
      .upsert({ id: 1, last_attempt_at: attemptAt, last_error: String(err).slice(0, 2000) }, { onConflict: 'id' })
    return json({ ok: false, error: String(err) }, 500)
  }
})
