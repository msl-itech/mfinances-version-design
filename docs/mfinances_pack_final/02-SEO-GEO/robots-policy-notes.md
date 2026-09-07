# Notes de politique robots — SEO / GEO

## Décision minimale recommandée
Ajouter `OAI-SearchBot` en `Allow: /` si MFINANCES souhaite que ses pages publiques puissent être découvertes et citées dans ChatGPT Search.

OpenAI distingue explicitement :
- **OAI-SearchBot** : découverte / présentation dans ChatGPT Search ;
- **GPTBot** : usage distinct lié à l'entraînement potentiel.

Le dépôt actuel autorise `GPTBot`, mais ne contient pas de règle explicite pour `OAI-SearchBot`. Le patch minimal fourni ne change donc pas la politique d'entraînement existante ; il ajoute seulement le crawler de recherche.

## Point à corriger dans les commentaires du robots actuel
Le commentaire `OPENAI (ChatGPT / GPT-4)` est trop vague : il mélange recherche, usage utilisateur et entraînement. Le remplacer par des commentaires séparés.

## Google
Ne pas considérer `Google-Extended` comme un substitut à Googlebot pour l'indexation Search. L'indexation web standard dépend de Googlebot. La politique Google-Extended doit être traitée séparément selon les objectifs de réutilisation de contenu.

## Sources officielles consultées le 25/08/2026
- OpenAI Publishers & Developers FAQ: https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Google Search Central — documentation et changelog: https://developers.google.com/search/updates
