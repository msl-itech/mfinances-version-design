// Chargement à la demande des pages, avec préchargement.
//
// Une page déclarée avec lazyPage() n'est téléchargée que lorsqu'on la visite.
// Si elle a été préchargée (preload), React l'affiche immédiatement, sans passer
// par l'écran d'attente : c'est ce qui évite tout « flash » blanc au premier
// affichage d'une page pré-rendue.

import { lazy, type ComponentType, type LazyExoticComponent } from "react";

type PageModule = { default: ComponentType };

export type LazyPage = LazyExoticComponent<ComponentType> & {
  preload: () => Promise<PageModule>;
};

export function lazyPage(factory: () => Promise<PageModule>): LazyPage {
  let loaded: PageModule | null = null;
  let pending: Promise<PageModule> | null = null;

  const preload = () => {
    if (loaded) return Promise.resolve(loaded);
    if (!pending) {
      pending = factory().then(
        (mod) => {
          loaded = mod;
          return mod;
        },
        (err) => {
          pending = null; // nouvelle tentative possible (ex. coupure réseau)
          throw err;
        },
      );
    }
    return pending;
  };

  const Component = lazy(() =>
    loaded
      ? // Module déjà chargé : « promesse » synchrone, React affiche la page sans attendre.
        ({ then: (resolve: (m: PageModule) => void) => resolve(loaded as PageModule) } as unknown as Promise<PageModule>)
      : preload(),
  ) as LazyPage;

  Component.preload = preload;
  return Component;
}
