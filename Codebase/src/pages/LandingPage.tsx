import { Link } from 'react-router-dom';
import { BrandLogoLink } from '../components/BrandLogoLink';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

const benefits = [
  {
    icon: '🌿',
    title: 'Elemente frei kombinieren',
    text: 'Wähle und kombiniere Gartenelemente nach deinen Wünschen.',
  },
  {
    icon: '📊',
    title: 'Investitionsrahmen sofort sehen',
    text: 'Erhalte eine transparente Kosteneinschätzung.',
  },
  {
    icon: '📞',
    title: 'direkt mit geprüftem Betrieb verbinden',
    text: 'Finde Fachbetriebe für die Umsetzung eines Projektes.',
  },
] as const;

export function LandingPage() {
  return (
    <DeviceShell className="landing-screen">
      <div className="landing-back-row">
        <Link className="landing-back-link" to="/">
          ← Zurück
        </Link>
      </div>
      <section className="landing-card">
        <div className="landing-brand-row">
          <BrandLogoLink imgClassName="landing-logo" src={assets.brandLogoAlt} />
          <h2>GreenLine Build</h2>
        </div>
        <h1>
          Gestalte deinen Garten neu.
          <br />
          Mit GreenLine Build.
        </h1>
      </section>

      <section className="split-showcase">
        <img alt="Vorher Ansicht" className="split-image split-image-before" src={assets.landingBefore} />
        <img alt="Nachher Ansicht" className="split-image split-image-after" src={assets.landingAfter} />
        <div className="split-divider" />
        <span className="status-pill pill-left">VORHER</span>
        <span className="status-pill pill-right">NACHHER</span>
        <img alt="" aria-hidden="true" className="split-transfer" src={assets.splitTransfer} />
      </section>

      <section className="benefit-grid">
        {benefits.map((benefit) => (
          <article className="benefit-card" key={benefit.title}>
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </section>

      <section className="landing-actions">
        <Link className="primary-pill button-link" to="/login">
          Projekt starten
        </Link>
        <p className="auth-prompt">
          Bereits registriert? <Link to="/login">Anmelden</Link>
        </p>
      </section>
    </DeviceShell>
  );
}
