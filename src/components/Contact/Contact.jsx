// src/components/Contact/Contact.jsx
import { useEffect, useState } from 'react';
import { checkBackendApi, sendContactMessage } from '../../services/contactApi';
import PrivacyNoticeDialog from './PrivacyNoticeDialog';
import './Contact.css';

const Contact = ({ site }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy_accepted: false,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [apiAvailable, setApiAvailable] = useState(null);
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  const urgentContactOptions = [
    site.email && 'correo',
    site.phone && 'teléfono',
  ].filter(Boolean).join(' o ');

  const retryBackendCheck = () => {
    setApiAvailable(null);
    checkBackendApi().then(setApiAvailable).catch(() => setApiAvailable(false));
  };

  useEffect(() => {
    let active = true;
    checkBackendApi().then((available) => {
      if (active) setApiAvailable(available);
    }).catch(() => {
      if (active) setApiAvailable(false);
    });

    return () => {
      active = false;
    };
  }, []);

  // ── Validación ──────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    const email = formData.email.trim();

    if (!formData.name.trim())
      newErrors.name = 'El nombre es requerido';
    if (!email)
      newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Email inválido';
    if (!formData.message.trim())
      newErrors.message = 'El mensaje es requerido';
    if (!formData.privacy_accepted)
      newErrors.privacy_accepted = 'Debes aceptar el aviso para enviar el mensaje.';
    return newErrors;
  };

  // ── Handlers ────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const nextValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: nextValue }));
    if (status === 'error') {
      setStatus('idle');
      setSubmitError('');
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiAvailable) {
      setStatus('error');
      setSubmitError(`El formulario no se envió porque el backend no está disponible.${urgentContactOptions ? ` Si urge, contáctanos por ${urgentContactOptions}.` : ''}`);
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');

    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        privacy_accepted: formData.privacy_accepted,
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', privacy_accepted: false });
      setErrors({});
    } catch (error) {
      if (error instanceof Error && error.cause instanceof TypeError) {
        setApiAvailable(false);
      }
      setSubmitError(`El formulario no se envió. ${error instanceof Error
        ? error.message
        : 'No se pudo conectar con el backend.'}${urgentContactOptions ? ` Si urge, contáctanos por ${urgentContactOptions}.` : ''}`);
      setStatus('error');
    }
  };

  // ── Info de contacto ─────────────────────────────────────
  const contactInfo = [
    site.email && { icon: '📧', label: 'Email', value: site.email, href: `mailto:${site.email}` },
    site.phone && { icon: '📱', label: 'Teléfono', value: site.phone, href: `tel:${site.phone}` },
    (site.linkedin_url || site.linkedinUrl) && {
      icon: '💼', label: 'LinkedIn', value: site.linkedin_url || site.linkedinUrl,
      href: site.linkedin_url || site.linkedinUrl,
    },
    (site.github_url || site.githubUrl) && {
      icon: '🐙', label: 'GitHub', value: site.github_url || site.githubUrl,
      href: site.github_url || site.githubUrl,
    },
    site.instagram_url && {
      icon: '📸', label: 'Instagram', value: site.instagram_url, href: site.instagram_url,
    },
    site.location && { icon: '📍', label: 'Ubicación', value: site.location },
  ].filter(Boolean);

  return (
    <section className="contact" id="contact">

      {/* Fondo espacial */}
      <div className="contact__bg">
        <div className="contact__nebula contact__nebula--1" />
        <div className="contact__nebula contact__nebula--2" />
      </div>

      <div className="contact__container">

        {/* Encabezado */}
        <div className="contact__header">
          <span className="contact__label">📡 Comunícate con nosotros</span>
          <h2 className="contact__title">
            Hagamos algo <span className="gradient-text">increíble</span> juntos
          </h2>
          {(site.introduction || site.description) && (
            <p className="contact__subtitle">{site.introduction || site.description}</p>
          )}
        </div>

        {/* Contenido principal */}
        <div className="contact__content">

          {/* ── Panel izquierdo — Info ── */}
          <div className="contact__info">
            <h3 className="contact__info-title">Información de contacto</h3>
            <ul className="contact__links">
              {contactInfo.map((item, i) => (
                <li key={i} className="contact__link-item">
                  <span className="contact__link-icon">{item.icon}</span>
                  <div>
                    <span className="contact__link-label">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="contact__link-value"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact__link-value contact__link-value--plain">
                        {item.value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {contactInfo.length === 0 && (
              <p className="contact__link-value contact__link-value--plain">
                Escríbenos a {site.email}.
              </p>
            )}
            <p className="contact__urgent">
              Si tu solicitud es urgente, contáctanos directamente
              {site.email && <> por <a href={`mailto:${site.email}`}>correo electrónico</a></>}
              {site.email && site.phone && ' o '}
              {site.phone && <>al <a href={`tel:${site.phone}`}>{site.phone}</a></>}.
            </p>
          </div>

          {/* ── Panel derecho — Formulario ── */}
          <div className="contact__form-wrapper">
            {status === 'success' ? (
              <div className="contact__success">
                <div className="contact__success-icon">🚀</div>
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por contactarnos. Tu mensaje fue recibido.</p>
                <button
                  type="button"
                  className="contact__success-reset"
                  onClick={() => setStatus('idle')}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                {status === 'error' && (
                  <p className="contact__submit-error" role="alert">
                    {submitError}
                    {site.email && <> <a href={`mailto:${site.email}`}>Escribir por correo</a>.</>}
                    {site.phone && <> <a href={`tel:${site.phone}`}>Llamar</a>.</>}
                  </p>
                )}
                {apiAvailable === false && status !== 'error' && (
                  <p className="contact__submit-error" role="status">
                    El backend no está disponible; el formulario no se enviará.
                    {site.email && <> Si urge, escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a>.</>}
                    {site.phone && <> También puedes llamar al <a href={`tel:${site.phone}`}>{site.phone}</a>.</>}
                    {' '}
                    <button type="button" className="contact__backend-retry" onClick={retryBackendCheck}>
                      Volver a comprobar
                    </button>
                  </p>
                )}

                {/* Nombre y Email */}
                <div className="contact__row">
                  <div className={`contact__field ${errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="name">Nombre completo</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Juan García"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      maxLength={100}
                      required
                    />
                    {errors.name && (
                      <span className="contact__error">{errors.name}</span>
                    )}
                  </div>

                  <div className={`contact__field ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="juan@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                    {errors.email && (
                      <span className="contact__error">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Asunto */}
                <div className={`contact__field ${errors.subject ? 'has-error' : ''}`}>
                  <label htmlFor="subject">Asunto (opcional)</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={160}
                  />
                  {errors.subject && (
                    <span className="contact__error">{errors.subject}</span>
                  )}
                </div>

                {/* Mensaje */}
                <div className={`contact__field ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Cuéntanos sobre tu proyecto..."
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={5000}
                    required
                  />
                  {errors.message && (
                    <span className="contact__error">{errors.message}</span>
                  )}
                </div>

                <div className={`contact__field contact__privacy ${errors.privacy_accepted ? 'has-error' : ''}`}>
                  <label htmlFor="privacy_accepted">
                    <input
                      id="privacy_accepted"
                      name="privacy_accepted"
                      type="checkbox"
                      checked={formData.privacy_accepted}
                      onChange={handleChange}
                      aria-describedby={errors.privacy_accepted ? 'privacy-error' : undefined}
                      required
                    />
                    <span>{site.privacy_notice || 'Acepto que mis datos se utilicen para responder a esta solicitud.'}</span>
                  </label>
                  <button
                    className="contact__privacy-link"
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setIsPrivacyDialogOpen(true)}
                  >
                    Leer aviso de privacidad
                  </button>
                  {errors.privacy_accepted && (
                    <span className="contact__error" id="privacy-error">{errors.privacy_accepted}</span>
                  )}
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  className={`contact__submit ${status === 'sending' ? 'sending' : ''}`}
                  disabled={status === 'sending' || apiAvailable !== true}
                >
                  {apiAvailable === null ? (
                    'Comprobando conexión...'
                  ) : apiAvailable === false ? (
                    'Formulario no disponible'
                  ) : status === 'sending' ? (
                    <>
                      <span className="contact__spinner" />
                      Enviando...
                    </>
                  ) : (
                    <>🚀 Enviar mensaje</>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
      {isPrivacyDialogOpen && (
        <PrivacyNoticeDialog onClose={() => setIsPrivacyDialogOpen(false)} />
      )}
    </section>
  );
};

export default Contact;