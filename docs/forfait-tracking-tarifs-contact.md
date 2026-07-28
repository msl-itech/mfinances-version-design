# Tracking forfait : Tarifs → Contact → CRM Odoo

## Objectif

Quand un visiteur clique sur "Choisir [forfait]" depuis la page Tarifs, on doit :

1. Savoir **quel forfait** il a choisi (UX visible sur la page Contact)
2. Envoyer cette info dans la **description du lead Odoo**

## Fichiers concernés

- `src/pages/Tarifs.tsx` — boutons "Choisir X"
- `src/pages/Contact.tsx` — formulaire multi-étapes + soumission CRM

---

## 1. Tarifs.tsx — Passer le forfait via l'URL

Chaque bouton "Choisir [nom]" pointe vers `/contact/?forfait=NomDuForfait`.

### Boutons des 3 cartes (Essentiel, Premium, Excellence)

```tsx
<Link to={`/contact/?forfait=${encodeURIComponent(plan.name)}`}>
  Choisir {plan.name}
</Link>
```

### Bouton de la barre Basic

```tsx
<Link to="/contact/?forfait=Basic">
  Choisir Basic
</Link>
```

Les 4 noms possibles : `Basic`, `Essentiel`, `Premium`, `Excellence`.

---

## 2. Contact.tsx — Lire le paramètre et afficher

### Import

Ajouter `useSearchParams` à l'import react-router-dom :

```tsx
import { Link, useSearchParams } from "react-router-dom";
```

### Lecture du paramètre

Dans le composant, avant les autres states :

```tsx
const [searchParams] = useSearchParams();
const [forfait] = useState(() => searchParams.get("forfait") || "");
```

### Bandeau UX (au-dessus de la ProgressBar)

Afficher un badge si un forfait est présent dans l'URL :

```tsx
{forfait && (
  <div className="mb-5 flex items-center gap-3 rounded-xl bg-accent/10 border border-accent/30 px-4 py-3">
    <CheckCircle size={18} className="text-accent flex-shrink-0" strokeWidth={2} />
    <p className="text-[13px] font-body text-foreground">
      Forfait sélectionné : <strong className="text-accent">{forfait}</strong>
    </p>
  </div>
)}
```

Ce bandeau utilise `CheckCircle` (déjà importé depuis lucide-react).

---

## 3. Contact.tsx — Envoyer au CRM Odoo

Dans `handleSubmit`, ajouter le forfait dans `descParts` :

```tsx
const descParts = [
  `<h3>Informations du contact</h3>`,
  forfait ? `<p><strong>Forfait sélectionné:</strong> ${forfait}</p>` : "",
  `<p><strong>Situation actuelle:</strong> ${situation}</p>`,
  `<p><strong>Besoin principal:</strong> ${besoin}</p>`,
  `<p><strong>Téléphone:</strong> ${telephone}</p>`,
  message ? `<p><strong>Message:</strong> ${message}</p>` : "",
  `<p><strong>Source:</strong> Formulaire Contact - Site MFinances</p>`,
].filter(Boolean);
```

La ligne `Forfait sélectionné` n'apparait dans le lead que si le visiteur vient de la page Tarifs. Si il arrive directement sur `/contact/`, rien n'est ajouté.

---

## 4. Tableau comparatif — Layout horizontal des catégories

Le tableau comparatif a aussi été modifié dans cette branche :

- **Avant** : colonne latérale étroite (12%) avec texte vertical (`writingMode: vertical-rl`)
- **Après** : ligne d'en-tête pleine largeur (`colSpan={5}`) par catégorie, texte horizontal

### Structure table (5 colonnes au lieu de 6)

```tsx
<colgroup>
  <col style={{ width: "28%" }} />   {/* label */}
  <col style={{ width: "18%" }} />   {/* Basic */}
  <col style={{ width: "18%" }} />   {/* Essentiel */}
  <col style={{ width: "18%" }} />   {/* Premium */}
  <col style={{ width: "18%" }} />   {/* Excellence */}
</colgroup>
```

### Ligne d'en-tête de catégorie

Chaque catégorie a une ligne header avec un `borderLeft` coloré continu :

```tsx
<tr>
  <td
    colSpan={5}
    className="p-0 border-b border-border/20"
    style={{ backgroundColor: cat.color, borderLeft: `5px solid ${cat.barColor}` }}
  >
    <div className="flex items-center gap-3 py-2.5 pl-5">
      <span style={{ color: cat.barColor }}>{cat.num}</span>
      <span>{cat.title}</span>
    </div>
  </td>
</tr>
```

### Bande colorée continue sur les lignes enfant

Le même `borderLeft` est appliqué sur le premier `<td>` de chaque ligne de données :

```tsx
<td
  className="p-4 pl-6 ..."
  style={{ borderLeft: `5px solid ${cat.barColor}` }}
>
  {row.label}
</td>
```

Couleurs par catégorie (définies dans `compareCategories`) :

| Catégorie | `color` (fond) | `barColor` (bande) |
|---|---|---|
| I - Conformité légale | `hsla(224, 55%, 24%, 0.08)` | `hsla(224, 55%, 24%, 0.5)` |
| II - Anticipation | `hsla(0, 79%, 53%, 0.08)` | `hsla(0, 79%, 53%, 0.5)` |
| III - Développement | `hsla(160, 50%, 40%, 0.08)` | `hsla(160, 50%, 40%, 0.5)` |
| IV - Optimalisation trésorerie | `hsla(36, 70%, 50%, 0.08)` | `hsla(36, 70%, 50%, 0.5)` |

Nécessite l'import de `Fragment` depuis React :

```tsx
import { Fragment, useEffect, useRef, useState } from "react";
```
