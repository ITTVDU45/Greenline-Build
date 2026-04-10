import { Link, useLocation } from 'react-router-dom';
import { TopBrandBarStrip } from '../components/AppHeader';
import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

type ContactUnlockLocationState = { from?: string };

export function ContactUnlockPage() {
  const location = useLocation();
  const backTarget =
    (location.state as ContactUnlockLocationState | null)?.from ?? '/handwerker-projekt-annehmen';

  return (
    <DeviceShell className="hw-contact-screen" width={390}>
      <TopBrandBarStrip className="hw-contact-topbar" />

      <div className="hw-contact-body">
        <div className="hw-contact-green">
          <BackTextButton className="hw-inquiry-back" fallbackTo={backTarget} />
          <h1 className="hw-contact-title">Kontaktdaten freigeschaltet</h1>
          <p className="hw-contact-sub">Du kannst den Kunden jetzt direkt kontaktieren.</p>
        </div>

        <article className="hw-contact-card">
          <div className="hw-contact-success-icon" aria-hidden="true">
            ✓
          </div>
          <h3>Projekt erfolgreich aktiviert</h3>
          <p>Zahlung bestätigt. Kontaktdaten sind jetzt sichtbar.</p>
        </article>

        <article className="hw-contact-card hw-contact-profile">
          <h3>Kundenprofil</h3>
          <div className="contact-grid">
            <span>Name</span>
            <strong>Max Mustermann</strong>
            <span>Telefon</span>
            <strong>+49 171 1234567</strong>
            <span>E-Mail</span>
            <span>
              <a className="hw-contact-mail" href="mailto:max.mustermann@email.de">
                max.mustermann@email.de
              </a>
            </span>
            <span>Adresse</span>
            <strong>Beispielstr. 111, 471234 Berlin</strong>
          </div>
          <div className="profile-tags">
            <span>📞 Anrufen</span>
            <span>✉ E-Mail senden</span>
            <span>📍 Route öffnen</span>
          </div>
        </article>

        <article className="hw-contact-card">
          <h3>Terminvorschlag vom Kunden</h3>
          <p>01. März 2026, 10:00 Uhr</p>
        </article>

        <article className="hw-contact-card">
          <h3>Nächster Schritt</h3>
          <p>
            Bitte nimm innerhalb von 24 Stunden Kontakt auf, um den Vor-Ort-Termin zu vereinbaren.
          </p>
        </article>

        <div className="hw-contact-footer-actions">
          <Link className="primary-pill wide button-link" to="/handwerker-dashboard">
            Kontaktaufnahme bestätigen
          </Link>
          <Link className="hw-contact-later" to="/handwerker-dashboard">
            Projekt später bearbeiten
          </Link>
        </div>
      </div>
    </DeviceShell>
  );
}
