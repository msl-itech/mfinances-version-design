# Guide pas à pas

> **Annexe.** Ne suis pas ce document de A à Z : ouvre-le seulement quand une mission de `00-COMMENCER-ICI.md` te le demande.

Coche chaque case `[ ]` au fur et à mesure.

---

## Étape 0 — Préparation (5 min)

- [ ] J'ai accès au dépôt **GitHub** du site (celui qui est relié au projet Lovable).
- [ ] J'ai accès au projet **Lovable** du site.
- [ ] J'ai décompressé le ZIP sur mon ordinateur et j'ai ouvert le dossier `LIVRAISON-WEBMASTER`.
- [ ] Je note l'heure de début : ____h____ (utile en cas de retour arrière, voir la fin du guide).

---

## Étape 1 — Copier les 47 fichiers dans GitHub (10 min)

> Si la V2 a déjà été appliquée, fais quand même toute l'étape 1 : les fichiers remplacent simplement les précédents. Les étapes 2 et 4 déjà faites ne sont pas à refaire.

Tous les fichiers du dossier `LIVRAISON-WEBMASTER/FICHIERS-A-COPIER` remplacent ceux du projet qui portent le même nom au même endroit. Les trois fichiers nouveaux sont ajoutés automatiquement.

1. Ouvre le dépôt GitHub du site dans **Google Chrome** (le glisser-déposer de dossiers fonctionne mieux dans Chrome).
2. Vérifie que tu es sur la branche **main** (menu déroulant en haut à gauche de la liste des fichiers).
3. Clique sur **Add file**, puis sur **Upload files**.
4. Sur ton ordinateur, **ouvre** le dossier `FICHIERS-A-COPIER` (double-clic pour entrer dedans).
5. Sélectionne **tout son contenu** : les dossiers `public`, `src`, `supabase` et les fichiers `index.html`, `vite.config.ts` et `package-lock.json`.

   ⚠️ Glisse le **contenu** du dossier, pas le dossier `FICHIERS-A-COPIER` lui-même. Sinon GitHub crée un dossier inutile et aucune correction ne s'applique.

6. Glisse cette sélection dans la zone de dépôt de la page GitHub.
7. Attends la fin du chargement, puis vérifie la liste affichée :
   - [ ] elle compte **47 fichiers** ;
   - [ ] les chemins commencent par `src/`, `public/`, `supabase/`, ou sont `index.html`, `vite.config.ts` et `package-lock.json` ;
   - [ ] aucun chemin ne commence par `FICHIERS-A-COPIER/` ni par `LIVRAISON-WEBMASTER/`.
8. Dans le champ du message, écris : `Correctifs site septembre 2026 V3.2`.
9. Laisse coché **Commit directly to the main branch**, puis clique sur **Commit changes**.

- [ ] GitHub affiche le commit « Correctifs site septembre 2026 V3.2 ».

---

## Étape 2 — Supprimer un dossier devenu inutile (2 min)

Dans Lovable, colle ce message dans le chat, **tel quel** :

```
Supprime entièrement le dossier docs/mfinances-corrections-SEO-V6.2/fichiers-finaux/ et tout son contenu. Ne modifie, ne supprime et ne déplace aucun autre fichier du projet.
```

- [ ] Lovable confirme la suppression du dossier `fichiers-finaux`, et d'aucun autre fichier.

---

## Étape 3 — Vérifier la compilation, puis publier (5 min)

1. Dans Lovable, attends que le projet se mette à jour avec le commit de l'étape 1.
2. Colle ce message dans le chat :

```
Vérifie que le projet compile sans erreur après le dernier commit « Correctifs site septembre 2026 V3.2 ». Ne modifie aucun fichier : dis-moi seulement si la compilation réussit, et sinon quelle est l'erreur exacte.
```

- [ ] Lovable indique que la compilation réussit.

   Si l'erreur contient **`check-public-pdfs`** : le PDF de la checklist n'a pas été copié correctement. Recommence l'étape 1 pour le seul fichier `public/checklist-tresorerie-mfinances.pdf`.
   Pour toute autre erreur : **arrête-toi** et envoie la capture d'écran à Mika.

3. Clique sur **Publish** (ou **Update**) pour mettre le site en ligne.

- [ ] Le site est publié.

---

## Étape 4 — Préparer la base de données des avis Google (5 min)

Cette étape ne change rien de visible sur le site.

Dans Lovable, colle ce message :

```
Applique à la base de données, dans cet ordre et exactement telles qu'elles sont écrites, les deux migrations SQL supabase/migrations/20260925080000_google_reviews.sql puis supabase/migrations/20260926090000_v32_avis_et_provenance.sql. La seconde ajoute les colonnes last_seen_at et missing_sync_count à google_reviews, la fonction mark_missing_google_reviews, et les colonnes landing_page, conversion_page et referrer à lead_sources. Elle crée les tables google_reviews et google_reviews_summary, un secret Vault nommé google_reviews_sync_secret et la fonction verify_google_reviews_sync_secret. Vérifie ensuite que la fonction edge supabase/functions/sync-google-reviews est déployée. Ne modifie aucun autre fichier ni aucune autre table.
```

Si Lovable demande une confirmation (bouton **Approve**, **Run** ou **Appliquer**), clique dessus.

- [ ] Lovable confirme que les tables existent et que la fonction `sync-google-reviews` est déployée.

---

## Étape 5 — Contrôler le site (30 min)

Ouvre `02-CHECKLIST-DE-CONTROLE.md` et fais **toutes** les vérifications, sur ordinateur **et** sur téléphone.

- [ ] Toutes les cases de la checklist sont cochées.

**Les étapes 1 à 5 mettent toutes les corrections en ligne.** Tant que l'étape 6 n'est pas faite, le site affiche « Avis Google vérifiés » sans nombre, et les témoignages actuels.

---

## Étape 5 bis — Régler Clarity (avec Mika, 15 min)

Suis le fichier `04-CLARITY-CONFIGURATION.md`, une fois le site publié.

- [ ] Les réglages Clarity sont faits.

---

## Étape 6 — Synchronisation automatique des avis Google (avec Mika)

Cette étape se fait avec **Mika**, connecté à **son** compte Google, celui qui gère la fiche Google de MFinances.

Pour exécuter un script du dossier `SQL/`, colle toujours dans Lovable ce message, **suivi du contenu complet du script** :

```
Exécute le SQL ci-dessous sur la base de données, exactement tel qu'il est écrit, puis montre-moi le résultat complet. Ne crée pas de fichier de migration et ne modifie aucun autre élément.
```

### 6.1 — Créer le projet Google Cloud (5 min)

1. Aller sur https://console.cloud.google.com et se connecter avec le compte Google de Mika.
2. Cliquer sur le sélecteur de projet en haut de la page, puis **Nouveau projet**. Nom : `mfinances-avis-google`. **Créer**, puis sélectionner ce projet.
3. Menu **API et services** → **Bibliothèque**. Rechercher et **activer** ces trois API, une par une :
   - [ ] **My Business Account Management API**
   - [ ] **My Business Business Information API**
   - [ ] **Google My Business API**

### 6.2 — Demander l'accès aux API à Google (5 min, puis attente)

1. Ouvrir la page des prérequis de Google : https://developers.google.com/my-business/content/prereqs
2. Suivre le lien vers le **formulaire de demande d'accès** aux API Google Business Profile et choisir la demande d'accès de base (« Basic API Access »).
3. Indiquer le **numéro du projet** Google Cloud (page d'accueil du projet), l'adresse e-mail de Mika et le site https://mfinances.be. Motif : afficher sur le site du cabinet les avis de sa propre fiche.
4. Envoyer le formulaire.

- [ ] Demande envoyée le : ____/____/2026

Google répond par e-mail. **Tant que l'accès n'est pas accordé, les étapes 6.7 et suivantes échoueront** (erreur 403 ou 429). Les étapes 6.3 à 6.6 peuvent être faites en attendant.

### 6.3 — Configurer l'écran d'autorisation (5 min)

1. Menu **API et services** → **Écran de consentement OAuth** (ou **Google Auth Platform**).
2. Type d'utilisateur : **Externe**. Nom de l'application : `MFinances avis Google`. E-mails d'assistance et de contact : celui de Mika.
3. Enregistrer.
4. Dans **Audience** (ou **État de publication**), cliquer sur **Publier l'application** pour la passer **en production**.

   ⚠️ Indispensable : une application restée « en test » perd son autorisation au bout de 7 jours, et les avis cessent de se mettre à jour.

- [ ] L'application est **en production**.

### 6.4 — Créer les identifiants (5 min)

1. Menu **API et services** → **Identifiants** → **Créer des identifiants** → **ID client OAuth**.
2. Type d'application : **Application Web**. Nom : `mfinances-site`.
3. Dans **URI de redirection autorisés**, ajouter exactement : `https://developers.google.com/oauthplayground`
4. **Créer**. Google affiche un **ID client** et un **code secret du client**.

- [ ] ID client et code secret copiés dans un endroit sûr (jamais par e-mail en clair).

### 6.5 — Obtenir le jeton d'autorisation de Mika (5 min)

1. Ouvrir https://developers.google.com/oauthplayground
2. Cliquer sur l'**engrenage** en haut à droite, cocher **Use your own OAuth credentials**, coller l'ID client et le code secret.
3. À gauche, dans **Input your own scopes**, coller `https://www.googleapis.com/auth/business.manage` puis cliquer sur **Authorize APIs**.
4. Se connecter avec le compte Google de **Mika** et accepter. Si Google affiche « Application non validée » : **Paramètres avancés**, puis **Accéder à MFinances avis Google**. C'est normal, l'application est celle de Mika.
5. Cliquer sur **Exchange authorization code for tokens**.
6. Copier la valeur **Refresh token**.

- [ ] Refresh token copié dans un endroit sûr.

### 6.6 — Enregistrer les trois premiers secrets dans Lovable (3 min)

Colle ce message dans Lovable :

```
Ajoute trois secrets pour les fonctions edge Supabase : GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET et GOOGLE_OAUTH_REFRESH_TOKEN. Ouvre le formulaire sécurisé pour que je saisisse leurs valeurs moi-même. N'écris jamais ces valeurs dans le code.
```

- [ ] Les trois secrets sont enregistrés.

### 6.7 — Identifier la fiche Google de MFinances (5 min)

*(Une fois l'accès Google accordé.)*

1. Exécute le script `SQL/02-trouver-la-fiche-google.sql` (message de l'encadré ci-dessus + contenu du script).
2. Attends **30 secondes**, puis exécute `SQL/03-lire-la-derniere-reponse.sql`.
3. La colonne `content` contient une liste de fiches, chacune avec un `location_name` (de la forme `accounts/…/locations/…`) et un `title`.
4. Copie le `location_name` de la fiche dont le `title` est celui de **MFinances**.

- [ ] `location_name` de MFinances copié : `accounts/________________/locations/________________`

Si `status_code` vaut 401 : l'étape 4 n'a pas été appliquée correctement. Si `content` contient `"ok": false` : copie le message et envoie-le à Mika.

### 6.8 — Enregistrer la fiche à synchroniser (2 min)

Colle ce message dans Lovable :

```
Ajoute un secret pour les fonctions edge Supabase nommé GBP_LOCATION_NAME. Ouvre le formulaire sécurisé pour que je saisisse sa valeur moi-même.
```

Saisis le `location_name` copié à l'étape 6.7.

- [ ] Le secret `GBP_LOCATION_NAME` est enregistré.

### 6.9 — Première synchronisation (3 min)

1. Exécute `SQL/04-premiere-synchronisation.sql`.
2. Attends **30 secondes**, puis exécute `SQL/03-lire-la-derniere-reponse.sql`.

- [ ] `status_code` vaut **200** et `content` contient `"ok": true` et un nombre d'avis (`"reviews"`) supérieur à 0.

### 6.10 — Planifier la mise à jour quotidienne (2 min)

Exécute `SQL/05-planifier-la-synchronisation-quotidienne.sql`.

- [ ] Lovable confirme que la tâche `sync-google-reviews-daily` existe.

### 6.11 — Vérification finale

1. Exécute `SQL/06-verifier-les-donnees.sql`.
   - [ ] `total_review_count` correspond au nombre d'avis visible sur la fiche Google, `last_error` est vide.
2. Sur le site (recharger avec Ctrl + F5) :
   - [ ] l'accueil affiche « XX avis Google · 5,0/5 » avec le bon nombre, dans le bloc d'entrée et dans la section Témoignages ;
   - [ ] la page Contact affiche le même nombre ;
   - [ ] le carrousel de l'accueil et la page Comptabilité affichent les avis les plus récents.

---

## En cas de problème : revenir en arrière

Dans Lovable, ouvre l'**historique des versions** et restaure la version antérieure à l'heure notée à l'étape 0. Puis préviens Mika. Ne tente pas de corriger toi-même un fichier.
