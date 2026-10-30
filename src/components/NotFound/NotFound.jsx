import './NotFound.css';
import { getAppPath } from '../../utils/sitePaths';

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__content">
        <p className="not-found__code">404 · Página no encontrada</p>
        <h1>Esta ruta no existe</h1>
        <p>
          Puede que el enlace haya cambiado o que la dirección esté escrita
          incorrectamente.
        </p>
        <a className="not-found__link" href={getAppPath('/')}>
          Volver al inicio
        </a>
      </div>
    </main>
  );
}

export default NotFound;
