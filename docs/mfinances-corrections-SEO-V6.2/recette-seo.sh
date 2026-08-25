#!/usr/bin/env bash
# =====================================================================
# Recette SEO post-déploiement — MFinances
# À lancer APRÈS avoir régénéré le site (LovableHTML) ET ré-uploadé sur OVH.
# Vérifie le HTML RÉELLEMENT SERVI (avant JavaScript) :
#   HTTP 200 · <title> · meta description · canonical (présence + destination)
#   · <h1> · JSON-LD + type attendu.
# Code de sortie : 0 si tout est vert, 1 si au moins un contrôle échoue
# (utilisable dans un pipeline / CI).
#
# Usage :
#   bash recette-seo.sh                 # teste https://mfinances.be
#   bash recette-seo.sh https://url     # teste une autre base (préprod)
# =====================================================================
set -u
BASE="${1:-https://mfinances.be}"
BASE="${BASE%/}"
TMP="$(mktemp)"
pass=0; fail=0

check() { if [ "$2" = "1" ]; then echo "   OK  $1"; pass=$((pass+1)); else echo "   KO  $1"; fail=$((fail+1)); fi; }

norm() { echo "${1%/}"; }   # retire un éventuel slash final

test_url() {
  local path="$1" expect="${2:-}" url code canon
  url="$BASE$path"
  code=$(curl -sL --max-time 30 -o "$TMP" -w "%{http_code}" "$url")
  echo ""; echo "== $url  (HTTP $code) =="
  [ "$code" = "200" ] && check "HTTP 200" 1 || check "HTTP 200" 0
  grep -qi "<title>" "$TMP" && check "<title>" 1 || check "<title>" 0
  grep -qi '<meta[^>]*name="description"' "$TMP" && check "meta description" 1 || check "meta description" 0
  grep -qi "<h1" "$TMP" && check "<h1>" 1 || check "<h1>" 0
  grep -qi 'application/ld+json' "$TMP" && check "JSON-LD present (avant JS)" 1 || check "JSON-LD present (avant JS)" 0
  # canonical : présence ET destination
  canon=$(grep -oiE '<link[^>]*rel="canonical"[^>]*>' "$TMP" | grep -oiE 'href="[^"]+"' | head -1 | sed -E 's/^href="//; s/"$//')
  if [ -n "$canon" ]; then
    if [ "$(norm "$canon")" = "$(norm "$url")" ]; then check "canonical = URL de la page ($canon)" 1
    else check "canonical INCORRECTE (trouvée: ${canon:-vide} / attendue: $url)" 0; fi
  else check "canonical présente" 0; fi
  if [ -n "$expect" ]; then
    grep -q "\"$expect\"" "$TMP" && check "JSON-LD contient $expect" 1 || check "JSON-LD contient $expect" 0
  fi
}

echo "================ Recette SEO — $BASE ================"

# ---- Niveau 0 : anti-régression SOURCE (pré-déploiement) ----
# ⚠️ Contrôle des FICHIERS SOURCE (pas du site servi). Actif si le script est lancé
# depuis le dossier livré (présence de ./fichiers-finaux). Empêche le retour d'anciennes
# formulations déjà corrigées. « taux relevé de 15 % à 18 % » reste autorisé (non testé).
echo ""; echo "== Niveau 0 — anti-régression source (pré-déploiement) =="
SRC=""
[ -d "./fichiers-finaux" ] && SRC="./fichiers-finaux"
[ -z "$SRC" ] && [ -d "./src" ] && SRC="."
if [ -z "$SRC" ]; then
  echo "   (ignoré : lance le script depuis le dossier livré, à côté de fichiers-finaux/, pour ce contrôle)"
else
  sabs() { if grep -rqiF -- "$2" "$SRC" 2>/dev/null; then check "$1" 0; else check "$1" 1; fi; }
  sabs "VVPRbis à 15 % de précompte (doit être 18 %)"  "à 15 % de précompte"
  sabs "VVPRbis à 15 % (variante)"                     "VVPRbis à 15 %"
  sabs "capital SRL 1 € (FAQ)"                         "capital minimum légal de la SRL est de 1"
  sabs "capital SRL 1 € (llms-full)"                   "capital minimum légal d'1 €"
  sabs "sous-capitaliser la société"                   "sous-capitaliser la société"
  sabs "DAF (faq-data) inclus dans Excellence"         "et est inclus dans le forfait Excellence"
  sabs "Excellence inclut le DAF externalisé"          "inclut le DAF externalisé"
  sabs "DAF intégré dans tous les forfaits (ancien)"   "DAF à temps partiel est intégré dans tous les forfaits"
  sabs "forfaits commencent à 350 (au lieu de 275)"    "forfaits commencent à 350"
  sabs "enfant à charge 5 265"                         "5 265"
  sabs "INASTI 891,14 (mauvaise unité)"                "891,14"
  sabs "mention véhicule électrique particulier"       "véhicule électrique particulier"
  sabs "coquille professionnelle professionnelle"      "professionnelle professionnelle"
fi

test_url "/"                                              "AccountingService"
test_url "/tarifs/"                                       "OfferCatalog"
test_url "/services/comptabilite/"                        "Service"
test_url "/blog/tresorerie/tresorerie-vs-benefices/"      "FAQPage"
test_url "/qui-nous-accompagnons/professions-de-sante/"

# ================= NIVEAU 2 — RÈGLES MÉTIER =================
# « Ça compile / le HTML est présent » ne suffit pas : on contrôle aussi que les
# règles commerciales et d'entité sont bien celles définies (DAF, ITAA, forfaits).
echo ""; echo "== Niveau 2 — règles métier =="
MET="$(mktemp)"

# a) llms.txt : DAF présenté comme option 150€/h, et PLUS « dans tous ses forfaits »
curl -sL --max-time 30 "$BASE/llms.txt" -o "$MET" 2>/dev/null
grep -qiE "150 ?€ HTVA/h" "$MET" && check "llms.txt : DAF à 150 €/h (option)" 1 || check "llms.txt : DAF à 150 €/h (option)" 0
if grep -qi "dans tous ses forfaits" "$MET"; then check "llms.txt : plus de 'DAF dans tous ses forfaits'" 0; else check "llms.txt : plus de 'DAF dans tous ses forfaits'" 1; fi

# b) /accueilv3 : page variante NON indexable (noindex)
curl -sL --max-time 30 "$BASE/accueilv3" -o "$MET" 2>/dev/null
if grep -qi "noindex" "$MET"; then check "/accueilv3 en noindex" 1; else check "/accueilv3 en noindex" 0; fi

# c) /a-propos : n° ITAA personnel de Mika (10.923.614), pas celui du cabinet
curl -sL --max-time 30 "$BASE/a-propos/" -o "$MET" 2>/dev/null
grep -q "10.923.614" "$MET" && check "/a-propos : ITAA Mika 10.923.614" 1 || check "/a-propos : ITAA Mika 10.923.614" 0

# d) /tarifs : le Basic 275 € est bien présent (4 forfaits)
curl -sL --max-time 30 "$BASE/tarifs/" -o "$MET" 2>/dev/null
grep -q "275" "$MET" && check "/tarifs : Basic 275 € présent" 1 || check "/tarifs : Basic 275 € présent" 0

# e) accueil : pas d'aggregateRating auto-servi dans le JSON-LD, et 1 seul <h1>
curl -sL --max-time 30 "$BASE/" -o "$MET" 2>/dev/null
if grep -qi "aggregateRating" "$MET"; then check "accueil : sans aggregateRating auto-servi" 0; else check "accueil : sans aggregateRating auto-servi" 1; fi
h1n=$(grep -oiE "<h1" "$MET" | wc -l | tr -d ' ')
[ "$h1n" = "1" ] && check "accueil : exactement 1 <h1> (trouvé $h1n)" 1 || check "accueil : exactement 1 <h1> (trouvé $h1n)" 0

# ---- Niveau 3 : fondations techniques (robots, sitemap, redirections) ----
echo ""; echo "== Niveau 3 — robots / sitemap / redirections =="
host=$(echo "$BASE" | sed -E 's#^https?://##; s#/.*##')
code=$(curl -s --max-time 20 -o "$MET" -w "%{http_code}" "$BASE/robots.txt"); [ "$code" = "200" ] && check "robots.txt servi (HTTP 200)" 1 || check "robots.txt (HTTP $code)" 0
code=$(curl -s --max-time 20 -o "$MET" -w "%{http_code}" "$BASE/sitemap.xml"); [ "$code" = "200" ] && check "sitemap.xml servi (HTTP 200)" 1 || check "sitemap.xml (HTTP $code)" 0
code=$(curl -s --max-time 20 -o /dev/null -w "%{http_code}" "https://www.$host/"); [ "${code:0:1}" = "3" ] && check "www.$host redirige (HTTP $code)" 1 || check "www.$host devrait rediriger vers non-www (HTTP $code)" 0
code=$(curl -s --max-time 20 -o /dev/null -w "%{http_code}" "http://$host/"); [ "${code:0:1}" = "3" ] && check "http -> https ($host, HTTP $code)" 1 || check "http -> https à vérifier ($host, HTTP $code)" 0

rm -f "$MET"

# ---- Niveau 4 : anti-régression fiscale (V6) ----
# ⚠️ Un grep ne remplace pas un contrôle juridique : ces tests empêchent seulement le
# RETOUR d'anciennes erreurs déjà identifiées et corrigées en V6. Ils s'exécutent sur
# /llms-full.txt (qui agrège le contenu éditorial). À lancer APRÈS déploiement V6 :
# tant que l'ancien site est en ligne, ces contrôles seront logiquement KO.
echo ""; echo "== Niveau 4 — anti-régression fiscale (/llms-full.txt) =="
LF="$(mktemp)"
curl -sL --max-time 30 "$BASE/llms-full.txt" -o "$LF" 2>/dev/null
absent() { if grep -qiF "$2" "$LF"; then check "doit être ABSENT — $1" 0; else check "absent — $1" 1; fi; }
present() { if grep -qiF "$2" "$LF"; then check "présent — $1" 1; else check "doit être PRÉSENT — $1" 0; fi; }
# anciennes valeurs qui ne doivent PLUS apparaître
absent "INASTI 891,14 (mauvaise unité)"              "891,14"
absent "ancien coefficient revalorisation 5,46"      "5,46"
absent "ancienne date VA 10 octobre 2026"            "10 octobre 2026"
absent "ancienne date VA 20 décembre 2026"           "20 décembre 2026"
absent "coquille professionnelle professionnelle"    "professionnelle professionnelle"
absent "déduction investissement 'jusqu'à 25%'"      "jusqu'à 25% de majoration sur certains investissements"
absent "60/40 attribué au Code civil"                "le Code civil belge prévoit par défaut une répartition"
absent "majoration VA non datée (taux 2026)"         "6,75 % (taux 2026)"
absent "rémunération 50 000 € datée EI 2026"         "50 000 € bruts depuis l'exercice d'imposition 2026"
absent "ATN 10 000 € sur les 50 000 €"               "10 000 € sur les 50 000 €"
absent "capital SRL 1 € (llms-full)"                 "capital minimum légal d'1 €"
# nouvelles valeurs qui DOIVENT apparaître
present "VVPRbis 18 %"                                "18 %"
present "réserve de liquidation 9,8 %"               "9,8 %"
present "VA sociétés 6,75 % désambiguïsé"            "taux applicable aux sociétés pour les revenus 2026"
present "VA personnes physiques 4,50 %"             "4,50 %"
present "coefficient revalorisation 5,63"            "5,63"
present "INASTI 890 € par trimestre"                "890 € par trimestre"
rm -f "$LF"

echo ""; echo "================ RÉSUMÉ : $pass OK / $fail KO ================"
rm -f "$TMP"
if [ "$fail" = "0" ]; then
  echo "OK : le HTML servi contient bien les balises attendues."
  exit 0
else
  echo "ATTENTION : des points KO ci-dessus. Cas fréquent : le HTML servi est la"
  echo "coquille SPA (pré-rendu non déployé) -> title/meta/JSON-LD manquants, ou"
  echo "OVH sert encore l'ancienne version. Vérifie le build LovableHTML + upload OVH."
  exit 1
fi
