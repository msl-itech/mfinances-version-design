import { useEffect } from "react";
import MagneticLayer from "./MagneticLayer";
import TiltLayer from "./TiltLayer";
import ScrollProgress from "./ScrollProgress";
import SmoothScroll from "./SmoothScroll";

/**
 * Layers premium visual/motion enhancements on top of the homepage
 * without modifying any section's markup, copy, images, colors or links.
 *
 * - Custom cursor with magnetic interactive feedback
 * - Magnetic pull on CTAs / [data-magnetic] elements
 * - 3D tilt on cards (auto-applied to .rounded-2xl/3xl anchors in <main>)
 * - Top scroll progress bar
 * - Section reveal: applies .visible to existing .reveal nodes via IO
 *   (fallback in case the per-section observer misses anything)
 * - Parallax on elements tagged [data-parallax]
 * - Hides default cursor on fine-pointer devices, restores on touch
 */
export default function HomepageEnhancer() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFine = window.matchMedia("(pointer: fine)").matches;

    // Reveal fallback: ensure any .reveal in viewport gets .visible
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("main .reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    // Auto-emerge: tag eligible blocks inside <main> with .emerge so they
    // softly rise + fade in as they enter the viewport (Awwwards-style).
    const emergeSelectors = [
      "main h2",
      "main h3",
      "main p",
      "main [data-emerge]",
      "main .rounded-2xl",
      "main .rounded-3xl",
    ].join(",");
    const emergeCandidates = Array.from(
      document.querySelectorAll<HTMLElement>(emergeSelectors)
    ).filter((el) => !el.classList.contains("reveal") && !el.closest(".reveal"));
    emergeCandidates.forEach((el, i) => {
      el.classList.add("emerge");
      // Subtle stagger based on DOM order within parent
      const delay = Math.min((i % 6) * 60, 300);
      el.style.transitionDelay = `${delay}ms`;
    });
    const emergeIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("emerged");
            emergeIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    if (!reduced) emergeCandidates.forEach((el) => emergeIO.observe(el));

    // Parallax (multi-speed for depth) — uses [data-parallax] on text/images
    let raf = 0;
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("main [data-parallax]")
    );
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        parallaxEls.forEach((el) => {
          const speed = Number(el.dataset.parallax ?? 0.15);
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - vh / 2;
          el.style.transform = `translate3d(0, ${center * -speed}px, 0)`;
        });
      });
    };
    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    return () => {
      io.disconnect();
      emergeIO.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <MagneticLayer scope="main" />
      <TiltLayer scope="main" />
      {/* Grain overlay — fixed, ultra subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay grain-layer"
      />
    </>
  );
}
