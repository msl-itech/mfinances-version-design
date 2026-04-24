import { useEffect } from "react";

/**
 * Adds magnetic-pull hover effect to all elements with [data-magnetic],
 * and to all anchors/buttons inside the homepage scope by default.
 * Pure DOM — no React rerenders. Respects prefers-reduced-motion.
 */
export default function MagneticLayer({ scope = "main" }: { scope?: string }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || isTouch) return;

    const root = document.querySelector(scope);
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(
        "[data-magnetic], a.btn-magnetic, button.btn-magnetic"
      )
    );

    const handlers = targets.map((el) => {
      const strength = Number(el.dataset.magneticStrength ?? 0.35);
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      };
      const onLeave = () => {
        el.style.transform = "translate3d(0, 0, 0)";
      };
      el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.willChange = "transform";
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return { el, onMove, onLeave };
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [scope]);

  return null;
}
