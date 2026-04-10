import { assets } from '../data/screens';
import { BackTextButton } from './BackTextButton';
import { BrandLogoLink } from './BrandLogoLink';

export type TopBrandBarStripProps = {
  /** Zusatzklassen (z. B. handwerker-spezifische Ränder) */
  className?: string;
  logoSrc?: string;
  avatarSrc?: string;
};

/** Obere Leiste wie in der Kundenansicht: Logo links, Profilbild rechts */
export function TopBrandBarStrip({
  className = '',
  logoSrc = assets.loginFrame2Logo,
  avatarSrc = assets.appHeaderProfileIcon,
}: TopBrandBarStripProps) {
  return (
    <header className={`top-brand-bar ${className}`.trim()}>
      <BrandLogoLink
        fallbackSrc={assets.brandLogoAlt}
        imgClassName="app-header-logo"
        src={logoSrc}
      />
      <img
        alt=""
        aria-hidden="true"
        className="avatar-mark"
        src={avatarSrc}
        onError={(e) => {
          const el = e.currentTarget;
          if (el.getAttribute('data-fallback') === '1') return;
          el.setAttribute('data-fallback', '1');
          el.src = assets.analysisAvatar;
        }}
      />
    </header>
  );
}

type AppHeaderProps = {
  title: string;
  subtitle: string;
  /** Standard: Login-Frame2-Logo; optional überschreiben */
  logoSrc?: string;
  /** Standard: Profil-Icon im Header; optional überschreiben */
  avatarSrc?: string;
};

export function AppHeader({
  title,
  subtitle,
  logoSrc = assets.loginFrame2Logo,
  avatarSrc = assets.appHeaderProfileIcon,
}: AppHeaderProps) {
  return (
    <>
      <TopBrandBarStrip avatarSrc={avatarSrc} logoSrc={logoSrc} />
      <section className="hero-header">
        <BackTextButton />
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>
    </>
  );
}
