import { Link } from 'react-router-dom';

type BrandLogoLinkProps = {
  imgClassName: string;
  src: string;
};

/**
 * Markenlogo → Startseite mit Rollenauswahl (`/`).
 */
export function BrandLogoLink({ imgClassName, src }: BrandLogoLinkProps) {
  return (
    <Link
      className="brand-logo-link"
      to="/"
      aria-label="Zur Startseite – Rollenauswahl"
    >
      <img alt="" className={imgClassName} src={src} />
    </Link>
  );
}
