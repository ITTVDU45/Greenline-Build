import { useLocation, useNavigate } from 'react-router-dom';
import { performFlowBack } from '../data/flowNavigation';

type BackTextButtonProps = {
  className?: string;
  fallbackTo?: string;
  label?: string;
};

export function BackTextButton({
  className = 'back-link',
  fallbackTo = '/',
  label = '← Zurück',
}: BackTextButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleBack() {
    performFlowBack(navigate, location.pathname, fallbackTo);
  }

  return (
    <button className={className} onClick={handleBack} type="button">
      {label}
    </button>
  );
}
