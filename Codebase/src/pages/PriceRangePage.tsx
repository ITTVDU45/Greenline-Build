import { Link } from 'react-router-dom';
import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

const ranges = [
  ['Terrasse', '4.800 - 5.600 €'],
  ['Rollrasen', '2.100 - 2.700 €'],
  ['Zaun & Schutz', '1.400 - 2.000 €'],
  ['Pflanzung / Extras', '700 - 1.300 €'],
] as const;

export function PriceRangePage() {
  return (
    <DeviceShell className="flow-screen" width={390}>
      <section className="hero-header">
        <BackTextButton />
        <h1>Preisspanne</h1>
        <p>Ein erster Preisrahmen vor finaler Prüfung und exakter Terminabstimmung.</p>
      </section>

      <section className="flow-content">
        <article className="summary-card">
          <small>Projektbasis</small>
          <strong>Gartenfläche ca. 85 m²</strong>
          <p>Auswahl: Terrasse, Rollrasen, Zaun und ergänzende Bepflanzung.</p>
        </article>

        <article className="info-card">
          <h3>Preisrahmen</h3>
          {ranges.map(([label, value]) => (
            <div className="row-line" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </article>

        <article className="hint-card">
          <h4>Orientierung</h4>
          <p>Gesamtrahmen aktuell: ca. 9.000 - 11.600 €. Die finale Kalkulation folgt nach Fachprüfung.</p>
        </article>
      </section>

      <footer className="upsell-footer">
        <Link className="outline-pill wide button-link" to="/pflanzen-auswahl">
          Zurück
        </Link>
        <Link className="primary-pill wide button-link" to="/paket-auswahl">
          Weiter zur Paketauswahl
        </Link>
      </footer>
    </DeviceShell>
  );
}
