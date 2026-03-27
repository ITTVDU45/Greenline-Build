import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import {
  featureConfigs,
  getCurrentFeature,
  getCurrentFeatureIndex,
  getFeatureDetails,
  getSelectedFeatures,
  setCurrentFeatureIndex,
  updateFeatureDetail,
} from '../data/customerFlow';
import {
  assets,
  brunnenExtraCards,
  gartenhausExtraCards,
  gartenwegExtraCards,
  rollrasenExtraCards,
  terrasseExtraCards,
} from '../data/screens';

export function FeatureExtrasPage() {
  const navigate = useNavigate();
  const feature = getCurrentFeature();
  const config = featureConfigs[feature];
  const currentIndex = getCurrentFeatureIndex();
  const selectedFeatures = getSelectedFeatures();
  const details = getFeatureDetails();
  const [selectedExtras, setSelectedExtras] = useState<string[]>(details[feature].extras);
  const isTerrasse = feature === 'terrasse';
  const isRollrasen = feature === 'rollrasen';
  const isGartenhaus = feature === 'gartenhaus';
  const isBrunnen = feature === 'brunnen';
  const isGartenweg = feature === 'gartenweg';
  const hasRichExtras =
    isTerrasse ||
    isRollrasen ||
    isGartenhaus ||
    isBrunnen ||
    isGartenweg;

  function toggleExtra(extra: string) {
    setSelectedExtras((current) =>
      current.includes(extra) ? current.filter((item) => item !== extra) : [...current, extra],
    );
  }

  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle={hasRichExtras ? 'Wählen Sie Extras aus!' : 'Wählen Sie Extras aus'}
        title={config.title}
      />

      <section className="flow-content compact-content">
        <FlowProgress />

        <article
          className={`hint-card ${hasRichExtras ? 'material-page-hint' : ''}`.trim()}
        >
          <h4>Hinweis</h4>
          <p>
            {isTerrasse
              ? 'Die Ausführung der Steckdose sowie des überdachten Bereichs wird im Rahmen des Vor-Ort-Termins im Detail besprochen. In diesem Schritt geht es ausschließlich um den grundsätzlichen Leistungsumfang.'
              : isRollrasen
                ? 'Auf dieser Seite wählen Sie die Extras zu Ihrem gewünschten Rollrasen aus. Alle weiteren Details zu den Extras werden bei dem Vor-Ort-Termin mit dem Fachbetrieb besprochen.'
                : isGartenhaus
                  ? 'Die Ausführung der ausgewählten Extras sowie alle technischen Details werden im Rahmen des Vor-Ort-Termins fachlich abgestimmt.'
                  : isBrunnen
                    ? 'Pumpenart, Wasserelemente und Beleuchtung werden im Rahmen des Vor-Ort-Termins fachlich abgestimmt.'
                    : isGartenweg
                      ? 'Die Ausführung der Extras wie Beleuchtung, Stufen oder Einfassungen wird beim Vor-Ort-Termin fachlich abgestimmt.'
                      : 'Die Auflistung der ausgewählten Extras sowie der Vor-Ort-Termin helfen dabei, den Aufwand genauer einzuschätzen.'}
          </p>
        </article>

        <section className="option-section">
          <h2 className={hasRichExtras ? 'extras-heading-terrasse' : undefined}>
            Extras{' '}
            <span className={hasRichExtras ? 'extras-heading-muted' : undefined}>(Multi-Select)</span>
          </h2>
          <div className="extras-list">
            {config.extras.map((extra) => {
              const isOn = selectedExtras.includes(extra);
              const richCopy = isTerrasse
                ? terrasseExtraCards[extra]
                : isRollrasen
                  ? rollrasenExtraCards[extra]
                  : isGartenhaus
                    ? gartenhausExtraCards[extra]
                    : isBrunnen
                      ? brunnenExtraCards[extra]
                      : isGartenweg
                        ? gartenwegExtraCards[extra]
                        : undefined;

              return (
                <button
                  className={`extra-card ${isOn ? 'selected' : ''} ${richCopy ? 'extra-card--terrasse' : ''}`.trim()}
                  key={extra}
                  onClick={() => toggleExtra(extra)}
                  type="button"
                >
                  {richCopy ? (
                    <>
                      <div className="extra-thumb">
                        <img
                          alt=""
                          className="extra-thumb-img"
                          decoding="async"
                          loading="lazy"
                          src={richCopy.image}
                        />
                      </div>
                      <div className="extra-card-copy">
                        <strong>{extra}</strong>
                        <p className="extra-card-lead">{richCopy.lead}</p>
                        <p className="extra-card-sub">{richCopy.sub}</p>
                      </div>
                      {isOn ? (
                        <span aria-hidden="true" className="material-card-check extra-card-status">
                          <img
                            alt=""
                            className="feature-check-img"
                            height={16}
                            src={assets.featureSelectionCheck}
                            width={16}
                          />
                        </span>
                      ) : (
                        <span className="extra-card-add-pill">Hinzufügen</span>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="extra-thumb" />
                      <div>
                        <strong>{extra}</strong>
                        <p>{isOn ? 'ausgewählt' : 'hinzufügen'}</p>
                      </div>
                      <span className="project-type-check">{isOn ? '✓' : '+'}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </section>

      <footer className="flow-footer">
        <button className="secondary-pill" onClick={() => navigate('/gestaltung-material')} type="button">
          Zurück
        </button>
        <button
          className="primary-pill"
          onClick={() => {
            updateFeatureDetail(feature, { extras: selectedExtras });
            if (currentIndex < selectedFeatures.length - 1) {
              setCurrentFeatureIndex(currentIndex + 1);
              navigate('/gestaltung-material');
              return;
            }
            navigate('/auswahl-zusammenfassung');
          }}
          type="button"
        >
          Weiter
        </button>
      </footer>
    </DeviceShell>
  );
}
