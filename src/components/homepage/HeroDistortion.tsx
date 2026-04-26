import { useEffect, useRef } from "react";

/**
 * Effet de distorsion liquide sur le hero au passage de la souris.
 * - Filtre SVG feTurbulence + feDisplacementMap appliqué à un conteneur cible
 * - L'amplitude suit la vitesse + la position du curseur (ressort, easing)
 * - L'orbe lumineuse suit le curseur (parallax glow)
 * - Désactivé sur tactile et prefers-reduced-motion
 *
 * Usage : monter <HeroDistortion targetSelector="[data-hero-distort]" />
 * et ajouter `data-hero-distort` sur le conteneur du hero (l'image incluse).
 */
export default function HeroDistortion({
  targetSelector = "[data-hero-distort]",
}: {
  targetSelector?: string;
}) {
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || isTouch) return;

    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    // Applique le filtre SVG sur la cible
    const previousFilter = target.style.filter;
    const previousWillChange = target.style.willChange;
    target.style.willChange = "filter";

    let scale = 0; // amplitude actuelle
    let targetScale = 0;
    let baseFreq = 0.012;
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    let raf = 0;
    let active = false;

    const onEnter = () => {
      active = true;
      targetScale = 28;
      target.style.filter = "url(#hero-liquid-distort)";
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    const onLeave = () => {
      active = false;
      targetScale = 0;
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const speed = Math.min(Math.sqrt(dx * dx + dy * dy), 60);
      lastX = mouseX;
      lastY = mouseY;
      // Plus on bouge vite, plus la distorsion gonfle
      targetScale = active ? 28 + speed * 1.2 : 0;
      baseFreq = 0.008 + (speed / 60) * 0.025;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mouseX - 200}px, ${mouseY - 200}px, 0)`;
      }
    };

    const tick = () => {
      // Easing ressort
      scale += (targetScale - scale) * 0.12;
      if (dispRef.current) dispRef.current.setAttribute("scale", scale.toFixed(2));
      if (turbRef.current) turbRef.current.setAttribute("baseFrequency", baseFreq.toFixed(4));

      // Si éteint et amplitude négligeable -> retire le filtre pour libérer le GPU
      if (!active && scale < 0.4) {
        scale = 0;
        if (dispRef.current) dispRef.current.setAttribute("scale", "0");
        target.style.filter = previousFilter || "";
      }
      raf = requestAnimationFrame(tick);
    };

    target.addEventListener("mouseenter", onEnter);
    target.addEventListener("mouseleave", onLeave);
    target.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("mouseleave", onLeave);
      target.removeEventListener("mousemove", onMove);
      target.style.filter = previousFilter || "";
      target.style.willChange = previousWillChange || "";
    };
  }, [targetSelector]);

  return (
    <>
      {/* Filtre SVG global (invisible) */}
      <svg
        aria-hidden="true"
        className="absolute w-0 h-0 pointer-events-none"
        style={{ position: "absolute" }}
      >
        <defs>
          <filter id="hero-liquid-distort" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed="4"
              result="turb"
            >
              <animate
                attributeName="seed"
                from="1"
                to="100"
                dur="8s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="turb"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Orbe lumineuse qui suit le curseur (rendue dans le hero via portal-like fixed layer) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full opacity-0 transition-opacity duration-500 z-[5] mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.35) 0%, hsl(var(--accent) / 0.12) 35%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </>
  );
}
