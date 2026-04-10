import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { loadProjectType, saveProjectType, type ProjectTypeTitle } from '../data/projectTypeSelection';
import { assets, projectTypeThumbs } from '../data/screens';

const projectTypes = [
  ['Privatgarten', 'Für private Wohnhäuser mit Terrasse, Pflanzung und Rasenflächen'],
  ['Gewerbegarten', 'Außenbereich für Firmenflächen oder Praxisräume'],
  ['Hotelgarten', 'Hochwertige Außenanlage für Hotel- und Gastrobetrieb'],
  ['Schrebergarten / Kleingarten', 'Kompakte Außenfläche mit Wegen und Bepflanzung'],
  ['Terrasse / Dachterrasse', 'Separater Fokus auf Terrassenflächen'],
  ['Balkon', 'Kompakte Kübelbereiche in urbaner Umgebung'],
] as const;

export function ProjectTypeSelectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<ProjectTypeTitle>(() => loadProjectType());
  const label = useMemo(() => `Ausgewählt: ${selected}`, [selected]);

  useEffect(() => {
    setSelected(loadProjectType());
  }, [location.key]);

  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle="Wähle den grundlegenden Elementbereich aus"
        title="Was möchtest du umsetzen?"
      />

      <section className="flow-content compact-content">
        <FlowProgress />

        <article className="hint-card">
          <h4>Hinweis</h4>
          <p>
            Die Auswahl der Projektart hilft uns, die richtigen Fragen und passenden
            Optionen für deinen Ablauf zu zeigen.
          </p>
        </article>

        <div className="project-type-list">
          {projectTypes.map(([title, subtitle]) => (
            <button
              className={`project-type-card ${selected === title ? 'selected' : ''}`.trim()}
              key={title}
              onClick={() => {
                setSelected(title);
                saveProjectType(title);
              }}
              type="button"
            >
              <div className="project-type-thumb">
                <img
                  alt=""
                  aria-hidden="true"
                  className="project-type-thumb-img"
                  decoding="async"
                  loading="lazy"
                  src={projectTypeThumbs[title]}
                />
              </div>
              <div>
                <strong>{title}</strong>
                <p>{subtitle}</p>
              </div>
              <span className="project-type-check">{selected === title ? '✓' : ''}</span>
            </button>
          ))}
        </div>

        <p className="selection-copy">{label}</p>
      </section>

      <footer className="flow-footer">
        <button className="secondary-pill" onClick={() => navigate('/login')} type="button">
          Zurück
        </button>
        <button
          className="primary-pill"
          onClick={() => {
            saveProjectType(selected);
            navigate('/flaeche-erfassen');
          }}
          type="button"
        >
          Weiter
        </button>
      </footer>
    </DeviceShell>
  );
}
