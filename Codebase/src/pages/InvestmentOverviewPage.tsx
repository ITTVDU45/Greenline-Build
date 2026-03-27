import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';
import { type FeatureKey, getSelectedFeatures } from '../data/customerFlow';

/** Zeilen & Beträge wie Figma Frame 53 (node 377:1682) */
const investmentDisplayByFeature: Record<
  FeatureKey,
  { lineLabel: string; unitLabel: string | null; amountEuro: number }
> = {
  terrasse: { lineLabel: 'Terrasse – 45 m²', unitLabel: '180 € / m²', amountEuro: 8100 },
  rollrasen: { lineLabel: 'Rollrasen – 120 m²', unitLabel: '25 € / m²', amountEuro: 3000 },
  gartenhaus: { lineLabel: 'Gartenhaus – 12 m²', unitLabel: null, amountEuro: 2500 },
  brunnen: { lineLabel: 'Brunnen – 1,50 × 2,00 m', unitLabel: null, amountEuro: 2000 },
  gartenweg: { lineLabel: 'Gartenweg – 20 m²', unitLabel: '100 € / m²', amountEuro: 2000 },
};

function formatEuro(amount: number): string {
  return `${amount.toLocaleString('de-DE')} €`;
}

export function InvestmentOverviewPage() {
  const selectedFeatures = getSelectedFeatures();
  const rows = selectedFeatures.map((key) => ({
    key,
    ...investmentDisplayByFeature[key],
  }));
  const total = rows.reduce((sum, row) => sum + row.amountEuro, 0);

  return (
    <DeviceShell className="flow-screen" width={390}>
      <AppHeader
        subtitle="Erste transparente Kosteneinschätzung auf Basis deiner Angaben."
        title="Investitionsübersicht"
      />

      <section className="flow-content compact-content">
        <FlowProgress />
        <div className="investment-preview-card investment-preview-card--hero">
          <img
            alt="Visualisierung basierend auf deinen Angaben"
            decoding="async"
            loading="lazy"
            src={assets.investmentOverviewHero}
          />
          <div className="investment-preview-overlay">
            <p>Visualisierung basierend auf deinen Angaben.</p>
          </div>
        </div>

        <article className="investment-overview-card">
          <h3>Ausgewählte Elemente</h3>
          <div className="investment-list investment-list--detailed">
            {rows.map((row) => (
              <div className="investment-line investment-line--detailed" key={row.key}>
                <div className="investment-line-main">
                  <span aria-hidden className="investment-check">
                    ✓
                  </span>
                  <span>{row.lineLabel}</span>
                </div>
                <span className="investment-unit">
                  {row.unitLabel ?? '\u00a0'}
                </span>
                <span className="investment-eq">=</span>
                <strong className="investment-line-total">{formatEuro(row.amountEuro)}</strong>
              </div>
            ))}
          </div>

          <div className="investment-total-line">
            <span>Basispreis</span>
            <strong>{formatEuro(total)}</strong>
          </div>
        </article>

        <article className="hint-card investment-hint-card">
          <h4>ℹ️ Hinweis</h4>
          <p>
            Der angezeigte Gesamtpreis enthält alle von dir gewählten Elemente und Extras
            entsprechend den Konditionen des ausgewählten Handwerksbetriebs.
          </p>
          <p>
            Sollten zusätzliche Vorarbeiten notwendig sein, werden diese vor Beginn der
            Umsetzung klar im Vor Ort Termin vorher kommuniziert und abgestimmt.
          </p>
        </article>
      </section>

      <footer className="upsell-footer">
        <Link className="primary-pill wide button-link" to="/projektfreischaltung">
          zur Projektfreischaltung
        </Link>
        <Link className="outline-pill wide button-link" to="/dashboard-aktualisiert">
          Später entscheiden
        </Link>
      </footer>
    </DeviceShell>
  );
}
