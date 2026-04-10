import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import {
  featureConfigs,
  getCurrentFeature,
  getCurrentFeatureIndex,
  getFeatureDetails,
  setCurrentFeatureIndex,
  updateFeatureDetail,
  type FeatureKey,
} from '../data/customerFlow';
import {
  assets,
  brunnenMaterialImages,
  gartenhausMaterialImages,
  gartenwegMaterialImages,
  rollrasenMaterialImages,
  terrasseMaterialImages,
} from '../data/screens';

function normalizeTerrasseMaterial(material: string): string {
  if (material === 'WPC') return 'Kies';
  return material;
}

function getMaterialThumbUrl(feature: FeatureKey, material: string): string | undefined {
  if (feature === 'terrasse') return terrasseMaterialImages[material];
  if (feature === 'rollrasen') return rollrasenMaterialImages[material];
  if (feature === 'gartenhaus') return gartenhausMaterialImages[material];
  if (feature === 'brunnen') return brunnenMaterialImages[material];
  if (feature === 'gartenweg') return gartenwegMaterialImages[material];
  return undefined;
}

function getMaterialSurpriseAsset(feature: FeatureKey): string {
  if (feature === 'terrasse') return assets.materialTerrasseSurprise;
  if (feature === 'rollrasen') return assets.materialRollrasenSurprise;
  if (feature === 'gartenhaus') return assets.materialGartenhausSurprise;
  if (feature === 'brunnen') return assets.materialBrunnenSurprise;
  if (feature === 'gartenweg') return assets.materialGartenwegSurprise;
  return assets.materialTerrasseSurprise;
}

export function FeatureMaterialPage() {
  const navigate = useNavigate();
  const feature = getCurrentFeature();
  const config = featureConfigs[feature];
  const currentIndex = getCurrentFeatureIndex();
  const details = getFeatureDetails();
  const isTerrasse = feature === 'terrasse';
  const isRollrasen = feature === 'rollrasen';
  const isGartenhaus = feature === 'gartenhaus';
  const isBrunnen = feature === 'brunnen';
  const isGartenweg = feature === 'gartenweg';
  const hasMaterialThumbs =
    isTerrasse || isRollrasen || isGartenhaus || isBrunnen || isGartenweg;
  const materialCheckSrc = assets.featureSelectionCheck;

  const initialMaterial = useMemo(() => {
    const raw = details[feature].material;
    const normalized = isTerrasse ? normalizeTerrasseMaterial(raw) : raw;
    return config.materials.includes(normalized) ? normalized : config.materials[0];
  }, [config.materials, details, feature, isTerrasse]);

  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);
  const [sizeValue, setSizeValue] = useState(details[feature].size);

  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle="Wählen Sie ein Material aus!"
        title={config.title}
      />

      <section className="flow-content compact-content">
        <FlowProgress />

        <article className={`hint-card ${isTerrasse ? 'material-page-hint' : ''}`.trim()}>
          <h4>Hinweis</h4>
          <p>
            {isTerrasse
              ? 'Die Auswahl der Materialien dient zur Orientierung. Details zu Eignung, Nutzung und Umsetzung werden beim Vor-Ort-Termin gemeinsam mit dem Fachbetrieb abgestimmt.'
              : 'Die Auswahl der Materialien dient zur Orientierung, damit der Fachbetrieb Größe, Nutzung und Umsetzung realistisch einschätzen kann.'}
          </p>
        </article>

        <section className={`option-section ${isTerrasse ? 'option-section--terrasse' : ''}`.trim()}>
          <h2>{config.sizeLabel}</h2>
          {isTerrasse ? (
            <p className="option-section-lead">
              Wählen Sie die Größe Ihrer Wunschterrasse aus! (in qm)
            </p>
          ) : null}
          <div className="dimension-row">
            <input
              aria-label={config.sizeLabel}
              className="dimension-input"
              inputMode="numeric"
              onChange={(event) => setSizeValue(event.target.value.replace(/[^\d]/g, ''))}
              type="text"
              value={sizeValue}
            />
            <span className="dimension-pill">{config.measureLabel}</span>
          </div>
        </section>

        <section className={`option-section ${isTerrasse ? 'option-section--terrasse' : ''}`.trim()}>
          <h2>Materialauswahl</h2>
          {isTerrasse ? (
            <p className="option-section-lead">
              Wähle Materialien und Optionen für deine Terrasse.
            </p>
          ) : null}
          <div className="material-grid">
            {config.materials.map((material) => {
              const thumbUrl = getMaterialThumbUrl(feature, material);
              const isSelected = selectedMaterial === material;
              return (
                <button
                  className={`material-card ${isSelected ? 'selected' : ''}`.trim()}
                  key={material}
                  onClick={() => setSelectedMaterial(material)}
                  type="button"
                >
                  {hasMaterialThumbs && isSelected ? (
                    <span aria-hidden="true" className="material-card-check">
                      <img
                        alt=""
                        className="feature-check-img"
                        src={materialCheckSrc}
                      />
                    </span>
                  ) : null}
                  <div className="material-thumb">
                    {thumbUrl ? (
                      <img
                        alt=""
                        className="material-thumb-img"
                        decoding="async"
                        loading="lazy"
                        src={thumbUrl}
                      />
                    ) : null}
                  </div>
                  <strong>{material}</strong>
                </button>
              );
            })}
            <button
              className={`material-card muted ${selectedMaterial === 'Egal, überrasche mich' ? 'selected' : ''}`.trim()}
              onClick={() => setSelectedMaterial('Egal, überrasche mich')}
              type="button"
            >
              {hasMaterialThumbs && selectedMaterial === 'Egal, überrasche mich' ? (
                <span aria-hidden="true" className="material-card-check">
                  <img
                    alt=""
                    className="feature-check-img"
                    src={materialCheckSrc}
                  />
                </span>
              ) : null}
              <div className="material-thumb">
                {hasMaterialThumbs ? (
                  <img
                    alt=""
                    className="material-thumb-img material-thumb-img--surprise"
                    decoding="async"
                    loading="lazy"
                    src={getMaterialSurpriseAsset(feature)}
                  />
                ) : (
                  <div className="material-thumb mystery-thumb">?</div>
                )}
              </div>
              <strong>Egal, überrasche mich</strong>
            </button>
          </div>
        </section>
      </section>

      <footer className="flow-footer">
        <button
          className="secondary-pill"
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentFeatureIndex(currentIndex - 1);
              navigate('/gestaltung-extras');
              return;
            }
            navigate('/feature-auswahl');
          }}
          type="button"
        >
          Zurück
        </button>
        <button
          className="primary-pill"
          onClick={() => {
            updateFeatureDetail(feature, {
              material: selectedMaterial,
              size: sizeValue || config.sizeValue,
            });
            navigate('/gestaltung-extras');
          }}
          type="button"
        >
          Weiter
        </button>
      </footer>
    </DeviceShell>
  );
}
