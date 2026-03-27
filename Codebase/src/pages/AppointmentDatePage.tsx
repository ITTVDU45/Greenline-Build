import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { DeviceShell } from '../components/DeviceShell';
import { FlowProgress } from '../components/FlowProgress';
import {
  disabledMarchDays,
  formatCalendarMonthTitle,
  getCalendarCells,
  loadAppointment,
  saveAppointment,
  toIsoDate,
} from '../data/appointmentStorage';
import {
  getHandwerkerById,
  loadQualityIndex,
  loadSelectedHandwerkerId,
} from '../data/handwerkerOptions';

const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const CAL_YEAR = 2026;
const CAL_MONTH = 2; // März

const qualityLabels: [string, string, string] = ['Standard', 'Komfort', 'Vollprofi'];

function isCellDisabled(cell: { date: Date; inCurrentMonth: boolean }): boolean {
  if (!cell.inCurrentMonth) return true;
  if (cell.date.getFullYear() !== CAL_YEAR || cell.date.getMonth() !== CAL_MONTH) return true;
  return disabledMarchDays.has(cell.date.getDate());
}

export function AppointmentDatePage() {
  const handwerker = getHandwerkerById(loadSelectedHandwerkerId());
  const qualityLabel = qualityLabels[loadQualityIndex()] ?? qualityLabels[0];
  const cells = getCalendarCells(CAL_YEAR, CAL_MONTH);
  const [selectedIso, setSelectedIso] = useState(() => loadAppointment().date);

  function selectDate(cell: (typeof cells)[0]) {
    if (isCellDisabled(cell)) return;
    const iso = toIsoDate(cell.date);
    setSelectedIso(iso);
    saveAppointment({ date: iso });
  }

  return (
    <DeviceShell className="flow-screen" width={380}>
      <AppHeader
        subtitle="Kostenlose Prüfung & Feinabstimmung vor Ort"
        title="Vor-Ort-Termin vereinbaren"
      />

      <section className="flow-content">
        <FlowProgress alignRight slim />

        <article className="summary-card">
          <p>Qualitätsstufe: {qualityLabel}</p>
          <p>Betrieb: {handwerker.betriebLabel}</p>
          <p>Leistungen: {handwerker.skills.slice(0, 2).join(', ')}</p>
        </article>

        <article className="profile-card">
          <div className="profile-head">
            <img alt="" src={handwerker.image} />
            <div>
              <h3>{handwerker.name}</h3>
              <p>✓ Geprüfter Fachbetrieb</p>
            </div>
          </div>
          <div className="profile-meta">
            <span>⭐ {handwerker.rating}</span>
            <span>⚒ {handwerker.experience}</span>
          </div>
          <div className="profile-tags">
            {handwerker.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </article>

        <h3 className="section-heading">Datum wählen</h3>
        <p className="subtle-copy subtle-copy-tight">
          Tippe auf einen freien Tag im Kalender. Grau = nicht verfügbar.
        </p>

        <article className="calendar-card">
          <h4>{formatCalendarMonthTitle(CAL_YEAR, CAL_MONTH)}</h4>
          <div className="calendar-weekdays">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {cells.map((cell, index) => {
              const disabled = isCellDisabled(cell);
              const iso = toIsoDate(cell.date);
              const isSelected = !disabled && cell.inCurrentMonth && iso === selectedIso;
              return (
                <button
                  className={`calendar-day ${isSelected ? 'selected' : ''} ${disabled ? 'muted' : ''}`.trim()}
                  disabled={disabled}
                  key={`${iso}-${index}`}
                  onClick={() => selectDate(cell)}
                  type="button"
                >
                  {cell.label}
                </button>
              );
            })}
          </div>
        </article>

        <p className="subtle-copy">Der Termin dauert ca. 30–45 Minuten.</p>
      </section>

      <footer className="flow-footer flow-footer-stacked">
        <Link className="secondary-link button-link-inline" to="/qualitaetsstufe">
          Zurück
        </Link>
        <Link className="primary-pill wide button-link" to="/termin-uhrzeit">
          Weiter zur Uhrzeit
        </Link>
      </footer>
    </DeviceShell>
  );
}
