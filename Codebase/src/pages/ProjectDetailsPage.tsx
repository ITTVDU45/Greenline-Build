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
  {
    title: 'Brunnen',
    tasks: [
      ['Erdarbeiten', 'open'],
      ['Technikanschluss vorbereiten', 'open'],
    ],
  },
] as const;

export function ProjectDetailsPage() {
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
          <p>Der Handwerker startet die Umsetzung. Du siehst den Fortschritt live.</p>
          <small>Handwerker: Simply garden, Termin: Di, 4. März 2026 12:00–12:45</small>
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

        <div className="section-copy">
          <h3>Aufgaben-Checkliste</h3>
          <p>Wird vom Handwerker aktualisiert (nur Anzeige).</p>
        </div>

        <div className="hw-card-list">
          {groups.map((group) => (
            <article className="info-card" key={group.title}>
              <h3>{group.title}</h3>
              {group.tasks.map(([task, state]) => (
                <div className="task-row" key={task}>
                  <span className={`task-mark ${state}`.trim()} />
                  <span>{task}</span>
                  <strong>
                    {state === 'done' ? 'Erledigt' : state === 'progress' ? 'In Arbeit' : 'Offen'}
                  </strong>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </DeviceShell>
  );
}
