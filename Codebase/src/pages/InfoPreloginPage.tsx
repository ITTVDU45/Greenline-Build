import { Link } from 'react-router-dom';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

const highlights = [
  { icon: '✦', title: 'Elemente', text: 'frei kombinieren' },
  { icon: '€', title: 'Investitionsrahmen', text: 'sofort sehen' },
  { icon: '✓', title: 'Direkt mit geprüften', text: 'Betrieben verbinden' },
] as const;

export function InfoPreloginPage() {
  return (
    <DeviceShell className="prelogin-screen" width={380}>
      <section className="prelogin-hero">
        <img alt="Vorher Ansicht" className="prelogin-side prelogin-before" src={assets.landingBefore} />
        <img alt="Nachher Ansicht" className="prelogin-side prelogin-after" src={assets.landingAfter} />
        <div className="prelogin-overlay" />
        <div className="prelogin-divider" />
        <span className="status-pill pill-left">VORHER</span>
        <span className="status-pill pill-right">NACHHER</span>
      </section>

      <section className="prelogin-content">
        <h1>
          Gestalte deinen Garten selbst
          <br />
          und finde den passenden Fachbetrieb.
        </h1>
        <p>
          Wähle Elemente, sieh deine Visualisierung und erhalte eine transparente
          Investitionsübersicht.
        </p>

        <div className="prelogin-grid">
          {highlights.map((item) => (
            <article className="prelogin-card" key={item.title}>
              <div className="prelogin-icon">{item.icon}</div>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </article>
          ))}
        </div>

        <Link className="primary-pill button-link" to="/projekt-anlegen">
          Projekt starten
        </Link>
        <p className="auth-prompt prelogin-auth">
          Bereits registriert? <Link to="/login">Anmelden</Link>
        </p>
      </section>
    </DeviceShell>
  );
}
