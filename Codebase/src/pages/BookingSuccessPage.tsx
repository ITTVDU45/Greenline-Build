import { Link } from 'react-router-dom';
import { DeviceShell } from '../components/DeviceShell';

const details = [
  ['Buchungsnr.', 'GLB-2026-00847'],
  ['Projekt', 'Privatgarten #001'],
  ['Gesamtpreis', '10.075 €'],
  ['Starttermin', 'Di, 4. März 2026'],
  ['Handwerker', 'GreenLine Gartenbau'],
] as const;

const steps = [
  ['Buchung bestätigt', 'Soeben', true],
  ['Handwerker wird benachrichtigt', 'In Kürze', false],
  ['Vor-Ort-Termin am 4. März', '10:00 Uhr', false],
] as const;

export function BookingSuccessPage() {
  return (
    <DeviceShell className="success-screen" width={380}>
      <section className="success-hero">
        <div className="success-rings">
          <div />
          <div />
          <span>✓</span>
        </div>
        <h1>Buchung erfolgreich!</h1>
        <p>Deine Anfrage wurde verbindlich gesendet.</p>
      </section>

      <section className="flow-content compact-content">
        <article className="info-card">
          <h3>Buchungsdetails</h3>
          {details.map(([label, value]) => (
            <div className="row-line" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </article>

        <article className="info-card">
          <h3>Nächste Schritte</h3>
          <div className="timeline-list">
            {steps.map(([label, sub, active]) => (
              <div className="timeline-item" key={label}>
                <span className={`timeline-dot ${active ? 'active' : ''}`.trim()} />
                <div>
                  <strong>{label}</strong>
                  <p>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="hint-card">
          <h4>Bestätigung per E-Mail gesendet</h4>
          <p>Du erhältst alle Details auch per E-Mail.</p>
        </article>
      </section>

      <footer className="upsell-footer">
        <Link className="primary-pill wide button-link" to="/dashboard-aktualisiert">
          Zum Dashboard →
        </Link>
        <button className="outline-pill wide">Buchung teilen</button>
      </footer>
    </DeviceShell>
  );
}
