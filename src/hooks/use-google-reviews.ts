// Avis Google synchronisés automatiquement depuis l'API Google Business Profile.
// Les données sont écrites chaque jour dans Supabase par la fonction `sync-google-reviews`
// (déclenchée uniquement par la tâche planifiée) ; le site se contente de les lire.
//
// Comportement :
// 1. une synchronisation a déjà réussi → nombre d'avis, note et avis issus de Google ;
// 2. Google est temporairement indisponible → la base garde les dernières données synchronisées ;
// 3. aucune synchronisation réussie depuis plus de 30 jours, ou jamais → état neutre (« Avis Google vérifiés »,
//    sans nombre ni note) et, pour les carrousels, les avis de secours fournis par la page.

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteReview = { name: string; text: string };

export type GoogleReviewsData = {
  reviews: SiteReview[];
  /** Nombre total d'avis sur Google ; null tant qu'aucune synchronisation n'a réussi. */
  count: number | null;
  /** Note moyenne au format belge (ex. « 5,0 ») ; null tant qu'aucune synchronisation n'a réussi. */
  rating: string | null;
};

/** Au-delà de 30 jours sans synchronisation réussie, les données sont jugées périmées : état neutre. */
const MAX_AGE_DAYS = 30;

/** N'affiche dans les carrousels que les avis de 4 et 5 étoiles comportant un texte. */
const MIN_RATING = 4;

type RemoteData = { reviews: SiteReview[]; count: number | null; rating: string | null };

let cache: Promise<RemoteData | null> | null = null;

async function fetchRemote(): Promise<RemoteData | null> {
  try {
    // Les tables d'avis ne figurent pas (encore) dans les types générés du client Supabase.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    const [summaryRes, rowsRes] = await Promise.all([
      db
        .from("google_reviews_summary")
        .select("average_rating,total_review_count,last_synced_at")
        .eq("id", 1)
        .maybeSingle(),
      db
        .from("google_reviews")
        .select("reviewer_name,comment,rating,create_time")
        .gte("rating", MIN_RATING)
        .not("comment", "is", null)
        .order("create_time", { ascending: false })
        .limit(60),
    ]);
    const summary = summaryRes?.data;
    const syncedAt = summary?.last_synced_at ? new Date(summary.last_synced_at).getTime() : NaN;
    const synced = Number.isFinite(syncedAt) && Date.now() - syncedAt <= MAX_AGE_DAYS * 24 * 3600 * 1000;
    if (!synced) return { reviews: [], count: null, rating: null };
    const rows: { reviewer_name: string; comment: string | null }[] = rowsRes?.data ?? [];
    return {
      // Verbatim Google affiché tel quel ; la longueur est limitée à l'écran par CSS (line-clamp).
      reviews: rows
        .filter((r) => typeof r.comment === "string" && r.comment.trim().length > 0)
        .map((r) => ({ name: r.reviewer_name, text: r.comment as string })),
      count: synced && typeof summary?.total_review_count === "number" ? summary.total_review_count : null,
      rating:
        synced && summary?.average_rating != null
          ? Number(summary.average_rating).toFixed(1).replace(".", ",")
          : null,
    };
  } catch {
    return null;
  }
}

/** Texte de synthèse : « 24 avis Google · 5,0/5 », ou « Avis Google vérifiés » avant la première synchronisation. */
export function formatReviewSummary(count: number | null, rating: string | null): string {
  if (count == null) return "Avis Google vérifiés";
  const label = `${count} avis Google`;
  return rating ? `${label} · ${rating}/5` : label;
}

export function useGoogleReviews(fallbackReviews: SiteReview[] = []): GoogleReviewsData {
  const [data, setData] = useState<GoogleReviewsData>({ reviews: fallbackReviews, count: null, rating: null });

  useEffect(() => {
    let cancelled = false;
    if (!cache) cache = fetchRemote();
    cache.then((remote) => {
      if (cancelled || !remote) return;
      setData((prev) => ({
        reviews: remote.reviews.length > 0 ? remote.reviews : prev.reviews,
        count: remote.count,
        rating: remote.rating,
      }));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
