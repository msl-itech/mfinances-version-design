# Réglages du tableau de bord Clarity (avec Mika)

> **Annexe.** Ne suis pas ce document de A à Z : ouvre-le seulement quand une mission de `00-COMMENCER-ICI.md` te le demande.

À faire une fois la V3 publiée. Aucun code : tout se règle dans https://clarity.microsoft.com, projet **MFINANCES**.

## 1. Exclure les visites internes (5 min)

1. **Paramètres** (roue dentée) → **Configuration** → **Blocage IP** (IP blocking).
2. Ajouter l'adresse IP du cabinet, celle de Mika et celle du webmaster. Pour connaître une adresse IP : ouvrir https://www.whatismyip.com depuis le lieu concerné.

- [ ] Adresses IP internes ajoutées.

## 2. Créer le segment « Production » (3 min)

1. **Tableau de bord** → **Filtres** → **Balises personnalisées** → `environment` = `production`.
2. **Enregistrer comme segment**, nom : `Production`.

- [ ] Segment `Production` créé. À partir de maintenant, toujours ouvrir le tableau de bord avec ce segment.

## 3. Créer le segment « Visiteurs Google » (2 min)

1. Segment `Production` + **Filtres** → **Référent** (Referrer) contient `google`.
2. **Enregistrer comme segment**, nom : `Production · Google`.

- [ ] Segment `Production · Google` créé.

## 4. Créer l'entonnoir de conversion (5 min)

1. Menu **Entonnoirs** (Funnels) → **Nouvel entonnoir**, nom : `Diagnostic`.
2. Étapes, dans l'ordre, en choisissant « Événement personnalisé » : `diagnostic_start` → `diagnostic_complete` → `diagnostic_result`.
3. Créer un deuxième entonnoir, nom : `Contact`, avec : `contact_click` → `contact_form_submit`.

Si le menu Entonnoirs n'apparaît pas dans le compte, filtrer simplement les enregistrements par événement personnalisé : le nombre de sessions par étape donne la même information.

- [ ] Entonnoirs créés (ou filtres notés).

## 5. Premier contrôle (après 1 h de trafic)

- [ ] Avec le segment `Production`, les pages `localhost`, `vercel.app` et `lovable` n'apparaissent plus.
- [ ] Au moins un événement personnalisé apparaît dans les filtres.
