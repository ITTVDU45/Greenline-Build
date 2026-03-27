import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

const perks = [
  'Individuelle KI-Garten-Visualisierung',
  'Basierend auf deinen echten Skizzen & Fotos',
  'Ergebnis sofort verfügbar',
  'Immer 2 Varianten',
  'Kann jederzeit erneut genutzt werden',
] as const;

export function KiupsellPage() {
  return (
    <DeviceShell className="upsell-screen" width={390}>
      <section className="capture-body">
        <h1>Deine KI Visualisierung erstellen</h1>
        <p>
          Auf Basis deiner Angaben erstellen wir jetzt eine realistische
          Garten-Visualisierung.
        </p>

        <article className="upsell-card">
          <img alt="" aria-hidden="true" className="brain-icon" src={assets.brainIcon} />
          <img alt="" aria-hidden="true" className="chatbot-bg" src={assets.chatbotCard} />
          <div className="upsell-content">
            <h2>KI-Visualisierung - 29 €</h2>
            <ul>
              {perks.map((perk) => (
                <li key={perk}>✔ {perk}</li>
              ))}
            </ul>
            <p className="learn-more">ℹ Mehr erfahren</p>
          </div>
        </article>

        <div className="price-block">
          <strong>Einmalig 29€</strong>
          <p>Keine Abos - keine Folgekosten</p>
          <p>Sichere Zahlungsmöglichkeiten</p>
        </div>

        <img alt="" aria-hidden="true" className="checkout-strip" src={assets.checkoutStrip} />
      </section>

      <footer className="upsell-footer">
        <button className="gradient-pill">jetzt Visualisierung erstellen</button>
        <button className="secondary-pill wide-secondary">Zurück</button>
      </footer>
    </DeviceShell>
  );
}
