import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll luxueux via Lenis (style Lusion / Resn / Awwwards).
 * Désactivé automatiquement si l'utilisateur préfère réduire les animations.
 * N'altère pas le contenu : se contente de "lisser" le scroll natif.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      lerp: 0.1,
    });

    // Expose globally so other modules can sync if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Disable native CSS smooth-scroll while Lenis owns the scroll
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    html.classList.add("lenis-active");

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      html.style.scrollBehavior = prevScrollBehavior;
      html.classList.remove("lenis-active");
    };
  }, []);

  return null;
}
