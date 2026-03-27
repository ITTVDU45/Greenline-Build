import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

export function VisualSuggestionsPage() {
  const [lightbox, setLightbox] = useState<null | 1 | 2>(null);

  useEffect(() => {
    if (!lightbox) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightbox(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightbox]);

  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle="Basierend auf deinen Angaben & KI-Analyse"
        title="So könnte Ihr Garten aussehen"
      />

      <section className="flow-content compact-content">
        <FlowProgress />
        <article className="visual-preview-card">
          <span className="visual-section-label">Vorher</span>
          <div className="visual-preview-image">
            <img
              alt="Vorher: aktueller Gartenzustand"
              decoding="async"
              loading="lazy"
              src={assets.visualVorher}
            />
          </div>
          <h3>KI-Vorschläge für dein Projekt</h3>
          <div className="visual-variant-row">
            <div className="visual-variant">
              <button
                aria-label="Variante 1 in großer Vorschau anzeigen"
                className="visual-variant-trigger"
                onClick={() => setLightbox(1)}
                type="button"
              >
                <div className="visual-preview-image visual-variant-thumb visual-variant-frame">
                  <span className="visual-variant-badge">Variante 1</span>
                  <img
                    alt="KI-Visualisierung Variante 1"
                    decoding="async"
                    loading="lazy"
                    src={assets.visualVariant1}
                  />
                </div>
              </button>
            </div>
            <div className="visual-variant">
              <button
                aria-label="Variante 2 in großer Vorschau anzeigen"
                className="visual-variant-trigger"
                onClick={() => setLightbox(2)}
                type="button"
              >
                <div className="visual-preview-image visual-variant-thumb visual-variant-frame">
                  <span className="visual-variant-badge">Variante 2</span>
                  <img
                    alt="KI-Visualisierung Variante 2"
                    decoding="async"
                    loading="lazy"
                    src={assets.visualVariant2}
                  />
                </div>
              </button>
            </div>
          </div>
          <Link className="visual-change-selection outline-pill wide button-link" to="/auswahl-zusammenfassung">
            ✏️ Auswahl ändern
          </Link>
        </article>

        <article className="visual-info-card visual-info-card--highlight">
          <h3>Was wurde berücksichtigt?</h3>
          <div className="visual-check-list">
            <p>✔ Ausgewählter Fachbetrieb und Qualitätslevel</p>
            <p>✔ Maße & Flächenangaben</p>
            <p>✔ Fotos & AR-Scan Daten</p>
            <p>✔ Ausgewählte Elemente</p>
            <p>✔ Ausgewählte Extras</p>
            <p>✔ Ausgewählte Materialien</p>
          </div>
        </article>

        <article className="visual-info-card visual-info-card--highlight">
          <h3>Was vor Ort ausgemacht wird</h3>
          <div className="visual-check-list">
            <p>✔ Umsetzbarkeit</p>
            <p>✔ Materialart</p>
            <p>✔ Positionierung</p>
            <p>✔ Fachliche Beurteilung</p>
          </div>
        </article>

        <article className="visual-chat-card">
          <p className="visual-chat-emoji" aria-hidden="true">
            🤖
          </p>
          <div className="visual-chat-copy">
            <h3>Nachbesserungen angeben</h3>
            <p>
              Passe dein Gartenbild mit unserem KI-Chatbot an. Beschreibe deine Wünsche und wir
              erstellen dir eine neue Variante.
            </p>
            <p className="visual-chat-examples-label">Beispiele:</p>
            <ul className="visual-chat-examples">
              <li>&quot;Mehr Grün bitte&quot;</li>
              <li>&quot;Modernere Optik&quot;</li>
              <li>&quot;Mehr Privatsphäre&quot;</li>
            </ul>
          </div>
          <Link className="primary-pill button-link visual-chat-button" to="/chat-kunde-handwerker">
            💬 Chat starten
          </Link>
          <p className="visual-chat-footnote">Individuelle Änderungen starten</p>
        </article>
      </section>

      <footer className="upsell-footer">
        <Link className="primary-pill wide button-link" to="/qualitaetsstufe">
          zur Qualitätsauswahl
        </Link>
        <Link className="outline-pill wide button-link" to="/paket-auswahl">
          Zurück
        </Link>
      </footer>

      {lightbox ? (
        <div
          aria-modal="true"
          className="visual-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
        >
          <div
            className="visual-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="visual-lightbox-frame">
              <p className="visual-lightbox-caption">
                {lightbox === 1 ? 'Variante 1' : 'Variante 2'}
              </p>
              <div className="visual-lightbox-img-wrap">
                <button
                  aria-label="Vorschau schließen"
                  className="visual-lightbox-close"
                  onClick={() => setLightbox(null)}
                  type="button"
                >
                  ×
                </button>
                <img
                  alt={lightbox === 1 ? 'KI-Visualisierung Variante 1' : 'KI-Visualisierung Variante 2'}
                  className="visual-lightbox-img"
                  decoding="async"
                  src={lightbox === 1 ? assets.visualVariant1 : assets.visualVariant2}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </DeviceShell>
  );
}
