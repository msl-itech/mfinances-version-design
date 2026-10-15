// Protections partagées : origine autorisée, limite de débit, laissez-passer reCAPTCHA.

const ALLOWED_HOSTS = [/^(www\.)?mfinances\.be$/, /\.lovable\.app$/, /\.lovableproject\.com$/, /^localhost$/, /^127\.0\.0\.1$/]

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  try {
    const host = new URL(origin).hostname
    return ALLOWED_HOSTS.some((re) => re.test(host))
  } catch {
    return false
  }
}

export function corsFor(req: Request): Record<string, string> {
  const origin = req.headers.get('origin')
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin(origin) ? origin! : 'https://mfinances.be',
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type, x-admin-password, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    Vary: 'Origin',
  }
}

// Limite en mémoire (par instance) : suffisant contre l'abus simple.
const buckets = new Map<string, number[]>()
export function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs)
  hits.push(now)
  buckets.set(key, hits)
  if (buckets.size > 5000) buckets.clear()
  return hits.length > max
}

export function clientIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('cf-connecting-ip') || 'unknown'
}

export function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder()
  const x = enc.encode(a), y = enc.encode(b)
  let diff = x.length ^ y.length
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0)
  return diff === 0
}

async function hmac(data: string): Promise<string> {
  const secret = Deno.env.get('HUMAN_PASS_SECRET') ?? ''
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Laissez-passer signé (15 min) délivré après un reCAPTCHA réussi. */
export async function issueHumanPass(): Promise<string> {
  const exp = String(Date.now() + 15 * 60 * 1000)
  return `${exp}.${await hmac(exp)}`
}

export async function verifyHumanPass(pass: unknown): Promise<boolean> {
  if (typeof pass !== 'string' || !Deno.env.get('HUMAN_PASS_SECRET')) return false
  const [exp, sig] = pass.split('.')
  if (!exp || !sig || Number(exp) < Date.now()) return false
  return timingSafeEqual(sig, await hmac(exp))
}
