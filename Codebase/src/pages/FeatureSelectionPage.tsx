import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { featureOrder, setSelectedFeature, setSelectedFeatures, type FeatureKey } from '../data/customerFlow';
import { assets, featureListThumbs } from '../data/screens';

export function FeatureSelectionPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<FeatureKey[]>(['terrasse']);
  const selectedLabel = useMemo(
    () =>
      selected
        .map((item) => featureOrder.find((feature) => feature.key === item)?.title)
        .filter(Boolean)
        .join(', '),
    [selected],
  );

  function toggleFeature(key: FeatureKey) {
    setSelected((current) => {
      if (current.includes(key)) {
        const next = current.filter((item) => item !== key);
        return next.length ? next : [key];
      }
      return [...current, key];
    });
  }

  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle={'Wähle alle gewünschten Elemente aus\n(Mehrfachauswahl möglich)'}
        title="Was möchtest du umsetzen?"
      />

      <section className="flow-content compact-content">
        <FlowProgress fillVariant="dark" />

        <div className="feature-preview-wrap">
          <div className="feature-preview-badge">✓ Ausgangszustand</div>
          <div className="feature-preview-card">
            <img
              alt=""
              className="feature-preview-img"
              decoding="async"
              loading="lazy"
              src={assets.featureHeroAusgang}
            />
          </div>
        </div>

        <article className="hint-card">
          <h4>Hinweis</h4>
          <p>
            Die dargestellten Vorarbeiten dienen zur Orientierung. Ob und in welchem Umfang sie
            erforderlich sind, wird beim Vor-Ort-Termin fachlich geprüft und festgelegt.
          </p>
        </article>

        <div className="feature-list">
          {featureOrder.map((feature) => (
            <button
              className={`feature-list-card ${selected.includes(feature.key) ? 'selected' : ''}`.trim()}
              key={feature.key}
              onClick={() => toggleFeature(feature.key)}
              type="button"
            >
              <div className="feature-list-thumb">
                <img
                  alt=""
                  className="feature-list-thumb-img"
                  decoding="async"
                  loading="lazy"
                  src={featureListThumbs[feature.key]}
                />
              </div>
              <div>
                <h2>{feature.title}</h2>
                <p>{feature.subtitle}</p>
              </div>
              <span className="project-type-check">
                {selected.includes(feature.key) ? (
                  <img
                    alt=""
                    aria-hidden="true"
                    className="feature-check-img"
                    height={16}
                    src={assets.featureSelectionCheck}
                    width={16}
                  />
                ) : (
                  '+'
                )}
              </span>
            </button>
          ))}
        </div>

        <p className="selection-copy">✓ Ausgewählt: {selectedLabel}</p>
      </section>

      <footer className="flow-footer">
        <button className="secondary-pill" onClick={() => navigate('/analyse')} type="button">
          Zurück
        </button>
        <button
          className="primary-pill"
          onClick={() => {
            setSelectedFeatures(selected);
            setSelectedFeature(selected[0]);
            navigate('/gestaltung-material');
          }}
          type="button"
        >
          Weiter
        </button>
      </footer>
    </DeviceShell>
  );
}
