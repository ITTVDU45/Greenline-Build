import { Link } from 'react-router-dom';
import { DeviceShell } from '../components/DeviceShell';

const lotTypes = ['Einfamilienhaus', 'Reihenhaus', 'Neubau', 'Bestandsgarten'];
const accessTypes = ['Direkter Zugang', 'Nur durch Haus', 'Schmale Einfahrt'];
const slopeTypes = ['Eben', 'Leichte Hanglage', 'Starke Hanglage'];

export function GroundDataPage() {
  return (
    <DeviceShell className="wizard-screen">
      <section className="capture-body">
        <h1>Grundstücksdaten</h1>

        <div className="field-stack">
          <section className="option-section">
            <h2>Grundstückstyp *</h2>
            <div className="chip-grid">
              {lotTypes.map((item, index) => (
                <button className={`choice-chip ${index === 0 ? 'selected' : ''}`.trim()} key={item}>
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="option-section">
            <h2>Zugänglichkeit (Optional)</h2>
            <div className="chip-grid">
              {accessTypes.map((item) => (
                <button className="choice-chip muted" key={item}>
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="option-section">
            <h2>Hanglage / Besonderheiten</h2>
            <div className="chip-grid">
              {slopeTypes.map((item) => (
                <button className="choice-chip muted" key={item}>
                  {item}
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>

      <footer className="flow-footer">
        <Link className="secondary-pill button-link" to="/projekt-anlegen">
          Zurück
        </Link>
        <Link className="primary-pill button-link" to="/zeitrahmen">
          Weiter
        </Link>
      </footer>
    </DeviceShell>
  );
}
