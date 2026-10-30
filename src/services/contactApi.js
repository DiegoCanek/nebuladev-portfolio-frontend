import { API_BASE_URL } from './apiConfig';
const CONTACT_ENDPOINT = '/contact/';

function ensureSecureApiUrl() {
  if (import.meta.env.PROD && new URL(API_BASE_URL).protocol !== 'https:') {
    throw new Error('El formulario requiere una URL HTTPS segura en producción.');
  }
}

export async function checkBackendApi() {
  ensureSecureApiUrl();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${API_BASE_URL}${CONTACT_ENDPOINT}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    return response.ok || [405, 429].includes(response.status);
  } catch (error) {
    if (error instanceof TypeError) return false;
    if (error instanceof DOMException && error.name === 'AbortError') return false;
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function sendContactMessage(message) {
  ensureSecureApiUrl();
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${CONTACT_ENDPOINT}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
        { cause: error },
      );
    }

    throw error;
  }

  if (response.status === 201) return;

  if (response.status === 429) {
    throw new Error(await getErrorDetail(response)
      || 'Se recibieron más de 5 mensajes en una hora. Espera antes de volver a intentarlo.');
  }

  if (!response.ok) {
    const detail = await getErrorDetail(response);
    if (detail) throw new Error(detail);
    if (response.status === 400 || response.status === 422) {
      throw new Error('Revisa los datos del formulario e inténtalo de nuevo.');
    }
    if (response.status === 503) {
      throw new Error('El perfil aún no tiene configurado el aviso de privacidad. Contacta al administrador.');
    }
    if (response.status >= 500) {
      throw new Error('El servidor no pudo procesar el mensaje. Inténtalo de nuevo en unos minutos.');
    }
    throw new Error('No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.');
  }

  throw new Error('El servidor no confirmó la recepción del mensaje.');
}

async function getErrorDetail(response) {
  try {
    const result = await response.json();
    return result && typeof result === 'object' && typeof result.detail === 'string'
      ? result.detail
      : '';
  } catch (error) {
    if (error instanceof SyntaxError) return '';
    throw error;
  }
}
