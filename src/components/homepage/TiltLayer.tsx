import { useEffect } from "react";

/**
 * Adds a subtle 3D tilt on hover to every [data-tilt] element inside the scope.
 * Uses perspective + rotateX/rotateY (GPU-accelerated only).
 */
export default function TiltLayer({ scope = "main" }: { scope?: string }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || isTouch) return;

    const root = document.querySelector(scope);
    if (!root) return;

    // Auto-tag homepage cards: any direct child link/article inside grids with rounded-2xl/3xl
    const auto = Array.from(
      root.querySelectorAll<HTMLElement>(
        "a.rounded-2xl, a.rounded-3xl, .rounded-2xl[role='article'], [data-tilt]"
      )
    );

    const handlers = auto.map((el) => {
      const max = Number(el.dataset.tiltMax ?? 6);
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -2 * max;
        const ry = (px - 0.5) * 2 * max;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0,0,0)`;
      };
      const onLeave = () => {
        el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translate3d(0,0,0)";
      };
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.willChange = "transform";
      el.style.transformStyle = "preserve-3d";
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return { el, onMove, onLeave };
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        el.style.transform = "";
      });
    };
  }, [scope]);

  return null;
}
