import { Link } from 'react-router-dom';
import { BrandLogoLink } from '../components/BrandLogoLink';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

export function LoginField({
  accentClass,
  label,
  value,
}: {
  accentClass: string;
  label?: string;
  value: string;
}) {
  return (
    <label className="login-field">
      {label ? <span className="login-field-label">{label}</span> : null}
      <span className="login-field-value">{value}</span>
      <span className={`login-field-accent ${accentClass}`.trim()} />
    </label>
  );
}

export function LoginPage() {
  return (
    <DeviceShell className="login-screen">
      <div className="login-card">
        <BrandLogoLink imgClassName="login-logo" src={assets.loginFrame2Logo} />
        <h1>GreenLine Build</h1>
        <p>Willkommen zurück</p>

        <div className="login-form">
          <LoginField accentClass="accent-yellow" label="E-MAIL ADRESSE" value="ihre@email.de" />
          <LoginField accentClass="accent-navy" value="••••••••" />
        </div>

        <Link className="primary-pill button-link" to="/projekt-auswahl">
          Anmelden
        </Link>
        <p className="login-link">Passwort vergessen?</p>

        <div className="login-bottom-copy">
          <p>Noch kein Konto?</p>
          <p className="register-link">
            <Link to="/">Registrieren</Link>
          </p>
        </div>
      </div>
    </DeviceShell>
  );
}
