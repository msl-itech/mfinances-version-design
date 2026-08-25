# CHANGELOG — V5.1 (mise à jour fiscale 2026)

**V5.1 = correctif de contenu fiscal**, produit après une relecture qui a révélé que plusieurs contenus décrivaient encore l'ancien droit fiscal belge (avant les réformes 2026). **Chaque chiffre 2026 a été vérifié sur des sources professionnelles** (voir « Sources » en bas). Supersede la V5. Aucun changement de design.

> ⚠️ Contexte : nous sommes en **août 2026**. Les réformes de la loi-programme 2026 sont entrées en vigueur. Les valeurs qui **changent chaque année** (voir §5) restent à valider par Mika avant publication.

## 1. Mises à jour fiscales 2026 (vérifiées sur le web)

**VVPRbis — taux réduit 15 % → 18 %.** Réécrit (pas un simple 15→18) : le taux réduit final passe à **18 %** ; le taux intermédiaire de 20 % disparaît pour les nouveaux apports. **Régime transitoire** ajouté : apports antérieurs à 2026 (20 % au 2ᵉ exercice, puis 18 %) vs apports à partir de 2026 (30 % au 2ᵉ exercice, 18 % dès le 3ᵉ). Corrigé dans `blog-articles-content.ts`, `llms-full.txt`, `llms.txt`, `Fiscalite.tsx`, `article-geo-faqs.ts`, `faq-data.ts`.

**Réserve de liquidation — 5 %/5 ans → 9,8 %/3 ans.** Réécrit avec distinction **ancien/nouveau régime** : constitution toujours à 10 % ; réserves constituées **à partir de l'exercice 2026** → précompte de **9,8 %** après 3 ans (le 5 % après 5 ans disparaît) ; réserves **jusqu'au 30/12/2025** → ancien régime conservé (5 % après 5 ans, 6,5 % anticipé). Corrigé dans blog + llms-full + faq-data.

**Rémunération minimale du dirigeant — 45 000 € → 50 000 €.** Depuis l'**exercice d'imposition 2026** (exercices clôturés au 31/12/2025 ou après). Ajout de la règle **ATN plafonnés à 20 %** de la rémunération (max 10 000 € sur les 50 000 €). Le passage clé de l'article a été **réécrit** ; corrigé aussi dans les articles ISOC/création + FAQ + geo-faqs.

**Versements anticipés ISOC — dates corrigées, taux maintenu.** ⚠️ Important : la relecture proposait 4,50 %, mais **4,50 % s'applique aux personnes physiques/dirigeants, pas aux sociétés**. Pour les **sociétés**, la majoration reste **6,75 %** (exercice d'imposition 2027) — donc l'exemple « 1 350 € » est correct et conservé. Seules les **dates 2026** étaient fausses : **12 octobre** (et non 10) et **21 décembre** (et non 20) — cohérent avec le calendrier 2026 (10/10 = samedi, 20/12 = dimanche). Corrigé dans blog + llms-full + geo-faqs.

**ATN voiture électrique — « coefficient CO₂ à 0 » → plancher de 4 %.** Une voiture zéro émission n'« annule » pas le calcul : le pourcentage CO₂ est **plafonné en bas à 4 %** (formule : valeur catalogue × 6/7 × % CO₂, % entre 4 % et 18 %). Corrigé dans blog + llms-full.

**SRL — suppression du faux « capital minimum 18 550 € ».** La SRL n'a **aucun capital minimum légal** depuis le CSA (2019) : ce sont des **moyens de départ / patrimoine initial suffisants** au regard du **plan financier** qui comptent. Terminologie corrigée (« déposer le capital » → « libérer les apports en numéraire » ; « capital manifestement insuffisant » → « capitaux propres de départ manifestement insuffisants »). Corrigé dans blog + llms-full.

**Location de mobilier à sa société — précompte 15 % → 30 % (effectif ~7,5 % → ~15 %).** Le précompte mobilier ordinaire est de **30 %** (et non 15 %) → taux effectif = 50 % × 30 % = **~15 %**. Exemples recalculés (108 € → 216 € ; 132 € → 265 €). Corrigé partout : article + `llms-full.txt` + `blog-data.ts` (titre/meta) + page hub + **générateur de bail** + **PDF de bail**. ⚠️ Cet article reste dans ta **pile « validation métier »** : la classification (revenus mobiliers, répartition 60/40, forfait 50 %) est à confirmer par toi.

## 2. Contradictions & arithmétique (certaines)
- « Économie 724 €/an **soit plus que le coût d'un forfait comptable annuel** » → comparaison **supprimée** (724 € < 3 300 € = Basic annuel).
- Coquille « dépasser **30%2** » → « 30 % ».
- « augmenter votre volume de **36 %** » → **50 %** (10 / (30−10)).
- BFR de Sophie « **2,9 mois** de CA » → **0,95 mois** (≈ 29 jours) — 61 700 / 65 000.
- Cuisine « 1h30 / 4h → **25 %** » → **37,5 %**.
- `CalculateurBureau.tsx` : « ~**1 600 €** d'économie » → **~1 000 €** (4 000 × 25 %).
- Coquille « **professionnelle professionnelle** » supprimée partout (CalculateurBureau + PDF quotité + PDF bail).

## 3. Reliquats
- `llms.txt` : liste des tarifs → **4 offres** (Basic ajouté) ; description VVPRbis → **18 %**.

## 4. Recette — niveau 3 ajouté
`recette-seo.sh` teste désormais aussi : **robots.txt**, **sitemap.xml**, redirection **www → non-www**, redirection **http → https**. (Ces 4 contrôles manquaient ; tu avais raison sur ce point.)

## 5. À VALIDER par Mika avant publication (non modifié — dépend de valeurs annuelles / de ton expertise)
- **Majoration ISOC 6,75 %** : c'est le taux ex. 2027 pour sociétés (confirmé) — revérifier au moment de publier.
- **Coefficient de revalorisation** (5,46), **taux de référence CO₂ ATN** (67 g/km), **tranche 50 % IPP** (~48 320 €), **plafonds/minimum INASTI**, **déduction pour investissement**, **voiture thermique 0 %** (plutôt 2028 que 2026), **délai de dépôt ISOC** (« 6 » vs « 7 mois »), **coût employeur** (×1,33 vs ×1,5 selon la définition), **coûts de création de société**.
- **Réserve de liquidation — coût effectif** : présenté « ~15 % » ; le réel ancien régime ≈ 13,64 %.
- **« Cotisation distincte » dirigeant** : je n'ai **pas trouvé de source** confirmant une cotisation distincte spécifique liée à la rémunération minimale (les sources ne mentionnent que le seuil 50 000 € + plafond ATN 20 %). À préciser si tu as une référence — sinon la conséquence d'une rémunération insuffisante est la **perte du taux réduit** (25 % au lieu de 20 %).

## Contrôle final (V5.1)
- ✅ 0 erreur de transpilation (esbuild) sur tous les fichiers modifiés
- ✅ 0 résidu : ancien VVPR 15 %, réserve 5 %/5 ans, dates ISOC 10/10-20/12, « 7,5 % », « 45 000 € » (minimum), coquille, « 1 600 € »
- ✅ VVPRbis 18 % / réserve 9,8 % / dirigeant 50 000 € / ATN plancher 4 % / SRL sans capital minimal — cohérents blog + llms + pages + FAQ + geo
- ✅ Recette : niveaux 1 (technique) + 2 (métier) + 3 (robots/sitemap/redirections)

## Sources (vérifiées août 2026)
- VVPRbis 18 % & réserve de liquidation : [RSM Belgium](https://www.rsm.global/belgium/fr/insights/harmonisation-du-regime-vvprbis-et-de-la-reserve-de-liquidation), [Vandelanotte](https://www.vandelanotte.be/en/news/higher-withholding-tax-on-vvprbis-dividends-and-liquidation-reserves-from-1-july-2026), [OECCBB](https://blog.oeccbb.be/fr/article/anticiper-la-hausse-du-precompte-mobilier-sur-les-dividendes-vvpr-bis-ce-quil-faut-savoir-debut-2026/30130)
- Rémunération dirigeant 50 000 € + ATN 20 % : [Andersen](https://be.andersen.com/fr/news/augmentation-de-la-remuneration-minimale-des-dirigeants-dentreprise-quelle-consequence-a-limpot-des-societes), [Forum for the Future](https://blog.forumforthefuture.be/fr/article/taux-reduit-isoc-50-000-20-datn-etc-que-faire-nouveau-simulateur-call-/30621)
- Versements anticipés ISOC ex. 2027 (6,75 %) + dates 2026 : [Deg & Partners](https://blog.degandpartners.com/fr/article/versements-anticipes-2026-que-faire-avant-le-10-avril-/30815)
- ATN voiture (plancher 4 %, électrique) : [Securex](https://www.securex.be/fr/lex4you/employeur/themes/mobilite/voiture-de-societe/voiture-de-societe-avantage-de-toute-nature-au-niveau-fiscal)
