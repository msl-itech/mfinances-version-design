-- État de la synchronisation des avis Google.
select total_review_count, average_rating, location_name, last_synced_at, last_attempt_at, last_error
from public.google_reviews_summary;

-- Les 5 avis les plus récents enregistrés.
select reviewer_name, rating, left(comment, 80) as debut_du_commentaire, create_time
from public.google_reviews
order by create_time desc
limit 5;
