import { describe, expect, it } from 'vitest';
import { legalPages } from './legalPages';

describe('legal pages reflect confirmed backend behavior', () => {
  it('states that contact data and accepted notice version are stored', () => {
    const privacyText = legalPages['/privacidad'].sections
      .flatMap((section) => section.paragraphs)
      .join(' ');

    expect(privacyText).toContain('guarda los datos del mensaje');
    expect(privacyText).toContain('versión del aviso aceptado');
    expect(privacyText).toContain('plazo de conservación');
    expect(privacyText).toContain('fecha y el estado de seguimiento');
    expect(privacyText.toLowerCase()).toContain('no envía correos automáticamente');
  });

  it('describes admin cookies as technical and excludes backend analytics', () => {
    const cookieText = legalPages['/cookies'].sections
      .flatMap((section) => section.paragraphs)
      .join(' ');

    expect(cookieText).toContain('cookies técnicas');
    expect(cookieText).toContain('panel de administración');
    expect(cookieText).toContain('No administra los proyectos');
    expect(cookieText.toLowerCase()).toContain('ni instala cookies de analítica');
  });
});
