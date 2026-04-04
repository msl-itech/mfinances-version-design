import { useRef, useState, useEffect } from "react";

interface MobileCarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
}

export default function MobileCarousel({ children, className = "", itemClassName = "" }: MobileCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = children.length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const childWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth + 12
        : 1;
      setActiveIndex(Math.round(scrollLeft / childWidth));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultItem = "w-[80vw] max-w-[320px]";

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children.map((child, i) => (
          <div key={i} className={`${itemClassName || defaultItem} flex-shrink-0 snap-center`}>
            {child}
          </div>
        ))}
      </div>
      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-4 bg-accent" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
