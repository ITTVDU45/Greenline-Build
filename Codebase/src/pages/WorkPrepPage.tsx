import { AppHeader } from '../components/AppHeader';
import { DeviceShell } from '../components/DeviceShell';

const standardCards = [
  {
    title: 'Terrasse',
    total: '540 €',
    items: [
      ['Untergrund begradigen', '180 €'],
      ['Schottertragschicht', '240 €'],
      ['Entsorgung Aushub', '120 €'],
    ],
  },
  {
    title: 'Rollrasen',
    total: '325 €',
    items: [
      ['Alte Grasnarbe abtragen', '150 €'],
      ['Boden auflockern & planieren', '130 €'],
      ['Starterdünger', '45 €'],
    ],
  },
] as const;

const addons = [
  'Mehr-Aushub wegen Bodenbeschaffenheit',
  'Zusätzliche Entsorgung',
  'Anpassungen am Gefälle',
];

export function WorkPrepPage() {
  return (
    <DeviceShell className="flow-screen work-screen">
      <AppHeader
        subtitle="Interne Einschätzung nach Besichtigung"
        title="Projekt: Garten Müller – Vorarbeiten & Zusatzleistungen"
      />

      <section className="flow-content">
        <div className="chip">Interne Handwerkeransicht</div>

        <div className="section-copy">
          <h3>Empfohlene Vorarbeiten (Standard)</h3>
          <p>Diese Arbeiten sind für die Umsetzung notwendig.</p>
        </div>

        {standardCards.map((card) => (
          <article className="work-card" key={card.title}>
            <header>
              <h4>{card.title}</h4>
              <div>
                <span>{card.total}</span>
                <span>⌄</span>
              </div>
            </header>
            <div className="work-items">
              {card.items.map(([label, price]) => (
                <label className="work-item" key={label}>
                  <input type="checkbox" />
                  <span>{label}</span>
                  <span>{price}</span>
                </label>
              ))}
            </div>
          </article>
        ))}

        <div className="section-copy">
          <h3>Mögliche Zusatzarbeiten (optional)</h3>
          <p>Nur bei Bedarf oder nach Rücksprache mit dem Kunden.</p>
        </div>

        <div className="addon-list">
          {addons.map((label) => (
            <label className="addon-row" key={label}>
              <input type="checkbox" />
              <span>{label}</span>
              <span className="addon-price">Preis ___ €</span>
            </label>
          ))}
        </div>

        <button className="secondary-link add-link">+ Position hinzufügen</button>

        <label className="notes-card">
          <span>Notiz (intern); z.B. &quot;Boden stellenweise sehr lehmig.&quot;</span>
          <textarea readOnly value="" />
        </label>
      </section>

      <footer className="sticky-summary">
        <div className="summary-rows">
          <div>
            <span>Zwischensumme Standard</span>
            <strong>865 €</strong>
          </div>
          <div>
            <span>Zwischensumme Zusatz</span>
            <strong>0 €</strong>
          </div>
          <div className="emphasis">
            <span>Neue Gesamtsumme</span>
            <strong>865 €</strong>
          </div>
        </div>
        <button className="primary-pill wide">Für Kundenangebot freigeben</button>
        <button className="outline-pill wide">Als Entwurf speichern</button>
      </footer>
    </DeviceShell>
  );
}
