import { useEffect } from "react";

/**
 * 3D tilt + magnetic glow on hover.
 * Targets any element matching the selector inside the scope.
 *
 * Usage in JSX:
 *   <div data-tilt> ... </div>
 *
 * Optional attributes:
 *   data-tilt-max="10"   — max rotation in degrees (default 8)
 *   data-tilt-glow="1"   — enable cursor glow overlay (default on)
 */
export function useTilt(scope: React.RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
    const cleanups: Array<() => void> = [];

    els.forEach((el) => {
      const max = Number(el.dataset.tiltMax ?? 8);
      const glow = el.dataset.tiltGlow !== "0";

      // Ensure perspective and smooth transform
      el.style.transformStyle = "preserve-3d";
      el.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.willChange = "transform";

      // Inject glow layer
      let glowEl: HTMLDivElement | null = null;
      if (glow) {
        glowEl = document.createElement("div");
        glowEl.style.cssText = `
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            260px circle at var(--tilt-x, 50%) var(--tilt-y, 50%),
            hsl(var(--accent) / 0.18),
            transparent 60%
          );
          mix-blend-mode: screen;
          z-index: 2;
        `;
        // Make sure parent can host an absolute child
        const computed = window.getComputedStyle(el);
        if (computed.position === "static") {
          el.style.position = "relative";
        }
        el.appendChild(glowEl);
      }

      let rafId = 0;
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width; // 0..1
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * max * 2;
        const ry = (px - 0.5) * max * 2;

        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          el.style.transform = `perspective(900px) rotateX(${rx.toFixed(
            2
          )}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
          if (glowEl) {
            glowEl.style.setProperty("--tilt-x", `${(px * 100).toFixed(1)}%`);
            glowEl.style.setProperty("--tilt-y", `${(py * 100).toFixed(1)}%`);
          }
        });
      };

      const onEnter = () => {
        el.style.transition = "transform 0.15s ease-out";
        if (glowEl) glowEl.style.opacity = "1";
      };
      const onLeave = () => {
        cancelAnimationFrame(rafId);
        el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
        if (glowEl) glowEl.style.opacity = "0";
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        if (glowEl && glowEl.parentNode === el) el.removeChild(glowEl);
        el.style.transform = "";
        el.style.transition = "";
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
