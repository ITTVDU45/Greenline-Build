import { Link } from 'react-router-dom';
import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

export function HandwerkerProjectAcceptPage() {
  return (
    <DeviceShell className="flow-screen">
      <section className="hero-header">
        <BackTextButton />
        <h1>Projekt annehmen & Kontaktdaten freischalten</h1>
        <p>Nach Annahme erhältst du die Kontaktdaten des Kunden.</p>
      </section>

      <section className="flow-content">
        <article className="info-card">
          <div className="row-line">
            <span>Basispreis (ohne Vorarbeiten)</span>
            <strong>15.600 €</strong>
          </div>
          <div className="row-line">
            <span>Gewählte Elemente</span>
            <strong>Terrasse, Pflaster, Pflanzung</strong>
          </div>
          <div className="row-line">
            <span>Projektstart</span>
            <strong>Innerhalb 0-1 Monat</strong>
          </div>
          <div className="row-line">
            <span>Region</span>
            <strong>PLZ 50733 (Köln)</strong>
          </div>
        </article>

        <article className="hint-card">
          <h4>Freischaltungsgebühr</h4>
          <p>Für die Annahme des Projekts wird eine Gebühr von 2 % fällig.</p>
          <strong className="accent-price">312 €</strong>
        </article>

        <article className="info-card">
          <h3>Was passiert danach?</h3>
          <p>Die Kontaktdaten des Kunden werden sichtbar.</p>
          <p>Du übernimmst die direkte Kontaktaufnahme.</p>
          <p>Ein Vor-Ort-Termin kann direkt abgestimmt werden.</p>
        </article>
      </section>

      <footer className="upsell-footer">
        <Link className="primary-pill wide button-link" to="/kontaktdaten-freischaltung">
          Projekt annehmen
        </Link>
        <Link className="outline-pill wide button-link" to="/handwerker-dashboard">
          Später entscheiden
        </Link>
      </footer>
    </DeviceShell>
  );
}
