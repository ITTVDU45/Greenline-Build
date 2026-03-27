import { Link } from 'react-router-dom';
import { DeviceShell } from '../components/DeviceShell';

const starts = ['Sofort', 'In 1-3 Monaten', 'In 3-6 Monaten', 'Noch offen'];
const urgency = ['Hoch', 'Mittel', 'Niedrig'];

export function TimelinePage() {
  return (
    <DeviceShell className="wizard-screen">
      <section className="capture-body">
        <h1>Zeitlicher Rahmen</h1>

        <div className="field-stack">
          <section className="option-section">
            <h2>Projektstart (Optional)</h2>
            <div className="chip-grid">
              {starts.map((item, index) => (
                <button className={`choice-chip ${index === 1 ? 'selected' : ''}`.trim()} key={item}>
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="option-section">
            <h2>Dringlichkeit (Optional)</h2>
            <div className="urgency-list">
              {urgency.map((item, index) => (
                <label className={`urgency-card ${index === 0 ? 'selected' : ''}`.trim()} key={item}>
                  <input defaultChecked={index === 0} name="urgency" type="radio" />
                  <div>
                    <strong>{item}</strong>
                    <p>
                      {item === 'Hoch'
                        ? 'Möglichst zeitnah umsetzen.'
                        : item === 'Mittel'
                          ? 'Flexibler Start möglich.'
                          : 'Nur grobe Orientierung.'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>
      </section>

      <footer className="flow-footer">
        <Link className="secondary-pill button-link" to="/grundstuecksdaten">
          Zurück
        </Link>
        <Link className="primary-pill button-link" to="/flaeche-erfassen">
          Weiter
        </Link>
      </footer>
    </DeviceShell>
  );
}
