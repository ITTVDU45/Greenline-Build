import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

const messages: Array<{
  side: 'craft' | 'customer';
  text: string;
  time: string;
  kind?: 'file';
}> = [
  {
    side: 'craft',
    text: 'Hallo! Hier ist Greenline Build. Wir haben deinen hochgeladenen Garten und die Visualisierung – lass uns das Design vor dem Termin beim Fachbetrieb noch zusammen schärfen.',
    time: '10:08',
  },
  {
    side: 'customer',
    text: 'Können wir die Sitzfläche etwas vergrößern und mehr Grün in die Ecke legen?',
    time: '10:10',
  },
  {
    side: 'craft',
    text: 'Gute Idee. Ich skizziere die Fläche etwas breiter und schlage dir zwei Pflanzvarianten vor – so passt es zur späteren Umsetzung.',
    time: '10:12',
  },
  {
    side: 'customer',
    text: 'Super. Bitte die Hecke an der Grenze als Sichtschutz mitdenken.',
    time: '10:13',
  },
  {
    side: 'craft',
    text: 'Notiert. Ich aktualisiere die Visualisierung und schicke dir die Vorschau, bevor du den Termin vereinbarst.',
    time: '10:14',
  },
  {
    side: 'craft',
    text: 'Referenz_Sichtschutz.jpg',
    time: '10:16',
    kind: 'file',
  },
] as const;

export function ChatCustomerCraftPage() {
  return (
    <DeviceShell className="chat-screen" width={380}>
      <section className="hero-header">
        <BackTextButton />
        <h1>Chat mit Greenline Build</h1>
        <p>Design-Abstimmung · Privatgarten #001</p>
      </section>

      <section className="flow-content compact-content">
        <div className="profile-tags">
          <span>Greenline Build</span>
          <span>Vor Termin beim Fachbetrieb</span>
          <span>Antwortzeit: ~ 30 Min</span>
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
        </div>
      </section>

      <footer className="chat-input-bar">
        <button className="outline-pill attach-pill">＋</button>
        <input aria-label="Nachricht" placeholder="Nachricht schreiben" />
        <button className="primary-pill send-pill">Senden</button>
      </footer>
    </DeviceShell>
  );
}
