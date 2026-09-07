# Intégration React / Vite — snippets

## 1. Nouvelle route
Dans `src/App.tsx` :

```tsx
import NotreOrganisation from "./pages/NotreOrganisation.tsx";

<Route path="/notre-organisation/" element={<NotreOrganisation />} />
```

## 2. SEOHead — À propos
Conserver le helper existant, mais mettre à jour les textes si la nouvelle version est validée :

```tsx
<SEOHead
  title="À propos de MFINANCES | Expert-comptable & pilotage à Bruxelles"
  description="Découvrez pourquoi MFINANCES accompagne les dirigeants de TPE et PME en croissance à Bruxelles, et comment le cabinet combine expertise comptable et pilotage financier."
  canonical="https://mfinances.be/a-propos/"
  schemaJson={[aboutPageSchema, createBreadcrumbSchema([...]), personMikaSchema]}
/>
```

## 3. SEOHead — Notre organisation

```tsx
<SEOHead
  title="Notre organisation | MFINANCES, Odoo & pilotage financier"
  description="Découvrez comment MFINANCES organise expertise comptable, traitement de la donnée financière et maîtrise d’Odoo pour mieux accompagner les PME en croissance."
  canonical="https://mfinances.be/notre-organisation/"
  schemaJson={[organisationPageSchema, createBreadcrumbSchema([...])]}
/>
```

## 4. Passerelle depuis À propos

```tsx
<Link to="/notre-organisation/">Découvrir notre organisation</Link>
```

## 5. Passerelle depuis Tarifs
Placer le bloc après les forfaits, avant le CTA final, puis :

```tsx
<Link to="/notre-organisation/">Découvrir notre organisation</Link>
```

## 6. Footer
Sous « Le cabinet » :

```tsx
<Link to="/a-propos/">À propos</Link>
<Link to="/notre-organisation/">Notre organisation</Link>
```

## 7. Important
Ne pas copier les `<style>` ou images base64 des maquettes dans le site. Les maquettes sont uniquement une référence de rendu. Réutiliser Tailwind, les tokens CSS, les assets et composants déjà présents.
