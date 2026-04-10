import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogoLink } from '../components/BrandLogoLink';
import { DeviceShell } from '../components/DeviceShell';
import { migrateLegacySnapshot001, switchToProject, type ProjectTypeTitle } from '../data/projectFlowSnapshot';
import { assets } from '../data/screens';

const projects: Array<{
  displayName: string;
  projectType: ProjectTypeTitle;
  nr: string;
  status: string;
  city: string;
}> = [
  {
    displayName: 'Privatgarten',
    projectType: 'Privatgarten',
    nr: '001',
    status: 'Projekt gestartet',
    city: 'München, 80331',
  },
  {
    displayName: 'Hotelgarten',
    projectType: 'Hotelgarten',
    nr: '002',
    status: 'Vor-Ort-Termin akzeptiert',
    city: 'Duisburg, 47166',
  },
  {
    displayName: 'Schrebergarten',
    projectType: 'Schrebergarten / Kleingarten',
    nr: '003',
    status: 'Projekt angefragt',
    city: 'Düsseldorf, 40213',
  },
];

export function DashboardUpdatedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    migrateLegacySnapshot001();
  }, []);

  function openProjectFlow(projectId: string, projectType: ProjectTypeTitle) {
    switchToProject(projectId, projectType);
    navigate('/projekt-auswahl');
  }

  return (
    <DeviceShell className="handwerker-screen" width={380}>
      <header className="top-brand-bar">
        <BrandLogoLink
          fallbackSrc={assets.brandLogoAlt}
          imgClassName="app-header-logo"
          src={assets.loginFrame2Logo}
        />
        <img alt="" aria-hidden="true" className="avatar-mark" src={assets.appHeaderProfileIcon} />
      </header>

      <section className="flow-content compact-content">
        <section className="dashboard-title-block">
          <h1>Willkommen, Max</h1>
          <p>Hier findest du deine aktuellen Projekte.</p>
        </section>

        <div className="hw-nav">
          <Link className="primary-pill hw-nav-btn button-link" to="/projekt-anlegen">
            Garten erstellen
          </Link>
          <Link className="outline-pill hw-nav-btn button-link" to="/dashboard-aktualisiert">
            Meine Projekte
          </Link>
        </div>

        <article className="hint-card success-flag">
          <h4>Hinweis</h4>
          <p>Dein Privatgarten-Projekt wurde gestartet.</p>
        </article>

        <h3 className="section-heading">Aktuelle Projekte</h3>
        <div className="hw-card-list">
          {projects.map(({ displayName, projectType, nr, status, city }, index) => (
            <button
              aria-label={`${displayName}, Projekt ${nr}: Gespeicherten Ablauf und Auswahlen öffnen`}
              className="hw-project-card"
              key={nr}
              onClick={() => openProjectFlow(nr, projectType)}
              type="button"
            >
              <header>
                <div>
                  <h2>{displayName}</h2>
                  <p>Projektnummer: {nr}</p>
                </div>
                <span
                  className={`hw-status ${index === 0 ? 'awarded' : index === 1 ? 'accepted' : 'open'}`.trim()}
                >
                  {status}
                </span>
              </header>
              <p>{city}</p>
            </button>
          ))}
        </div>
      </section>
    </DeviceShell>
  );
}
