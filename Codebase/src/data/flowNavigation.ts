import type { NavigateFunction } from 'react-router-dom';
import { getCurrentFeatureIndex, setCurrentFeatureIndex } from './customerFlow';

/**
 * Vorherige Seite im Haupt-Flow (kein Browser-History → keine Loops).
 */
const FLOW_PREVIOUS: Record<string, string> = {
  '/login': '/landing',
  '/projekt-auswahl': '/login',
  '/flaeche-erfassen': '/projekt-auswahl',
  '/analyse': '/flaeche-erfassen',
  '/feature-auswahl': '/analyse',
  '/gestaltung-extras': '/gestaltung-material',
  '/auswahl-zusammenfassung': '/gestaltung-extras',
  '/paket-auswahl': '/auswahl-zusammenfassung',
  '/visualisierung-vorschau': '/paket-auswahl',
  '/qualitaetsstufe': '/visualisierung-vorschau',
  '/termin-datum': '/qualitaetsstufe',
  '/termin-buchung': '/qualitaetsstufe',
  '/termin-uhrzeit': '/termin-datum',
  '/investitionsuebersicht': '/termin-uhrzeit',
  '/projektfreischaltung': '/investitionsuebersicht',
  '/vorarbeiten': '/dashboard-aktualisiert',
  '/termin-bestaetigung': '/dashboard-aktualisiert',
  '/projekt-details': '/dashboard-aktualisiert',
  '/chat-kunde-handwerker': '/dashboard-aktualisiert',
  '/chat-handwerker-kunde': '/handwerker-dashboard',
  '/handwerker-projekt-annehmen': '/handwerker-login',
  '/handwerker-login': '/',
  '/handwerker-projekt-details': '/handwerker-projekte',
};

/**
 * Zurück-Navigation immer zum logischen vorherigen Schritt im Flow.
 */
export function performFlowBack(navigate: NavigateFunction, pathname: string, fallback: string) {
  if (pathname === '/gestaltung-material') {
    const idx = getCurrentFeatureIndex();
    if (idx > 0) {
      setCurrentFeatureIndex(idx - 1);
      navigate('/gestaltung-extras');
      return;
    }
    navigate('/feature-auswahl');
    return;
  }

  const target = FLOW_PREVIOUS[pathname];
  if (target) {
    navigate(target);
    return;
  }

  navigate(fallback);
}
