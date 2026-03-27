import { Link } from 'react-router-dom';
import { DeviceShell } from '../components/DeviceShell';

const categories = ['Hecken', 'Stauden', 'Bäume', 'Ziergräser', 'Blühpflanzen'];

export function PlantSelectionPage() {
  return (
    <DeviceShell className="wizard-screen">
      <section className="capture-body">
        <p className="back-link dark-link">← Bepflanzung</p>
        <h1>Welche Pflanzen möchtest du?</h1>
        <p>Wähle alle passenden Kategorien</p>
        <p className="swipe-hint">← Swipe für mehr →</p>

        <div className="chip-grid">
          {categories.map((item, index) => (
            <button className={`plant-chip ${index === 0 ? 'selected' : ''}`.trim()} key={item}>
              {item}
            </button>
          ))}
        </div>

        <p className="selection-copy">✓ Ausgewählt: 1 Kategorie</p>
      </section>

      <footer className="flow-footer">
        <Link className="secondary-pill button-link" to="/feature-auswahl">
          Zurück
        </Link>
        <Link className="primary-pill button-link" to="/preisspanne">
          Weiter
        </Link>
      </footer>
    </DeviceShell>
  );
}
