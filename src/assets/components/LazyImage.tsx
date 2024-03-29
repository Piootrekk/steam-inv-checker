import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  return (
    <LazyLoadImage
      effect="blur"
      src={src}
      alt={alt}
      width="100%"
      height="100%"
    />
  );
};

export default LazyImage;
