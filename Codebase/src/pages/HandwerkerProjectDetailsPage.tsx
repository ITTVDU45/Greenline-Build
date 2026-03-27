import { Link } from 'react-router-dom';
import { BackTextButton } from '../components/BackTextButton';
import { DeviceShell } from '../components/DeviceShell';

const groups = [
  {
    title: 'Terrasse',
    tasks: [
      ['Untergrund begradigen', 'done'],
      ['Schottertragschicht einbauen', 'progress'],
      ['Natursteinplatten verlegen', 'open'],
    ],
  },
  {
    title: 'Rollrasen',
    tasks: [
      ['Alte Grasnarbe abtragen', 'done'],
      ['Boden auflockern & planieren', 'done'],
      ['Rollrasen verlegen', 'open'],
    ],
  },
] as const;

export function HandwerkerProjectDetailsPage() {
  return (
    <DeviceShell className="flow-screen" width={380}>
      <section className="hero-header">
        <BackTextButton />
        <h1>Projekt Details</h1>
        <p>Projekt: Privatgarten #001</p>
      </section>

      <section className="flow-content compact-content">
        <article className="info-card">
          <h3>Auftrag bestätigt</h3>
          <p>Du kannst die Aufgaben jetzt direkt im Projekt abhaken.</p>
          <small>Kunde: Max Müller, Termin: Di, 4. März 2026 12:00–12:45</small>
        </article>

        <article className="info-card">
          <div className="row-line">
            <span>Fortschritt</span>
            <strong>38%</strong>
          </div>
          <p>3 von 8 Aufgaben erledigt</p>
          <div className="progress-bar">
            <span className="progress-bar-fill progress-38" />
          </div>
        </article>

        <div className="hw-card-list">
          {groups.map((group) => (
            <article className="info-card" key={group.title}>
              <h3>{group.title}</h3>
              {group.tasks.map(([task, state]) => (
                <label className="task-row editable" key={task}>
                  <input defaultChecked={state === 'done'} type="checkbox" />
                  <span>{task}</span>
                  <strong>
                    {state === 'done' ? 'Erledigt' : state === 'progress' ? 'In Arbeit' : 'Offen'}
                  </strong>
                </label>
              ))}
            </article>
          ))}
        </div>

        <article className="info-card">
          <h3>Updates</h3>
          <p>Untergrund begradigt (heute 14:10)</p>
          <p>Schottertragschicht gestartet</p>
          <p>Letzte Aktivität mit Kunde: vor 8 Min</p>
        </article>
      </section>

      <footer className="upsell-footer">
        <Link className="primary-pill wide button-link" to="/chat-handwerker-kunde">
          Chat mit Kunde
        </Link>
      </footer>
    </DeviceShell>
  );
}
