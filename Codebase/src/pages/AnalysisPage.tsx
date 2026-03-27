import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

const quantities = ['Erdbewegung: ca. 12 m³', 'Tragschicht: ca. 8 t', 'Nutzfläche: 78 m²'];

export function AnalysisPage() {
  return (
    <DeviceShell className="flow-screen">
      <AppHeader
        subtitle="Wir haben deine Angaben ausgewertet und eine erste technische Grundlage berechnet."
        title="Analyse Ihrer Gatenfläche"
      />

      <section className="flow-content">
        <FlowProgress />

        <section className="hero-image-card">
          <span className="dark-badge">Fläche erfolgreich analysiert</span>
          <img alt="Analysierte Gartenfläche" src={assets.analysisHero} />
        </section>

        <article className="info-card">
          <h3>Fläche</h3>
          <p>Gesamtfläche: 85 m²</p>
          <p>Erfassungsmethode: AR-Scan</p>
        </article>

        <article className="info-card">
          <h3>Grundmengen (indikativ)</h3>
          {quantities.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <small>Exakte Anpassungen beim Vor-Ort-Termin.</small>
        </article>

        <article className="hint-card">
          <h4>Hinweis</h4>
          <p>
            Diese Berechnung dient als technische Grundlage für dein Projekt. Preise und
            Qualitätsstufen werden im nächsten Schritt festgelegt.
          </p>
        </article>
      </section>

      <footer className="flow-footer">
        <Link className="secondary-pill button-link" to="/flaeche-erfassen">
          Zurück
        </Link>
        <Link className="primary-pill compact button-link" to="/feature-auswahl">
          Weiter
        </Link>
      </footer>
    </DeviceShell>
  );
}
