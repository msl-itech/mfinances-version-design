# COMMENCER ICI — Mise en ligne des correctifs mfinances.be (V3.2, révision 1)

Ce document est **la seule porte d'entrée**. Tout le travail est découpé en **missions numérotées M0 à M18**, à faire **dans l'ordre**. Les autres fichiers du dossier sont des annexes : chaque mission te dit quand les ouvrir.

## Le système, en 5 règles

1. **Une mission à la fois, dans l'ordre.** Ne commence jamais une mission tant que la précédente n'est pas « Fait ».
2. **Chaque mission a un test de réussite.** Si le test ne donne pas exactement le résultat décrit, la mission n'est pas faite.
3. **Chaque mission a une preuve** (une capture d'écran le plus souvent). Range les preuves dans un dossier `Preuves` nommé `M05.png`, `M07.png`, etc.
4. **Tout est noté dans le tableau `SUIVI-MISE-EN-LIGNE.xlsx`** : statut, date, preuve, commentaire. Mika y voit en un coup d'œil où en est le travail.
5. **🔴 Feu rouge : en cas de doute ou d'erreur, tu t'arrêtes.** Tu passes la mission en « Bloqué », tu écris ce qui s'est passé dans la colonne Commentaire, tu envoies une capture à Mika. Tu ne corriges rien toi-même et tu ne passes pas à la suite.

À la fin de chaque séance de travail, envoie à Mika le compte rendu type (en bas de ce document) **et** le tableau de suivi.

## Ce qu'il ne faut JAMAIS faire

- Modifier à la main un fichier du projet, même « pour arranger ».
- Toucher au code de chargement de Microsoft Clarity dans `index.html`.
- Envoyer sur GitHub autre chose que le **contenu** du dossier `FICHIERS-A-COPIER` (jamais le dossier `LIVRAISON-WEBMASTER`, jamais un dossier `node_modules`, `dist` ou `.chromium`).
- Sauter une mission, ou en faire deux en même temps.
- Continuer après un feu rouge.

---

# PHASE A — Avant de commencer (jour 1, 15 min)

### M0 — Préparer ses accès
- **Qui :** webmaster · **Durée :** 10 min
- **Étapes :** vérifier que tu peux te connecter à : GitHub (dépôt du site), Lovable (projet du site), l'hébergeur du domaine (Vercel **ou** Lovable, voir M2), Google Search Console, Microsoft Clarity. Ouvrir `SUIVI-MISE-EN-LIGNE.xlsx` et le garder ouvert pendant tout le travail. Créer le dossier `Preuves`.
- **Test de réussite :** les cinq connexions fonctionnent.
- **Preuve :** aucune. Noter dans le tableau les accès manquants → si un accès manque : 🔴 feu rouge.

### M1 — Vérifier que personne n'a modifié le site depuis le 15 septembre
- **Qui :** webmaster · **Durée :** 5 min
- **Pourquoi :** les fichiers du pack ont été préparés à partir du site tel qu'il était le 15/09/2026. S'ils écrasent des modifications faites depuis, celles-ci seront perdues.
- **Étapes :** sur GitHub, ouvrir le dépôt → cliquer sur le lien **« commits »** (au-dessus de la liste des fichiers, à droite) → regarder les dates.
- **Test de réussite :** aucun commit daté **après le 15/09/2026**, à part éventuellement ceux des correctifs V2/V3.
- **Preuve :** `M01.png` (capture de la liste des commits).
- 🔴 **Si un commit récent existe :** feu rouge. Ne copie rien, envoie la capture à Mika.

---

# PHASE B — La redirection du www (jour 1, 20 min) — PRIORITÉ 1

**Pourquoi c'est la priorité :** aujourd'hui, le site répond à la fois sur `www.mfinances.be` et sur `mfinances.be`. Google traite ces deux adresses comme deux sites différents : la moitié des impressions part sur la version www. Il faut que toute adresse en www renvoie automatiquement, et définitivement, vers la même adresse sans www.

### M2 — Trouver où le domaine est géré
- **Qui :** webmaster · **Durée :** 5 min
- **Étapes :**
  1. Dans **Vercel**, ouvrir l'équipe **msl-itech**, projet **mfinances-version-design** → **Settings** → **Domains**. Est-ce que `mfinances.be` apparaît dans la liste ?
  2. Sinon, dans **Lovable**, ouvrir le projet → **Settings** (ou **Project settings**) → **Domains**. Est-ce que `mfinances.be` apparaît ?
- **Test de réussite :** tu sais dire « le domaine est géré dans Vercel » ou « dans Lovable ». Note-le dans la colonne Commentaire.
- **Preuve :** `M02.png` (la page Domains où apparaît `mfinances.be`).
- 🔴 **Si `mfinances.be` n'apparaît dans aucun des deux :** feu rouge.

### M3 — Régler la redirection permanente
- **Qui :** webmaster · **Durée :** 10 min
- **Si le domaine est dans Vercel :**
  1. Dans **Settings → Domains**, vérifier que `mfinances.be` est bien affiché **sans** redirection (c'est le domaine principal).
  2. Sur la ligne `www.mfinances.be`, cliquer sur **Edit** (si la ligne n'existe pas : **Add**, taper `www.mfinances.be`).
  3. Choisir **Redirect to** → `mfinances.be`, et un code **permanent** (**301** ou **308**). Jamais 302 ou 307, qui sont temporaires.
  4. **Save**.
- **Si le domaine est dans Lovable :**
  1. Dans **Domains**, définir `mfinances.be` comme **domaine principal** (Primary).
  2. Vérifier que `www.mfinances.be` figure dans la liste et qu'il est indiqué comme redirigé vers le domaine principal.
  3. Si Lovable ne propose pas ce réglage : 🔴 feu rouge (il faudra le faire chez le fournisseur du nom de domaine, avec Mika).
- **Test de réussite :** l'écran indique que `www.mfinances.be` redirige vers `mfinances.be`.
- **Preuve :** `M03.png`.

### M4 — Tester la redirection
- **Qui :** webmaster · **Durée :** 5 min (attendre 10 minutes après M3)
- **Étapes :** dans une **fenêtre de navigation privée**, taper une par une ces trois adresses **exactement** :
  - `https://www.mfinances.be/`
  - `https://www.mfinances.be/contact/`
  - `https://www.mfinances.be/tarifs/`
  Puis refaire le test sur un **téléphone en 4G** (wifi coupé).
- **Test de réussite :** à chaque fois, la barre d'adresse affiche l'adresse **sans www** (`mfinances.be/…`) et la bonne page s'affiche.
- **Preuve :** `M04.png` (la barre d'adresse après avoir tapé `https://www.mfinances.be/contact/`).
- 🔴 **Si l'adresse reste en www :** feu rouge.

---

# PHASE C — Le pack V3 (jour 1, 1 h 30)

### M5 — Copier les 47 fichiers
- **Annexe :** `01-GUIDE-PAS-A-PAS.md`, **étape 1**.
- **Test de réussite :** GitHub affiche le commit « Correctifs site septembre 2026 V3.2 », avec **47 fichiers**.
- **Preuve :** `M05.png` (la page du commit, avec le nombre de fichiers).

### M6 — Supprimer le dossier de doublons
- **Annexe :** guide, **étape 2**.
- **Test de réussite :** Lovable confirme la suppression de `fichiers-finaux`, et d'aucun autre fichier.
- **Preuve :** `M06.png`.

### M7 — Compiler et publier
- **Annexe :** guide, **étape 3**.
- **Test de réussite :** Lovable indique « compilation réussie » et le site est publié.
- **Preuve :** `M07.png`.

### M8 — Préparer la base des avis Google
- **Annexe :** guide, **étape 4**.
- **Test de réussite :** Lovable confirme que les **deux** migrations sont appliquées (dans l'ordre : `20260925080000_google_reviews.sql`, puis `20260926090000_v32_avis_et_provenance.sql`) et que la fonction `sync-google-reviews` est déployée.
- **Preuve :** `M08.png`.

### M9 — Dérouler toute la checklist de contrôle
- **Annexe :** `02-CHECKLIST-DE-CONTROLE.md`, sections 1 à 5 (la section 6 se fait en M15).
- **Test de réussite :** toutes les cases cochées, sur ordinateur **et** sur téléphone.
- **Preuve :** le fichier de checklist coché, envoyé à Mika.

### M10 — Vérifier les titres de page dans le code source
- **Qui :** webmaster · **Durée :** 5 min · **Ne bloque pas la suite.**
- **Étapes :** ouvrir `https://mfinances.be/tarifs/` → clic droit → **Afficher le code source de la page** → Ctrl + F → chercher `<title>`. Faire de même pour `https://mfinances.be/services/daf-externalise/`.
- **Test de réussite :** les titres trouvés sont exactement :
  - pour Tarifs : `Tarifs Expert-Comptable Bruxelles | À partir de 275€/mois | MFinances`
  - pour DAF : `DAF Externalisé pour TPE à Bruxelles — MFinances`
- 🔴 **Si l'une des deux pages affiche `MFinances — Expert-comptable & pilotage financier à Bruxelles`** (le titre de l'accueil) : feu rouge. La correction V3.2 du pré-rendu n'est pas active en production.
- **Pourquoi :** les réseaux sociaux et les robots des IA lisent ce titre sans exécuter le site ; chaque page doit exposer le sien.
- **Preuve :** `M10.png`.

---

# PHASE D — Les outils Google, Bing et Clarity (jour 2, avec Mika, 1 h)

### M11 — Search Console
- **Qui :** webmaster **avec Mika** · **Durée :** 20 min
- **Étapes :**
  1. Menu **Sitemaps** → saisir `sitemap.xml` → **Envoyer**.
  2. En haut, barre **Inspecter une URL** → coller `https://www.mfinances.be/` → noter ce qu'affiche Google.
  3. Pour chacune de ces six adresses : barre **Inspecter une URL** → coller l'adresse → **Demander une indexation** :
     - `https://mfinances.be/`
     - `https://mfinances.be/tarifs/`
     - `https://mfinances.be/qui-nous-accompagnons/commerce-et-horeca/`
     - `https://mfinances.be/qui-nous-accompagnons/asbl/`
     - `https://mfinances.be/societe-en-veille/`
     - `https://mfinances.be/blog/daf-externalise/pourquoi-comptable-aide-pas/`
- **Test de réussite :** le sitemap est « Opération effectuée » ; les six demandes d'indexation sont envoyées (Google limite le nombre de demandes par jour : si un message l'indique, finir le lendemain).
- **Preuve :** `M11.png` (page Sitemaps).

### M12 — Bing Webmaster Tools
- **Qui :** webmaster **avec Mika** · **Durée :** 5 min
- **Étapes :** ouvrir https://www.bing.com/webmasters → se connecter avec le compte Microsoft de Mika → **Importer depuis Google Search Console** → choisir `mfinances.be` → valider. Puis **Sitemaps** → vérifier que `https://mfinances.be/sitemap.xml` apparaît (sinon l'ajouter).
- **Test de réussite :** le site `mfinances.be` apparaît dans Bing Webmaster Tools.
- **Preuve :** `M12.png`.

### M13 — Régler Clarity
- **Annexe :** `04-CLARITY-CONFIGURATION.md`, parties 1 à 4.
- **Test de réussite :** adresses IP bloquées, segments « Production » et « Production · Google » créés, entonnoirs créés (ou filtres notés).
- **Preuve :** `M13.png` (liste des segments).

### M14 — Envoyer la demande d'accès à l'API Google (avis)
- **Annexe :** guide, **étape 6.1 et 6.2 uniquement**.
- **Pourquoi aujourd'hui :** c'est le seul délai que personne ne maîtrise (Google répond en quelques jours en général).
- **Test de réussite :** formulaire envoyé ; date notée dans le tableau.
- **Preuve :** `M14.png` (écran de confirmation d'envoi).
- **La suite (étapes 6.3 à 6.11)** se fait quand Google a répondu : c'est la mission **M14 bis** du tableau.

---

# PHASE E — Le suivi (les dates exactes sont calculées dans le tableau)

Dès que la date de mise en ligne est saisie dans le tableau (cellule jaune en haut), les dates des missions M15 à M18 se calculent seules. **Crée tout de suite quatre rappels dans le calendrier Outlook** à ces dates, avec le titre de la mission.

### M15 — J+1 : vérifier que Clarity mesure bien
- **Annexe :** `02-CHECKLIST-DE-CONTROLE.md`, **section 6**.
- **Test de réussite :** la balise `environment = production` et au moins un événement personnalisé apparaissent.

### M16 — J+14 : les clics morts (avec Mika)
- **Étapes :** Clarity → segment **Production** → **Enregistrements** → **Filtres** → **Clics morts** (Dead clicks). Regarder chaque enregistrement et noter dans l'onglet **Observations Clarity** du tableau : la page, l'élément cliqué, le nombre de fois.
- **Règle :** on ne corrige **rien** à ce stade. Mika décide ensuite, à partir de l'onglet Observations.
- **Test de réussite :** onglet Observations rempli.

### M17 — J+21 : la vitesse page par page (avec Mika)
- **Étapes :** Clarity → segment **Production** → onglet **Performances** → noter dans l'onglet **Observations Clarity** le LCP et l'INP de l'accueil, de Tarifs, de DAF externalisé et de Contact, sur mobile puis sur ordinateur.
- **Test de réussite :** les huit mesures sont notées.

### M18 — J+30 : exports pour le bilan
- **Étapes :** exporter les mêmes fichiers que le 25/09 : Search Console (Performances → Exporter → Excel, 3 derniers mois) et Clarity (Tableau de bord, segment Production → Exporter). Les envoyer à Mika.
- **Test de réussite :** les deux fichiers sont envoyés.

---

## Le contrôle de Mika (10 minutes, après M9)

Mika vérifie lui-même, sans l'aide du webmaster :
1. `https://www.mfinances.be/contact/` s'ouvre en `mfinances.be/contact/`.
2. La checklist trésorerie se télécharge et fait 4 pages.
3. L'accueil affiche « À partir de » sur les quatre forfaits et « Odoo · Finance connectée » sous le portrait.
4. La page Société en veille affiche 175 €.
5. Le tableau de suivi indique « Fait » et une preuve pour M0 à M9.

## Compte rendu type à envoyer à Mika après chaque séance

> **Objet : Mise en ligne V3 — compte rendu du [date]**
> Missions terminées : M__ à M__ (preuves dans le dossier Preuves).
> Mission en cours : M__.
> Missions bloquées : M__ — raison : ______ (capture jointe).
> Prochaine séance prévue : [date].
> Tableau de suivi à jour en pièce jointe.

## Ce qui n'est pas dans ce pack (prévu plus tard)

- Les nouveaux titres et descriptions des pages DAF externalisé, Tarifs, Horeca, Services, de l'accueil et de trois articles : pack V4.
- Les témoignages de Damien et Yanis sur la page Comptabilité : en attente de leurs textes Google exacts.
- La limitation de Clarity au seul domaine mfinances.be : en attente de la décision de Mika.
