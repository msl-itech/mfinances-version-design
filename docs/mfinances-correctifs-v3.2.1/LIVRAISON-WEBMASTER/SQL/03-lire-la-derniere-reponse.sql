-- Affiche la réponse du dernier appel à la fonction (scripts 02 et 04).
select created, status_code, content
from net._http_response
order by created desc
limit 1;
