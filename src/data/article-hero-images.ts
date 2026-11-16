import changerExpertComptable from "@/assets/blog/articles/changer-expert-comptable-belgique-pme.webp";
import expertComptableOdoo from "@/assets/blog/articles/expert-comptable-odoo-belgique-pme.webp";
import comptabiliteRetard from "@/assets/blog/articles/comptabilite-retard-reprise-pme.webp";
import peppol2027 from "@/assets/blog/articles/peppol-2027-controles-pme-odoo.webp";
import inventaireOdoo from "@/assets/blog/articles/inventaire-physique-odoo-18-pme.webp";

export interface ArticleHeroImage {
  src: string;
  alt: string;
}

/** Photos propres à un article. Les articles absents gardent la photo de leur catégorie. */
export const articleHeroImages: Record<string, ArticleHeroImage> = {
  "changer-expert-comptable-belgique-pme": {
    src: changerExpertComptable,
    alt: "Deux professionnels se transmettant des classeurs comptables et un ordinateur portable dans un bureau à Bruxelles",
  },
  "expert-comptable-odoo-belgique-pme": {
    src: expertComptableOdoo,
    alt: "Experte-comptable montrant à un dirigeant de PME un tableau de bord financier sur grand écran",
  },
  "comptabilite-retard-reprise-pme": {
    src: comptabiliteRetard,
    alt: "Piles de factures et tickets en cours de classement dans des classeurs, ordinateur portable et calculatrice sur le bureau",
  },
  "peppol-2027-controles-pme-odoo": {
    src: peppol2027,
    alt: "Liste de factures électroniques validées à l'écran et main cochant une liste de contrôle",
  },
  "inventaire-physique-odoo-18-pme": {
    src: inventaireOdoo,
    alt: "Employée comptant le stock d'un entrepôt avec une tablette devant des étagères étiquetées",
  },
};
