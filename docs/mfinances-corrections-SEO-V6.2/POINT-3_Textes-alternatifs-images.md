# POINT 3 — Textes alternatifs des images (version révisée)

## 1. En clair (pour Mika)
Le texte alternatif (`alt`) décrit une image pour **Google Images** et pour l'**accessibilité** (lecteurs d'écran). Bonne règle, meilleure que ma version initiale :

> **Décrire ce que l'image apporte en plus du texte autour. N'ajouter un service ou un lieu que s'il fait réellement partie du sens de l'image.** Une image purement **décorative** doit garder un `alt` **vide** (`alt=""`).

## 2. Verdict : tes `alt` sont déjà très bons — on ne touche presque à rien
Après relecture (et vérif accessibilité W3C), **la plupart de mes propositions initiales étaient de la sur-optimisation** — je les ai **retirées** pour ne pas dégrader l'accessibilité. Décisions finales :

| Élément | Décision |
|---|---|
| **Logos** (Header / Footer) | **Inchangé** → `alt="MFinances"`. Un logo se décrit par le nom, pas par des mots-clés SEO. |
| Photo « dirigeant face à ses chiffres » (À propos) | **Inchangé** → on ne rajoute pas « avec MFinances, Bruxelles » (ce serait inventé). |
| « Checklist trésorerie » / « Diagnostic trésorerie » | **Inchangé** → descriptions déjà correctes, pas de marque/lieu forcés. |
| « Dashboard KPI… » (Contrôle de gestion) | **Inchangé**. |
| **Avatars** « 200+ entreprises » (accueil) | **Laissés décoratifs** (`alt=""`) → c'est un groupe illustrant une preuve sociale ; y mettre 3 descriptions aurait ajouté du bruit pour les lecteurs d'écran. |
| Fond décoratif à 12 % (Qui nous accompagnons) | **Laissé `alt=""`** → c'est la bonne pratique pour une image décorative. |

## 3. La seule modification retenue
| Fichier : ligne | Avant | Après |
|---|---|---|
| `src/pages/AccueilV2.tsx` | `alt="Mika Musungayi"` | `alt="Mika Musungayi, fondateur de MFinances"` |

C'est le **seul** changement, parce qu'il **décrit réellement** le sujet de la photo (qui est sur l'image + son rôle), sans mot-clé artificiel.

## 4. À retenir
Ton site est déjà propre côté `alt`. Pas de chantier ici — juste cette petite précision sur le portrait du fondateur. Pour toute nouvelle image : applique la règle du §1.
