import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { persistFlowStateForActiveProject } from '../data/projectFlowSnapshot';

/** Schreibt den Flow-Zustand bei jeder Navigation in den Snapshot des aktiven Projekts. */
export function FlowPersistence() {
  const { pathname } = useLocation();

  useEffect(() => {
    persistFlowStateForActiveProject(pathname);
  }, [pathname]);

  return null;
}
