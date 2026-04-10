import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { featureOrder, getSelectedFeatures } from '../data/customerFlow';
import { getHandwerkerById, loadSelectedHandwerkerId } from '../data/handwerkerOptions';
import { formatInvestmentEuro, sumInvestmentForFeatures } from '../data/investmentLineItems';
import { assets } from '../data/screens';

const releaseSteps = [
  'Deine Auswahl und der aktuelle Preisrahmen werden verbindlich gespeichert.',
  'Passende Fachbetriebe erhalten die Anfrage und können dein Projekt prüfen.',
  'Nach Annahme folgt die direkte Abstimmung des Vor-Ort-Termins.',
] as const;

function featureTitlesLine(selectedKeys: ReturnType<typeof getSelectedFeatures>): string {
  const titles = selectedKeys.map(
    (key) => featureOrder.find((entry) => entry.key === key)?.title ?? key,
  );
  if (titles.length === 0) return 'Vor-Ort-Termin und Investitionsrahmen sind hinterlegt.';
  return `${titles.join(', ')}, Vor-Ort-Termin und Investitionsrahmen sind hinterlegt.`;
}

export function ProjectReleasePage() {
  const selectedFeatures = getSelectedFeatures();
  const totalEuro = sumInvestmentForFeatures(selectedFeatures);
  const handwerker = getHandwerkerById(loadSelectedHandwerkerId());
  const statusDetail = featureTitlesLine(selectedFeatures);

  return (
    <DeviceShell className="flow-screen project-release-screen" width={390}>
      <div aria-hidden className="project-release-bg">
        <img alt="" className="project-release-bg-img" src={assets.projectReleaseBackdrop} />
        <div className="project-release-bg-scrim" />
      </div>

      <div className="project-release-stack">
        <AppHeader
          subtitle="Jetzt sichtbar an geprüfte Fachbetriebe weiterleiten."
          title="Projektfreischaltung"
        />

        <section className="flow-content compact-content project-release-body">
          <FlowProgress />

          <div className="project-release-summary">
            <div className="project-release-summary-visual">
              <img
                alt=""
                className="project-release-summary-thumb"
                decoding="async"
                loading="lazy"
                src={assets.projectReleaseSummaryThumb}
              />
            </div>
            <div className="project-release-summary-meta">
              <p className="project-release-price-label">Basispreis</p>
              <p className="project-release-price-value">{formatInvestmentEuro(totalEuro)}</p>
              <div className="project-release-hw">
                <img alt="" className="project-release-hw-avatar" src={handwerker.image} />
                <div className="project-release-hw-copy">
                  <span className="project-release-hw-label">Handwerksbetrieb</span>
                  <strong className="project-release-hw-name">{handwerker.name}</strong>
                  <span className="project-release-hw-sub">{handwerker.betriebLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <article className="project-release-panel">
            <h3 className="project-release-panel-title">Was jetzt passiert</h3>
            <ul className="project-release-steps">
              {releaseSteps.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          </article>

          <article className="project-release-panel project-release-panel--status">
            <small className="project-release-status-kicker">Status</small>
            <strong className="project-release-status-headline">Projekt bereit zur Freigabe</strong>
            <p className="project-release-status-copy">{statusDetail}</p>
          </article>

          <article className="project-release-panel project-release-panel--hint">
            <h4 className="project-release-hint-title">Hinweis</h4>
            <p className="project-release-hint-copy">
              Die Freigabe startet keine zusätzlichen Funktionen, sondern übergibt nur den bestehenden
              Projektstand.
            </p>
          </article>
        </section>

        <footer className="upsell-footer project-release-footer">
          <Link className="outline-pill wide button-link" to="/investitionsuebersicht">
            Später
          </Link>
          <Link className="primary-pill wide button-link" to="/dashboard-aktualisiert">
            Projekt freigeben
          </Link>
        </footer>
      </div>
    </DeviceShell>
  );
}
