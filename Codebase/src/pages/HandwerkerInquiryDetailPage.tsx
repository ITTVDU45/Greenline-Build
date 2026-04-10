import { Link, useLocation } from 'react-router-dom';
import { TopBrandBarStrip } from '../components/AppHeader';
import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

const detailSections = [
  {
    title: 'Was soll umgesetzt werden?',
    lines: ['✔ Privatgarten'],
  },
  {
    title: 'Daten zu der Gartenfläche:',
    lines: ['✔ Gesamtfläche: 85 m²'],
  },
  {
    title: 'Ausgewählte Elemente:',
    lines: ['✔ Terrasse', '✔ Rollrasen', '✔ Brunnen', '✔ Gartenhaus'],
  },
  {
    title: 'Ausgewählte Materialien:',
    lines: [
      '✔ Terrasse: Holz',
      '✔ Rollrasen: Naturrasen',
      '✔ Gartenhaus: Holz',
      '✔ Brunnen: Beton',
    ],
  },
  {
    title: 'Ausgewählte Extras:',
    lines: [
      '✔ Terrasse: Beleuchtung',
      '✔ Terrasse: Überdachung',
      '✔ Rollrasen: Pflegekonzept',
      '✔ Rollrasen: Saisonale Bepflanzung',
      '✔ Gartenhaus: Stromanschluss',
      '✔ Gartenhaus: Überdachung / Vordach',
      '✔ Brunnen: Beleuchtung',
      '✔ Brunnen: Stromanschluss',
    ],
  },
] as const;

const projectDescription =
  'Ziel ist die Gestaltung eines authentischen, realistischen und zugleich modernen Gartens. Es werden hochwertige, natürliche Materialien eingesetzt, die zeitlos wirken und funktional aufeinander abgestimmt sind. Die Umsetzung erfolgt mit Fokus auf Qualität, Langlebigkeit und ein stimmiges Gesamtbild.';

type HandwerkerDetailLocationState = { from?: string };

export function HandwerkerInquiryDetailPage() {
  const location = useLocation();
  const backTarget =
    (location.state as HandwerkerDetailLocationState | null)?.from ?? '/handwerker-anfragen';

  return (
    <DeviceShell className="handwerker-screen hw-inquiry-screen" width={390}>
      <TopBrandBarStrip className="hw-inquiry-topbar" />

      <div className="hw-inquiry-hero-band">
        <BackTextButton className="hw-inquiry-back" fallbackTo={backTarget} />
        <h1 className="hw-inquiry-hero-title">Projekt #001 – Privatgarten</h1>
        <p className="hw-inquiry-hero-sub">Basierend auf deinen Angaben &amp; KI-Analyse</p>
        <div className="hw-inquiry-badges">
          <span className="hw-inquiry-badge hw-inquiry-badge--amber">Anfrage offen</span>
          <span className="hw-inquiry-badge hw-inquiry-badge--navy">Standort: München, 80331</span>
        </div>
      </div>

      <section className="flow-content hw-inquiry-scroll">
        <h2 className="hw-inquiry-section-title">Aktuelle Zustand</h2>
        <div className="hw-inquiry-photo-frame">
          <img alt="Aktueller Gartenzustand" className="hw-inquiry-photo" src={assets.hwInquiryCurrentGarden} />
        </div>

        <h2 className="hw-inquiry-section-title">GreenLine Build Vorschläge</h2>
        <div className="hw-inquiry-variant-row">
          <div className="hw-inquiry-variant">
            <span className="hw-inquiry-variant-label">Variante 1</span>
            <img alt="KI-Visualisierung Variante 1" className="hw-inquiry-variant-img" src={assets.hwInquiryVariantA} />
          </div>
          <div className="hw-inquiry-variant">
            <span className="hw-inquiry-variant-label">Variante 2</span>
            <img alt="KI-Visualisierung Variante 2" className="hw-inquiry-variant-img" src={assets.hwInquiryVariantB} />
          </div>
        </div>

        <h2 className="hw-inquiry-section-title">Detaillierte Auswahl der Anfrage</h2>
        <article className="hw-inquiry-detail-card">
          {detailSections.map((block) => (
            <div className="hw-inquiry-detail-block" key={block.title}>
              <h3>{block.title}</h3>
              {block.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ))}
        </article>

        <h2 className="hw-inquiry-section-title">Projektbeschreibung</h2>
        <article className="hw-inquiry-desc-card">
          <p>{projectDescription}</p>
        </article>

        <div className="hw-inquiry-price-band">
          <span className="hw-inquiry-price-label">Basispreis:</span>
          <strong className="hw-inquiry-price-value">4.800 € – 6.200 €</strong>
        </div>

        <article className="hw-inquiry-quick-card">
          <p className="hw-inquiry-quick-label">Schnellaktionen:</p>
          <div className="hw-inquiry-quick-actions">
            <Link
              className="hw-inquiry-quick-btn hw-inquiry-quick-btn--green"
              state={{ from: '/handwerker-anfrage-detail' }}
              to="/kontaktdaten-freischaltung"
            >
              Annehmen
            </Link>
            <Link className="hw-inquiry-quick-btn hw-inquiry-quick-btn--navy" to="/handwerker-anfragen">
              Ablehnen
            </Link>
          </div>
        </article>

        <Link className="hw-inquiry-back-pill button-link" to="/handwerker-anfragen">
          Zurück
        </Link>
      </section>
    </DeviceShell>
  );
}
