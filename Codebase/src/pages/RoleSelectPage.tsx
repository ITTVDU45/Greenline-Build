import { Link } from 'react-router-dom';
import { BrandLogoLink } from '../components/BrandLogoLink';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

export function RoleSelectPage() {
  return (
    <DeviceShell className="role-select-screen" width={390}>
      <section className="role-select-header">
        <BrandLogoLink
          fallbackSrc={assets.brandLogoAlt}
          imgClassName="role-select-logo"
          src={assets.loginFrame2Logo}
        />
        <h1>GreenLine Build</h1>
        <p>Wähle deine Ansicht, um fortzufahren.</p>
      </section>

      <div className="role-select-grid">
        <Link className="role-select-card role-select-card--customer" to="/landing">
          <span className="role-select-card-icon" aria-hidden="true">
            🌿
          </span>
          <strong>Kundensicht</strong>
          <p>Garten planen, konfigurieren und Fachbetriebe finden.</p>
          <span className="role-select-card-cta">Weiter</span>
        </Link>

        <Link className="role-select-card role-select-card--craft" to="/handwerker-login">
          <span className="role-select-card-icon" aria-hidden="true">
            🔧
          </span>
          <strong>Handwerkersicht</strong>
          <p>Anfragen prüfen, Projekte annehmen und Kunden kontaktieren.</p>
          <span className="role-select-card-cta">Weiter</span>
        </Link>
      </div>
    </DeviceShell>
  );
}
