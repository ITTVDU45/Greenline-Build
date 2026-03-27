import { Link } from 'react-router-dom';
import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

const categories = [
  {
    title: 'Terrasse – Vorarbeiten',
    items: [
      ['Untergrund begradigen', 'Leichte Unebenheiten ausgleichen', '180 €'],
      ['Schottertragschicht', 'Stabilisierung für Terrassenaufbau', '240 €'],
      ['Entsorgung Aushub', 'Normale Erdmenge', '120 €'],
    ],
    subtotal: '540 €',
  },
  {
    title: 'Rollrasen – Vorarbeiten',
    items: [
      ['Alte Grasnarbe abtragen', 'Maschinell, normaler Zustand', '150 €'],
      ['Boden auflockern & planieren', 'Vorbereitung für Rollrasen', '130 €'],
      ['Starterdünger', '', '45 €'],
    ],
    subtotal: '325 €',
  },
  {
    title: 'Gartenhaus – Vorarbeiten',
    items: [
      ['Punktfundamente vorbereiten', '', '220 €'],
      ['Untergrund ausrichten', '', '90 €'],
    ],
    subtotal: '310 €',
  },
] as const;

export function EndPriceBookingPage() {
  return (
    <DeviceShell className="flow-screen" width={380}>
      <section className="hero-header">
        <BackTextButton />
        <h1>Preisübersicht</h1>
        <p>Projekt: Privatgarten #001</p>
      </section>

      <section className="flow-content compact-content">
        <article className="info-card">
          <small>Basispreis</small>
          <h3>Voraussichtliche Preisspanne</h3>
          <strong className="accent-price">ca. 8.500 €</strong>
        </article>

        <article className="summary-card">
          <p>Vorarbeiten & Zusatzleistungen nach Vor-Ort-Termin</p>
        </article>

        <div className="hw-card-list">
          {categories.map((category) => (
            <article className="info-card" key={category.title}>
              <h3>{category.title}</h3>
              {category.items.map(([label, sub, price]) => (
                <div className="price-detail-row" key={label}>
                  <div>
                    <strong>{label}</strong>
                    {sub ? <p>{sub}</p> : null}
                  </div>
                  <span>{price}</span>
                </div>
              ))}
              <div className="row-line subtotal-row">
                <span>Zwischensumme</span>
                <strong>{category.subtotal}</strong>
              </div>
            </article>
          ))}
        </div>

        <article className="summary-card">
          <div className="row-line">
            <span>Gesamtsumme Vorarbeiten</span>
            <strong>1.575 €</strong>
          </div>
        </article>

        <article className="hint-card">
          <h4>Gesamtpreis</h4>
          <strong className="accent-price">10.075 €</strong>
          <p>inkl. MwSt. – Basispreis + Vorarbeiten</p>
        </article>
      </section>

      <footer className="upsell-footer">
        <Link className="primary-pill wide button-link" to="/buchung-erfolg">
          Verbindlich buchen
        </Link>
        <Link className="outline-pill wide button-link" to="/chat-kunde-handwerker">
          Mit Greenline Build abstimmen
        </Link>
      </footer>
    </DeviceShell>
  );
}
