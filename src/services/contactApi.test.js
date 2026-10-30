import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkBackendApi, sendContactMessage } from './contactApi';

const endpoint = 'http://127.0.0.1:8000/api/v1/contact/';

describe('contact API contract', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      setTimeout: globalThis.setTimeout,
      clearTimeout: globalThis.clearTimeout,
    });
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it.each([405, 429])('treats GET response %i as an active API', async (status) => {
    fetch.mockResolvedValue(new Response(null, { status }));

    await expect(checkBackendApi()).resolves.toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      endpoint,
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    );
  });

  it('sends the contact payload as JSON and accepts only a 201 response', async () => {
    const message = {
      name: 'Persona de prueba',
      email: 'persona@ejemplo.com',
      subject: '',
      message: 'Consulta automatizada',
      privacy_accepted: true,
    };
    fetch.mockResolvedValue(new Response(null, { status: 201 }));

    await expect(sendContactMessage(message)).resolves.toBeUndefined();

    expect(fetch).toHaveBeenCalledWith(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  });

  it.each([200, 202, 204])('does not report HTTP %i as a successful submission', async (status) => {
    fetch.mockResolvedValue(new Response(null, { status }));

    await expect(sendContactMessage({ privacy_accepted: true }))
      .rejects.toThrow('El servidor no confirmó la recepción del mensaje.');
  });

  it('surfaces the backend privacy configuration error', async () => {
    fetch.mockResolvedValue(new Response(
      JSON.stringify({ detail: 'Configura el aviso de privacidad.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    ));

    await expect(sendContactMessage({ privacy_accepted: true }))
      .rejects.toThrow('Configura el aviso de privacidad.');
  });

  it('surfaces the backend rate-limit error', async () => {
    fetch.mockResolvedValue(new Response(
      JSON.stringify({ detail: 'Límite de mensajes alcanzado.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    ));

    await expect(sendContactMessage({ privacy_accepted: true }))
      .rejects.toThrow('Límite de mensajes alcanzado.');
  });

  it('provides a useful fallback when the backend gives no error detail', async () => {
    fetch.mockResolvedValue(new Response('{}', { status: 503 }));

    await expect(sendContactMessage({ privacy_accepted: true }))
      .rejects.toThrow('El perfil aún no tiene configurado el aviso de privacidad.');
  });

  it('reports network errors without treating them as successful submissions', async () => {
    fetch.mockRejectedValue(new TypeError('Network unavailable'));

    await expect(sendContactMessage({ privacy_accepted: true }))
      .rejects.toThrow('No se pudo conectar con el servidor.');
  });

  it('rejects insecure API URLs in production', async () => {
    vi.stubEnv('PROD', true);

    await expect(sendContactMessage({ privacy_accepted: true }))
      .rejects.toThrow('El formulario requiere una URL HTTPS segura en producción.');
    expect(fetch).not.toHaveBeenCalled();
  });
});
