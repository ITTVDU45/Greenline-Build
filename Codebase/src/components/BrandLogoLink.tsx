import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type BrandLogoLinkProps = {
  imgClassName: string;
  src: string;
  /** Bei fehlendem Asset (z. B. vor `figma:pull`) */
  fallbackSrc?: string;
};

/**
 * Markenlogo → Startseite mit Rollenauswahl (`/`).
 */
export function BrandLogoLink({ imgClassName, src, fallbackSrc }: BrandLogoLinkProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Link
      className="brand-logo-link"
      to="/"
      aria-label="Zur Startseite – Rollenauswahl"
    >
      <img
        alt=""
        className={imgClassName}
        src={imgSrc}
        onError={() => {
          if (fallbackSrc && imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
        }}
      />
    </Link>
  );
}
