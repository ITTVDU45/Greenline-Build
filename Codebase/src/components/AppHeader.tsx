import { assets } from '../data/screens';
import { BackTextButton } from './BackTextButton';

type AppHeaderProps = {
  title: string;
  subtitle: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <>
      <header className="top-brand-bar">
        <img alt="GreenLine Build" className="brand-mark-sm" src={assets.brandLogoAlt} />
        <img alt="" aria-hidden="true" className="avatar-mark" src={assets.analysisAvatar} />
      </header>
      <section className="hero-header">
        <BackTextButton />
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>
    </>
  );
}
