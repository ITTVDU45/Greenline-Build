import { Link } from 'react-router-dom';
import { DeviceShell } from '../components/DeviceShell';

export function ProjectCreatePage() {
  return (
    <DeviceShell className="wizard-screen">
      <section className="capture-body">
        <h1>Projekt anlegen</h1>
        <p>Bitte gib die Grunddaten ein</p>

        <div className="field-stack">
          <label className="login-field">
            <span className="login-field-label">PROJEKTNAME</span>
            <span className="login-field-value">Mein Traumgarten</span>
          </label>

          <label className="login-field multi-field">
            <span className="login-field-label">ADRESSE</span>
            <span className="login-field-value">Musterstraße 123</span>
            <span className="login-field-value">80331 München</span>
          </label>
        </div>
      </section>

      <footer className="flow-footer">
        <Link className="secondary-pill button-link" to="/infoscreen-prelogin">
          Zurück
        </Link>
        <Link className="primary-pill button-link" to="/grundstuecksdaten">
          Weiter
        </Link>
      </footer>
    </DeviceShell>
  );
}
