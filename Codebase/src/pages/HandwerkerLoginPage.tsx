import { Link } from 'react-router-dom';
import { BrandLogoLink } from '../components/BrandLogoLink';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';
import { LoginField } from './LoginPage';

/**
 * Betriebs-Login (Figma Frame 30, node 358:95) – gleiche Struktur wie Kunden-Login; „Anmelden“ → Projekt annehmen (Frame 66 / 451:314).
 */
export function HandwerkerLoginPage() {
  return (
    <DeviceShell className="login-screen">
      <div className="login-card">
        <BrandLogoLink
          fallbackSrc={assets.brandLogoAlt}
          imgClassName="login-logo"
          src={assets.loginFrame2Logo}
        />
        <h1>GreenLine Build</h1>
        <p>Willkommen zurück</p>
        <p className="handwerker-login-hint">Betriebsbereich</p>

        <div className="login-form">
          <LoginField accentClass="accent-yellow" label="E-MAIL ADRESSE" value="ihre@email.de" />
          <LoginField accentClass="accent-navy" value="••••••••" />
        </div>

        <Link className="primary-pill button-link" to="/handwerker-projekt-annehmen">
          Anmelden
        </Link>
        <p className="login-link">Passwort vergessen?</p>

        <div className="login-bottom-copy">
          <p>Noch kein Zugang?</p>
          <p className="register-link">
            <Link to="/">Zur Rollenauswahl</Link>
          </p>
        </div>
      </div>
    </DeviceShell>
  );
}
