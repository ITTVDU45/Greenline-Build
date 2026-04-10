import { Link } from 'react-router-dom';
import { BrandLogoLink } from '../components/BrandLogoLink';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

const projects = [
  {
    title: 'Privatgarten',
    number: '001',
    status: 'Projekt gestartet',
    location: 'München, 80331',
  },
  {
    title: 'Vorgarten',
    number: '002',
    status: 'Vor-Ort-Termin bestätigt',
    location: 'Köln, 50667',
  },
] as const;

export function HomeOverviewPage() {
  return (
    <DeviceShell className="handwerker-screen" width={390}>
      <section className="handwerker-header">
        <BrandLogoLink
          fallbackSrc={assets.brandLogoAlt}
          imgClassName=""
          src={assets.loginFrame2Logo}
        />
        <div>
          <h1>Willkommen, Max</h1>
          <p>Hier findest du deine aktuellen Projekte.</p>
        </div>
        <div className="hw-avatar" />
      </section>

      <section className="flow-content compact-content">
        <div className="home-actions-grid">
          <Link className="home-action-card home-action-card-primary button-link-card" to="/projekt-anlegen">
            <span className="home-action-icon">＋</span>
            <h2>Garten erstellen</h2>
          </Link>
          <Link className="home-action-card button-link-card" to="/dashboard-aktualisiert">
            <span className="home-action-icon">▣</span>
            <h2>Meine Projekte</h2>
          </Link>
        </div>

        <section className="summary-card">
          <small>Schnellzugriff</small>
          <strong>1 Projekt wartet auf deinen nächsten Schritt.</strong>
          <p>Bearbeite laufende Anfragen oder starte eine neue Gartenplanung.</p>
        </section>

        <h3 className="section-heading">Aktuelle Projekte</h3>
        <div className="hw-card-list">
          {projects.map((project, index) => (
            <article className="hw-project-card" key={project.number}>
              <header>
                <div>
                  <h2>{project.title}</h2>
                  <p>Projektnummer: {project.number}</p>
                </div>
                <span className={`hw-status ${index === 0 ? 'awarded' : 'accepted'}`}>
                  {project.status}
                </span>
              </header>
              <p>{project.location}</p>
            </article>
          ))}
        </div>
      </section>
    </DeviceShell>
  );
}
