import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import {
  type HandwerkerId,
  handwerkerOptions,
  loadQualityIndex,
  loadSelectedHandwerkerId,
  saveQualityIndex,
  saveSelectedHandwerkerId,
} from '../data/handwerkerOptions';

const levels = [
  ['Standard', 'Solide Fachbetriebe', '49 - 59 € / h'],
  ['Komfort', 'Erfahrene Spezialisten', '59 - 79 € / h'],
  ['Vollprofi', 'Top-Outcomes', '79 - 109 € / h'],
] as const;

export function QualitySelectionPage() {
  const [qualityIndex, setQualityIndex] = useState(() => loadQualityIndex());
  const [selectedHandwerkerId, setSelectedHandwerkerId] = useState<HandwerkerId>(() =>
    loadSelectedHandwerkerId(),
  );

  function selectHandwerker(id: HandwerkerId) {
    setSelectedHandwerkerId(id);
    saveSelectedHandwerkerId(id);
  }

  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle="Qualität, Betrieb & Eignung für Kundenwunsch"
        title="Qualitätsstufe wählen"
      />

      <section className="flow-content compact-content">
        <FlowProgress />

        <article className="hint-card">
          <h4>Hinweis</h4>
          <p>
            Die gewählte Qualitätsstufe beeinflusst die Betriebe, die berücksichtigt werden und
            die finale Investition.
          </p>
        </article>

        <div className="quality-list">
          {levels.map(([title, sub, price], index) => (
            <button
              className={`quality-card ${qualityIndex === index ? 'selected' : ''}`.trim()}
              key={title}
              onClick={() => {
                setQualityIndex(index);
                saveQualityIndex(index);
              }}
              type="button"
            >
              <strong>{title}</strong>
              <p>{sub}</p>
              <span>{price}</span>
            </button>
          ))}
        </div>

        <h3 className="section-heading">Passende Handwerker</h3>
        <p className="subtle-copy subtle-copy-tight">
          Wähle einen Fachbetrieb für deinen Vor-Ort-Termin.
        </p>
        <div className="provider-row">
          {handwerkerOptions.map((provider) => {
            const isSelected = provider.id === selectedHandwerkerId;
            return (
              <button
                aria-pressed={isSelected}
                className={`provider-card ${isSelected ? 'selected' : ''}`.trim()}
                key={provider.id}
                onClick={() => selectHandwerker(provider.id)}
                type="button"
              >
                {isSelected ? (
                  <span aria-hidden className="provider-card-check">
                    <svg fill="none" height="14" viewBox="0 0 24 24" width="14">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </span>
                ) : null}
                <div className="provider-top">
                  <img alt="" className="provider-avatar" src={provider.image} />
                  <div className="provider-copy">
                    <div className="provider-title-row">
                      <strong>{provider.name}</strong>
                    </div>
                    <div className="provider-meta-row">
                      <small>{provider.badge}</small>
                      <small>★ {provider.rating}</small>
                    </div>
                  </div>
                </div>

                <p className="provider-experience">⚒ {provider.experience}</p>
                <p className="provider-specialization">{provider.specialization}</p>

                <div className="provider-skills">
                  {provider.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <footer className="upsell-footer">
        <Link className="primary-pill wide button-link" to="/termin-datum">
          weiter zu den Terminen
        </Link>
        <Link className="outline-pill wide button-link" to="/visualisierung-vorschau">
          Zurück
        </Link>
      </footer>
    </DeviceShell>
  );
}
