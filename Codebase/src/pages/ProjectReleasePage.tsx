import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';

export function ProjectReleasePage() {
  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle="Jetzt sichtbar an geprüfte Fachbetriebe weiterleiten."
        title="Projektfreischaltung"
      />

      <section className="flow-content">
        <FlowProgress />
        <article className="info-card">
          <h3>Was jetzt passiert</h3>
          <p>Deine Auswahl und der aktuelle Preisrahmen werden verbindlich gespeichert.</p>
          <p>Passende Fachbetriebe erhalten die Anfrage und können dein Projekt prüfen.</p>
          <p>Nach Annahme folgt die direkte Abstimmung des Vor-Ort-Termins.</p>
        </article>

        <article className="summary-card summary-card-green">
          <small>Status</small>
          <strong>Projekt bereit zur Freigabe</strong>
          <p>Terrasse, Rollrasen, Zaun, Vor-Ort-Termin und Investitionsrahmen sind hinterlegt.</p>
        </article>

        <article className="info-card">
          <h3>Hinweis</h3>
          <p>Die Freigabe startet keine zusätzlichen Funktionen, sondern übergibt nur den bestehenden Projektstand.</p>
        </article>
      </section>

      <footer className="upsell-footer">
        <Link className="outline-pill wide button-link" to="/investitionsuebersicht">
          Später
        </Link>
        <Link className="primary-pill wide button-link" to="/dashboard-aktualisiert">
          Projekt freigeben
        </Link>
      </footer>
    </DeviceShell>
  );
}
