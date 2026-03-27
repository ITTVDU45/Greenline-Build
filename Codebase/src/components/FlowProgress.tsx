import { useLocation } from 'react-router-dom';
import {
  getFlowProgressPage,
  getFlowProgressPercentForPath,
  getTotalFlowPages,
} from '../data/flowProgress';

type FlowProgressProps = {
  /** Text rechts (z. B. Termin-Screens) */
  alignRight?: boolean;
  /** Schmale Leiste wie bei Paket-/Termin-Seiten */
  slim?: boolean;
  /** Dunkle Füllung (wie früher bei einigen Screens) */
  fillVariant?: 'default' | 'dark';
};

export function FlowProgress({
  alignRight = false,
  slim = false,
  fillVariant = 'default',
}: FlowProgressProps) {
  const { pathname } = useLocation();
  const totalPages = getTotalFlowPages();
  const page = getFlowProgressPage(pathname);
  const pct = getFlowProgressPercentForPath(pathname);
  if (page === null || pct === null) return null;

  const fillClass =
    fillVariant === 'dark' ? 'progress-bar-fill dark-progress' : 'progress-bar-fill';

  return (
    <>
      <div className={`progress-copy ${alignRight ? 'right-copy' : ''}`.trim()}>
        Seite {page} / {totalPages}
      </div>
      <div className={`progress-bar ${slim ? 'slim-progress' : ''}`.trim()}>
        <span className={fillClass} style={{ width: `${pct}%` }} />
      </div>
    </>
  );
}
