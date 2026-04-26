import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Awwwards-grade text + element reveal driven by GSAP + ScrollTrigger.
 * - [data-anim="split"]: splits inner text by words and reveals with mask up
 * - [data-anim="fade-up"]: fades + translates Y on enter
 * - [data-anim="fade"]: simple fade in
 * - [data-anim="reveal-img"]: image scale-down from 1.18 with clip mask
 * - [data-anim="stagger"]: animates direct children with stagger
 *
 * Optional: data-delay (seconds), data-stagger (seconds).
 * Reduced motion respected.
 */
export function useGsapReveal(scope: React.RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // ----- SPLIT WORDS -----
      const splitEls = root.querySelectorAll<HTMLElement>('[data-anim="split"]');
      splitEls.forEach((el) => {
        if (el.dataset.splitDone) return;
        const text = el.textContent || "";
        el.textContent = "";
        const words = text.split(/(\s+)/);
        words.forEach((w) => {
          if (/^\s+$/.test(w)) {
            el.appendChild(document.createTextNode(w));
            return;
          }
          const wrap = document.createElement("span");
          wrap.style.display = "inline-block";
          wrap.style.overflow = "hidden";
          wrap.style.verticalAlign = "top";
          wrap.style.lineHeight = "1.05";
          wrap.style.paddingBottom = "0.05em";
          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.style.willChange = "transform,opacity";
          inner.textContent = w;
          wrap.appendChild(inner);
          el.appendChild(wrap);
        });
        el.dataset.splitDone = "1";

        if (reduced) return;
        const inners = el.querySelectorAll<HTMLElement>("span > span");
        gsap.fromTo(
          inners,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            ease: "expo.out",
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            delay: Number(el.dataset.delay ?? 0),
          }
        );
      });

      if (reduced) return;

      // ----- FADE UP -----
      root.querySelectorAll<HTMLElement>('[data-anim="fade-up"]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      // ----- FADE -----
      root.querySelectorAll<HTMLElement>('[data-anim="fade"]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });

      // ----- IMAGE REVEAL -----
      root.querySelectorAll<HTMLElement>('[data-anim="reveal-img"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.18, filter: "brightness(0.7)", clipPath: "inset(8% 8% 8% 8% round 28px)" },
          {
            scale: 1,
            filter: "brightness(1)",
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      // ----- STAGGER CHILDREN -----
      root.querySelectorAll<HTMLElement>('[data-anim="stagger"]').forEach((el) => {
        const children = Array.from(el.children) as HTMLElement[];
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            stagger: Number(el.dataset.stagger ?? 0.1),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // ----- PARALLAX -----
      root.querySelectorAll<HTMLElement>('[data-parallax-y]').forEach((el) => {
        const amount = Number(el.dataset.parallaxY ?? 80);
        gsap.fromTo(
          el,
          { y: -amount / 2 },
          {
            y: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
