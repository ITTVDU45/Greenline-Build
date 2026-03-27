import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { featureConfigs, getFeatureDetails, getSelectedFeatures } from '../data/customerFlow';

export function SelectionSummaryPage() {
  const selectedFeatures = getSelectedFeatures();
  const details = getFeatureDetails();
  const selectedExtras = selectedFeatures.flatMap((feature) =>
    details[feature].extras.map((extra) => ({
      feature,
      extra,
    })),
  );

  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader subtitle="Bitte prüfe deine Angaben." title="Auswahl Zusammenfassung" />

      <section className="flow-content compact-content">
        <FlowProgress />

        <article className="summary-list-card">
          <div className="summary-block">
            <h3>Elemente die ausgewählt wurden</h3>
            <div className="summary-tag-stack">
              {selectedFeatures.map((feature) => (
                <span key={feature}>{featureConfigs[feature].title.replace(' gestalten', '')}</span>
              ))}
            </div>
          </div>

          <div className="summary-block">
            <h3>Ausgewählte Materialien</h3>
            <div className="summary-tag-stack">
              {selectedFeatures.map((feature) => (
                <span key={feature}>
                  <strong>{featureConfigs[feature].title.replace(' gestalten', '')}</strong>
                  <small>
                    {details[feature].size} {featureConfigs[feature].measureLabel} ·{' '}
                    {details[feature].material}
                  </small>
                </span>
              ))}
            </div>
          </div>

          <div className="summary-block">
            <h3>Ausgewählte Extras</h3>
            <div className="summary-tag-stack">
              {selectedExtras.map(({ feature, extra }) => (
                <span key={`${feature}-${extra}`}>
                  <strong>{featureConfigs[feature].title.replace(' gestalten', '')}</strong>
                  <small>{extra}</small>
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="summary-text-card">
          <h3>Projektbeschreibung</h3>
          <p>
            Ziel ist die Gestaltung eines authentischen, hochwertigen und zugleich modernen
            Gartenbereichs. Die gewählten Elemente sollen natürlich miteinander harmonieren,
            eine klare Struktur schaffen und die vorhandene Fläche hochwertig aufwerten.
            Der Fokus liegt auf einem stimmigen Gesamtbild mit langlebiger Materialauswahl.
          </p>
        </article>

        <article className="summary-confirm-card">
          <div className="summary-confirm-icon">✓</div>
          <div>
            <h3>Bestätigung</h3>
            <p>Ich habe alle Angaben geprüft und abgesendet, sodass jetzt mein Vor-Ort-Termin folgt.</p>
          </div>
        </article>
      </section>

      <footer className="flow-footer">
        <Link className="secondary-pill button-link" to="/gestaltung-extras">
          Zurück
        </Link>
        <Link className="primary-pill button-link" to="/paket-auswahl">
          Weiter
        </Link>
      </footer>
    </DeviceShell>
  );
}
