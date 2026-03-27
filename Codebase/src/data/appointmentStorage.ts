const STORAGE_KEY = 'appointment-selection';

export interface AppointmentSelection {
  /** ISO-Datum YYYY-MM-DD */
  date: string;
  /** z. B. "09:00" */
  time: string;
}

const defaultSelection: AppointmentSelection = {
  date: '2026-03-01',
  time: '10:00',
};

export function loadAppointment(): AppointmentSelection {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultSelection };
    const parsed = JSON.parse(raw) as Partial<AppointmentSelection>;
    if (typeof parsed.date === 'string' && typeof parsed.time === 'string') {
      return { date: parsed.date, time: parsed.time };
    }
  } catch {
    /* ignore */
  }
  return { ...defaultSelection };
}

export function saveAppointment(partial: Partial<AppointmentSelection>) {
  const next = { ...loadAppointment(), ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

/** Einzelne Tage im März 2026, die nicht wählbar sind (wie im Original-Design) */
export const disabledMarchDays = new Set([6, 12, 16, 21]);

export interface CalendarCell {
  date: Date;
  label: string;
  inCurrentMonth: boolean;
}

/** Kalender für einen Monat (Mo–So), mit Vor-/Nachmonat-Auffüllung bis 6 Zeilen */
export function getCalendarCells(year: number, monthIndex: number): CalendarCell[] {
  const first = new Date(year, monthIndex, 1);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const prevMonthLast = new Date(year, monthIndex, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let i = 0; i < startPad; i++) {
    const day = prevMonthLast - startPad + i + 1;
    cells.push({
      date: new Date(year, monthIndex - 1, day),
      label: String(day),
      inCurrentMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(year, monthIndex, d),
      label: String(d),
      inCurrentMonth: true,
    });
  }

  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({
      date: new Date(year, monthIndex + 1, nextDay),
      label: String(nextDay),
      inCurrentMonth: false,
    });
    nextDay += 1;
  }

  return cells.slice(0, 42);
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatAppointmentDateLong(iso: string): string {
  const d = parseIsoDate(iso);
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function formatCalendarMonthTitle(year: number, monthIndex: number): string {
  return new Intl.DateTimeFormat('de-DE', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, monthIndex, 1));
}
