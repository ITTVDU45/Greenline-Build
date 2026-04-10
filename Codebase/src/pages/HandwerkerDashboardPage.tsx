import { Link } from 'react-router-dom';
import { BrandLogoLink } from '../components/BrandLogoLink';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

export function HandwerkerDashboardPage() {
  return (
    <DeviceShell className="handwerker-screen" width={390}>
      <header className="hw-inquiry-topbar">
        <BrandLogoLink
          fallbackSrc={assets.brandLogoAlt}
          imgClassName="hw-inquiry-brand"
          src={assets.loginFrame2Logo}
        />
        <img alt="" className="hw-inquiry-avatar" src={assets.hwCraftHeaderAvatar} />
      </header>

      <section className="hw-dashboard-intro" aria-label="Begrüßung">
        <h1>Willkommen, Rebo Gala</h1>
        <p>Hier findest du deine aktuellen Anfragen und Projekte.</p>
      </section>

      <section className="flow-content compact-content">
        <article className="hint-card success-flag">
          <h4>Neuer Auftrag!</h4>
          <p>Privatgarten (001) wurde verbindlich beauftragt.</p>
        </article>

        <h3 className="section-heading">Meine Projekte</h3>

        <article className="hw-project-card featured-card">
          <header>
            <div>
              <h2>Privatgarten</h2>
              <p>Projektnummer: 001</p>
            </div>
            <span className="hw-status awarded">Beauftragt</span>
          </header>
          <div className="hw-image-placeholder">AI-Vorschau</div>
          <div className="profile-tags">
            <span>Terrasse</span>
            <span>Rollrasen</span>
            <span>Zaun</span>
            <span>Gartenweg</span>
            <span>Gartenhaus</span>
            <span>Brunnen</span>
          </div>
          <div className="hw-price">
            <span>geschätzter Preis:</span>
            <strong>10.075 €</strong>
          </div>
          <Link
            className="primary-pill button-link"
            state={{ from: '/handwerker-dashboard' }}
            to="/handwerker-anfrage-detail"
          >
            Projekt starten →
          </Link>
        </article>
      </section>
    </DeviceShell>
  );
}
