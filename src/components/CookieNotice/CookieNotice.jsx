import { useState } from 'react';
import { getAppPath } from '../../utils/sitePaths';
import './CookieNotice.css';

const STORAGE_KEY = 'nebuladev-cookie-notice-dismissed-v1';

function CookieNotice() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== 'true';
    } catch (error) {
      console.error('No se pudo leer la preferencia del aviso de cookies.', error);
      return true;
    }
  });

  const dismissNotice = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch (error) {
      console.error('No se pudo guardar la preferencia del aviso de cookies.', error);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="cookie-notice" aria-label="Aviso sobre cookies">
      <div className="cookie-notice__icon" aria-hidden="true">🍪</div>
      <div className="cookie-notice__content">
        <h2>Información sobre cookies</h2>
        <p>
          El backend utiliza cookies técnicas para la sesión y protección del
          administrador; el frontend no activa analítica ni publicidad. Consulta la{' '}
          <a href={getAppPath('/cookies')} target="_blank" rel="noopener noreferrer">
            política de cookies
          </a>.
        </p>
      </div>
      <button className="cookie-notice__dismiss" onClick={dismissNotice}>
        Entendido
      </button>
    </aside>
  );
}

export default CookieNotice;
