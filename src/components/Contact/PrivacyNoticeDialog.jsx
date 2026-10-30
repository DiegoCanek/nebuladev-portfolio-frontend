import { useEffect, useRef } from 'react';
import { legalPages } from '../../data/legalPages';
import './PrivacyNoticeDialog.css';

function PrivacyNoticeDialog({ onClose }) {
  const dialogRef = useRef(null);
  const privacyPage = legalPages['/privacidad'];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="privacy-dialog"
      aria-labelledby="privacy-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="privacy-dialog__header">
        <div>
          <p className="privacy-dialog__eyebrow">NebulaDev · Versión {privacyPage.version}</p>
          <h2 id="privacy-dialog-title">{privacyPage.title}</h2>
          <p className="privacy-dialog__updated">Última actualización: {privacyPage.updated}</p>
        </div>
        <button
          className="privacy-dialog__close"
          type="button"
          aria-label="Cerrar aviso de privacidad"
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
      </div>
      <div className="privacy-dialog__body">
        {privacyPage.sections.map((section) => (
          <section key={section.title}>
            <h3>{section.title}</h3>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
      <div className="privacy-dialog__actions">
        <button type="button" onClick={() => dialogRef.current?.close()}>
          Cerrar y volver al formulario
        </button>
      </div>
    </dialog>
  );
}

export default PrivacyNoticeDialog;
