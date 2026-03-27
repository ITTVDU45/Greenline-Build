import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

export function TerminConfirmationPage() {
  return (
    <DeviceShell className="flow-screen" width={380}>
      <section className="hero-header">
        <BackTextButton />
        <h1>Terminvorschlag bestätigen</h1>
        <p>Projekt: Privatgarten #001</p>
      </section>

      <section className="flow-content compact-content">
        <article className="hint-card success-flag">
          <h4>Neuer Terminvorschlag</h4>
          <p>Max Mustermann hat eine Uhrzeit vorgeschlagen.</p>
        </article>

        <article className="info-card customer-card">
          <div className="customer-avatar">MM</div>
          <div>
            <h3>Max Mustermann</h3>
            <p>Kunde · Privatgarten</p>
          </div>
        </article>

        <article className="info-card">
          <h3>Vorgeschlagener Termin</h3>
          <div className="profile-tags">
            <span>Dienstag, 4. März 2026</span>
            <span>10:00 Uhr</span>
            <span>Geschätzt: 2-3 Stunden</span>
          </div>
          <p>Musterstraße 12, 80331 München</p>
        </article>

        <article className="info-card">
          <h3>Nachricht vom Kunden</h3>
          <p>"Guten Tag, 10:00 wäre mir am liebsten. Parkplatz ist direkt vor dem Haus."</p>
          <small>Vor 15 Minuten</small>
        </article>
      </section>

      <footer className="upsell-footer">
        <button className="primary-pill wide">Termin bestätigen</button>
        <button className="outline-pill wide">Alternative vorschlagen</button>
        <button className="secondary-pill wide-secondary">Termin ablehnen</button>
      </footer>
    </DeviceShell>
  );
}
