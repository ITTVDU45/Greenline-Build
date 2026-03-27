import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

export function ContactUnlockPage() {
  return (
    <DeviceShell className="flow-screen">
      <section className="hero-header">
        <BackTextButton />
        <h1>Kontaktdaten freigeschaltet</h1>
        <p>Du kannst den Kunden jetzt direkt kontaktieren.</p>
      </section>

      <section className="flow-content">
        <article className="hint-card success-flag">
          <h4>Projekt erfolgreich aktiviert</h4>
          <p>
            Die Projektgebühr wurde bestätigt. Die Kontaktdaten des Kunden sind nun für dich
            sichtbar.
          </p>
        </article>

        <article className="info-card">
          <h3>Kundenprofil</h3>
          <div className="contact-grid">
            <span>Name</span>
            <strong>Max Mustermann</strong>
            <span>Telefon</span>
            <strong>+49 171 1234567</strong>
            <span>E-Mail</span>
            <strong>max.mustermann@email.de</strong>
            <span>Adresse</span>
            <strong>Musterstraße 12, 50733 Köln</strong>
            <span>Projektstart</span>
            <strong>Innerhalb 0–1 Monat</strong>
          </div>
          <div className="profile-tags">
            <span>📞 Anrufen</span>
            <span>✉ E-Mail senden</span>
            <span>📍 Route öffnen</span>
          </div>
        </article>

        <article className="info-card">
          <h3>Nächster Schritt</h3>
          <p>
            Bitte nimm innerhalb von 24 Stunden Kontakt mit dem Kunden auf, um einen
            Vor-Ort-Termin zu vereinbaren.
          </p>
          <small>Eine schnelle Rückmeldung erhöht deine Abschlusswahrscheinlichkeit.</small>
        </article>

        <article className="info-card">
          <h3>Kontaktaufnahme</h3>
          <label className="status-row">
            <input type="checkbox" />
            <span>Noch nicht erfolgt</span>
          </label>
          <label className="status-row">
            <input type="checkbox" />
            <span>Kunde kontaktiert</span>
          </label>
        </article>
      </section>

      <footer className="upsell-footer">
        <button className="primary-pill wide">Kontaktaufnahme bestätigen</button>
        <button className="outline-pill wide">Projekt später bearbeiten</button>
      </footer>
    </DeviceShell>
  );
}
