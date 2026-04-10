import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

export function CapturePage() {
  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle="Verschiedene Perspektiven helfen, deine KI-Visualisierung realistischer zu machen."
        title="Fotos hinzufügen"
      />

      <section className="flow-content compact-content">
        <FlowProgress fillVariant="dark" />

        <article className="photo-upload-card">
          <h3>Fotos deines Gartens</h3>
          <ul>
            <li>Gesamtansicht</li>
            <li>Seitenansichten</li>
            <li>Wichtige Details (z. B. Bäume, Terrassen)</li>
          </ul>

          <div className="photo-drop-zone">
            <button className="add-photo-button" type="button">
              <img
                alt=""
                className="add-photo-button-img"
                decoding="async"
                src={assets.captureCloudUpload}
              />
            </button>
            <span>Foto hinzufügen</span>
          </div>
        </article>

        <article className="scan-card scan-card-recommended">
          <div className="scan-card-badge">Empfohlen</div>
          <div aria-hidden="true" className="scan-card-check">
            <img alt="" className="scan-card-check-img" src={assets.captureArCheckmark} />
          </div>
          <div className="scan-card-layout">
            <div className="scan-card-visual">
              <img
                alt=""
                className="scan-card-visual-img"
                decoding="async"
                loading="lazy"
                src={assets.captureArIllustration}
              />
            </div>
            <div className="scan-card-copy">
              <h3>AR-Scan starten</h3>
              <p className="scan-card-lead">Dauert ca. 1–2 Min.</p>
              <p className="scan-card-body">
                Vermesse deinen Garten per Smartphone. Wir erkennen Fläche, Maße und Proportionen.
              </p>
            </div>
          </div>
        </article>
      </section>

      <footer className="flow-footer">
        <Link className="secondary-pill button-link" to="/projekt-auswahl">
          Zurück
        </Link>
        <Link className="primary-pill button-link" to="/analyse">
          Weiter
        </Link>
      </footer>
    </DeviceShell>
  );
}
