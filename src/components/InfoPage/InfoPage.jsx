import './InfoPage.css';
import { legalPages } from '../../data/legalPages';
import { getAppPath } from '../../utils/sitePaths';

function InfoPage({ pathname }) {
  const page = legalPages[pathname];

  if (!page) {
    return (
      <main className="info-page">
        <h1>Página no encontrada</h1>
        <a href={getAppPath('/')}>Volver al inicio</a>
      </main>
    );
  }

  return (
    <main className="info-page">
      <header className="info-page__intro">
        <p className="info-page__eyebrow">NebulaDev <span aria-hidden="true">/</span> Información legal</p>
        <h1>{page.title}</h1>
        <div className="info-page__meta">
          <p className="info-page__updated">Última actualización: {page.updated}</p>
          {page.version && <span className="info-page__version">Versión {page.version}</span>}
        </div>
      </header>
      <div className="info-page__content">
        {page.sections.map((section) => (
          <section className="info-page__section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
      <aside className="info-page__contact">
        <div>
          <h2>¿Tienes alguna pregunta?</h2>
          <p>Estamos disponibles para ayudarte con cualquier consulta sobre esta información.</p>
        </div>
        <a href={getAppPath('/contacto')}>Contactar a NebulaDev <span aria-hidden="true">→</span></a>
      </aside>
    </main>
  );
}

export default InfoPage;
