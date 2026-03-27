import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { DeviceShell } from '../components/DeviceShell';
import { FlowProgress } from '../components/FlowProgress';
import {
  formatAppointmentDateLong,
  loadAppointment,
  saveAppointment,
} from '../data/appointmentStorage';

const slots = [
  { label: '08:00', state: 'disabled' as const },
  { label: '09:00', state: 'default' as const },
  { label: '10:00', state: 'default' as const },
  { label: '11:00', state: 'default' as const },
  { label: '12:00', state: 'disabled' as const },
  { label: '13:00', state: 'default' as const },
  { label: '14:00', state: 'default' as const },
  { label: '15:00', state: 'default' as const },
  { label: '16:00', state: 'default' as const },
];

export function AppointmentTimePage() {
  const dateIso = loadAppointment().date;
  const [selectedTime, setSelectedTime] = useState(() => loadAppointment().time);

  function selectTime(label: string, state: 'default' | 'disabled') {
    if (state === 'disabled') return;
    setSelectedTime(label);
    saveAppointment({ time: label });
  }

  return (
    <DeviceShell className="flow-screen" width={380}>
      <AppHeader
        subtitle="Wählen Sie einen verfügbaren Slot für den Vor-Ort-Termin aus."
        title="Uhrzeit auswählen"
      />

      <section className="flow-content">
        <FlowProgress alignRight slim />

        <article className="summary-card summary-card-green">
          <small>Ausgewähltes Datum</small>
          <strong>{formatAppointmentDateLong(dateIso)}</strong>
        </article>

        <h3 className="section-heading" id="time-slot-grid">
          Uhrzeit wählen
        </h3>
        <p className="subtle-copy subtle-copy-tight">Tippe auf einen freien Slot.</p>

        <article className="time-grid-card">
          <div className="time-grid">
            {slots.map((slot) => {
              const isSelected = slot.state !== 'disabled' && slot.label === selectedTime;
              return (
                <button
                  className={`time-slot ${slot.state === 'disabled' ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`.trim()}
                  disabled={slot.state === 'disabled'}
                  key={slot.label}
                  onClick={() => selectTime(slot.label, slot.state)}
                  type="button"
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </article>

        <p className="subtle-copy">
          Der Betrieb meldet sich kurz vor dem Termin telefonisch an.
        </p>
      </section>

      <footer className="flow-footer flow-footer-stacked">
        <div className="termin-footer-dual">
          <Link className="secondary-link button-link-inline" to="/termin-datum">
            Datum ändern
          </Link>
          <a className="secondary-link button-link-inline" href="#time-slot-grid">
            Uhrzeit ändern
          </a>
        </div>
        <Link className="primary-pill wide button-link" to="/investitionsuebersicht">
          weiter zu den Investitionen
        </Link>
      </footer>
    </DeviceShell>
  );
}
