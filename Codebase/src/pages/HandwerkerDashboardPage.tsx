import { DeviceShell } from '../components/DeviceShell';

export function HandwerkerDashboardPage() {
  return (
    <DeviceShell className="handwerker-screen">
      <section className="handwerker-header">
        <div className="hw-logo">GL</div>
        <div>
          <h1>Willkommen, Rebo Gala</h1>
          <p>Hier findest du deine aktuellen Anfragen und Projekte.</p>
        </div>
        <div className="hw-avatar" />
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
          <button className="primary-pill">Projekt starten →</button>
        </article>
      </section>
    </DeviceShell>
  );
}
