import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

const quickActions = ['Checkliste aktualisieren', 'Foto senden', 'Problem melden'] as const;

const messages: Array<{
  side: 'craft' | 'customer';
  text: string;
  time: string;
  kind?: 'file';
}> = [
  {
    side: 'craft',
    text: 'Hi Max. Ich bin gleich vor Ort und starte mit der Checkliste.',
    time: '10:08',
  },
  {
    side: 'customer',
    text: 'Perfekt, danke! Zugangstor ist offen.',
    time: '10:09',
  },
  {
    side: 'craft',
    text: 'Super. Ich starte mit Untergrund begradigen und schicke dir gleich ein Foto.',
    time: '10:11',
  },
  {
    side: 'craft',
    text: 'Foto_Untergrund_vorher.jpg',
    time: '10:14',
    kind: 'file',
  },
  {
    side: 'customer',
    text: 'Sieht gut aus. Kannst du die Hecke bitte mit beachten?',
    time: '10:16',
  },
  {
    side: 'craft',
    text: 'Ja, ich arbeite entlang der Kante vorsichtig. Melde mich beim nächsten Update.',
    time: '10:18',
  },
];

export function ChatCraftCustomerPage() {
  return (
    <DeviceShell className="chat-screen chat-screen-extended" width={380}>
      <section className="hero-header">
        <BackTextButton />
        <h1>Chat mit Kunde</h1>
        <p>Projekt: Privatgarten #001</p>
      </section>

      <section className="flow-content compact-content">
        <article className="chat-context-card">
          <div className="customer-card">
            <div className="customer-avatar">M</div>
            <div>
              <strong>Kunde: Max Müller</strong>
              <p>Termin: Di, 4. März 2026 · 12:00-12:45</p>
              <span>Antwortzeit Kunde: ~ 10 Min</span>
            </div>
          </div>
          <span className="online-pill">Online</span>
        </article>

        <div className="quick-chip-row">
          {quickActions.map((action) => (
            <button className="outline-pill quick-chip" key={action}>
              {action}
            </button>
          ))}
        </div>

        <div className="chat-day-divider">
          <span />
          <p>Heute</p>
          <span />
        </div>

        <div className="chat-list">
          {messages.map((message, index) => (
            <article
              className={`chat-bubble ${message.side === 'customer' ? 'customer' : 'craft'} ${message.kind === 'file' ? 'file' : ''}`.trim()}
              key={`${message.time}-${index}`}
            >
              <p>{message.text}</p>
              <span>{message.time}</span>
            </article>
          ))}
          <div className="typing-pill">Kunde tippt …</div>
        </div>
      </section>

      <footer className="chat-input-bar">
        <button className="outline-pill attach-pill">＋</button>
        <input aria-label="Update an Kunde schreiben" placeholder="Update an Kunde schreiben" />
        <button className="primary-pill send-pill">Senden</button>
      </footer>
    </DeviceShell>
  );
}
