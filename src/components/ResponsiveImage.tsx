import { forwardRef, ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Fallback src (1x / default) imported from Vite. */
  src: string;
  /** Optional smaller src for low-DPI screens (≈ 50 % width). */
  srcSmall?: string;
  /** Optional larger src for high-DPI screens (≈ 100 % width). */
  srcLarge?: string;
  /** Approximate display width in CSS pixels. */
  displayWidth?: number;
  alt: string;
}

export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
  ({ src, srcSmall, srcLarge, displayWidth, alt, loading, fetchPriority, ...props }, ref) => {
    const srcSet =
      srcSmall && srcLarge
        ? `${srcSmall} 1x, ${srcLarge} 2x`
        : srcLarge
          ? `${src} 1x, ${srcLarge} 2x`
          : undefined;

    const sizes = displayWidth ? `(max-width: 768px) ${Math.round(displayWidth * 0.9)}px, ${displayWidth}px` : undefined;

    return (
      <img
        ref={ref}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        {...props}
      />
    );
  }
);

ResponsiveImage.displayName = "ResponsiveImage";

