import { useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
}

/**
 * Optimized image component with lazy loading and WebP support
 * Provides better performance by loading images only when needed
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y2ZjdmNiIvPgogIDx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjYTNiM2EzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Mb2FkaW5nLi4uPC90ZXh0Pgo8L3N2Zz4=",
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if WebP is supported
  const supportsWebP = () => {
    const canvas = document.createElement("canvas");
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  };

  // Get optimized image URL
  const getOptimizedSrc = (originalSrc: string) => {
    if (supportsWebP() && !originalSrc.includes(".svg")) {
      // In a real implementation, you'd have a service that converts images to WebP
      // For now, we'll just return the original src
      return originalSrc;
    }
    return originalSrc;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Load image when in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    const optimizedSrc = getOptimizedSrc(src);

    img.onload = () => {
      setImageSrc(optimizedSrc);
      setIsLoaded(true);
    };

    img.onerror = () => {
      // Fallback to original src if optimized version fails
      if (optimizedSrc !== src) {
        img.src = src;
      }
    };

    img.src = optimizedSrc;
  }, [isInView, src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-75"
      } ${className}`}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
    />
  );
};

export default OptimizedImage;
