import { DeviceShell } from '../components/DeviceShell';

const inquiries = [
  {
    title: 'Privatgarten',
    projectNo: '001',
    status: 'Anfrage offen',
    price: '4.800 - 6.200 €',
    pills: ['Terrasse', 'Rollrasen', 'Zaun', 'Gartenweg', 'Gartenhaus', 'Brunnen'],
  },
  {
    title: 'Gewerbegarten',
    projectNo: '002',
    status: 'Angenommen',
    price: '8.200 - 11.000 €',
    pills: ['Rollrasen', 'Zaun', 'Gartenweg'],
  },
  {
    title: 'Dachterrasse',
    projectNo: '003',
    status: 'Anfrage offen',
    price: '3.500 - 5.000 €',
    pills: ['Terrasse', 'Brunnen'],
  },
] as const;

export function HandwerkerInquiriesPage() {
  return (
    <DeviceShell className="handwerker-screen" width={420}>
      <section className="flow-content compact-content">
        <article className="filter-bar">
          <span>Status</span>
          <span>Projekttyp</span>
          <span>Preis</span>
          <span>Neueste zuerst</span>
        </article>

        <div className="hw-card-list">
          {inquiries.map((inquiry, index) => (
            <article className="hw-project-card inquiry-card" key={inquiry.projectNo}>
              <header>
                <div>
                  <h2>{inquiry.title}</h2>
                  <p>Projektnummer: {inquiry.projectNo}</p>
                </div>
                <span className={`hw-status ${index === 1 ? 'accepted' : 'open'}`.trim()}>
                  {inquiry.status}
                </span>
              </header>
              <div className="hw-image-placeholder">KI-Visualisierung</div>
              <p className="small-label">Projekttyp:</p>
              <div className="profile-tags">
                {inquiry.pills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>
              <div className="hw-price">
                <span>Geschätzter Preis</span>
                <strong>{inquiry.price}</strong>
              </div>
              <div className="hw-actions">
                <button className="primary-pill small-pill">Annehmen</button>
                <button className="danger-pill small-pill">Ablehnen</button>
                <button className="outline-pill small-pill">Projekt ansehen</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DeviceShell>
  );
}
