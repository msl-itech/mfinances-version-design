import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App, { preloadRoute } from "./App.tsx";
import "./index.css";

function render() {
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}

// La page demandée est chargée avant le premier affichage : le contenu pré-rendu
// reste visible pendant ce temps, sans écran blanc. En cas d'échec du préchargement,
// l'application s'affiche quand même (la page sera chargée au rendu).
preloadRoute(window.location.pathname).then(render, render);
