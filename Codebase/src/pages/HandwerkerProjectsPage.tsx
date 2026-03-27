import { DeviceShell } from '../components/DeviceShell';

const projects = [
  {
    title: 'Privatgarten',
    id: '001',
    status: 'Anfrage offen',
    price: '4.800 - 6.200 €',
    chips: ['Terrasse', 'Rollrasen', 'Zaun', 'Gartenweg', 'Brunnen'],
  },
  {
    title: 'Familiengarten',
    id: '002',
    status: 'Angenommen',
    price: '7.100 - 8.400 €',
    chips: ['Pflaster', 'Rasen', 'Bepflanzung'],
  },
] as const;

export function HandwerkerProjectsPage() {
  return (
    <DeviceShell className="handwerker-screen">
      <section className="handwerker-header">
        <div className="hw-logo">Logo</div>
        <div>
          <h1>Willkommen, Rebo Gala</h1>
          <p>Hier findest du alle dir zugeordneten Projekte.</p>
        </div>
        <div className="hw-avatar" />
      </section>

      <section className="flow-content compact-content">
        <div className="hw-nav">
          <button className="primary-pill hw-nav-btn">Alle Projekte</button>
          <button className="outline-pill hw-nav-btn">Aktive Projekte</button>
        </div>

        <article className="summary-card">
          <p>
            Dies sind Projektanfragen von Kunden. Preise basieren auf ersten Angaben und
            können sich nach fachlicher Prüfung vor Ort ändern.
          </p>
        </article>

        <div className="hw-card-list">
          {projects.map((project, index) => (
            <article className="hw-project-card" key={project.id}>
              <header>
                <div>
                  <h2>{project.title}</h2>
                  <p>Projektnummer: {project.id}</p>
                </div>
                <span className={`hw-status ${index === 0 ? 'open' : 'accepted'}`.trim()}>
                  {project.status}
                </span>
              </header>
              <div className="hw-image-placeholder">AI-Vorschau</div>
              <div className="profile-tags">
                {project.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
              <div className="hw-price">
                <span>Geschätzter Preis</span>
                <strong>{project.price}</strong>
              </div>
              <div className="hw-actions">
                <button className="primary-pill small-pill">Annehmen</button>
                <button className="danger-pill small-pill">Ablehnen</button>
                <button className="outline-pill small-pill">Projekt ansehen</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DeviceShell>
  );
}
