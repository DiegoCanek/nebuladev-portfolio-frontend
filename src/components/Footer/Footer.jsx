// src/components/Footer/Footer.jsx
import { useState, useEffect } from 'react';
import { navLinks as defaultNavLinks } from '../../data/portfolioData';
import { getAppPath } from '../../utils/sitePaths';
import './Footer.css';

const Footer = ({ site, navigation, services }) => {
  const [showTop, setShowTop] = useState(false);
  const currentYear = new Date().getFullYear();
  const navLinks = Array.isArray(navigation) ? navigation : defaultNavLinks;

  // Mostrar botón "volver arriba"
  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        setShowTop(window.scrollY > 400);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Datos ────────────────────────────────────────────────
  const socialLinks = [
    { icon: '🐙', label: 'GitHub', href: site.github_url || site.githubUrl },
    { icon: '💼', label: 'LinkedIn', href: site.linkedin_url || site.linkedinUrl },
    { icon: '📸', label: 'Instagram', href: site.instagram_url || site.instagramUrl },
  ].filter((link) => link.href);

  const contactDetails = [
    site.email && { icon: '📧', label: 'Email', value: site.email, href: `mailto:${site.email}` },
    site.phone && { icon: '📱', label: 'Teléfono', value: site.phone, href: `tel:${site.phone}` },
    site.location && { icon: '📍', label: 'Ubicación', value: site.location },
  ].filter(Boolean);

  return (
    <footer className="footer">

      {/* ── Contenido principal ── */}
      <div className="footer__container">

        {/* Grid superior */}
        <div className="footer__grid">

          {/* Columna 1 — Marca */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">🌌</span>
              <span className="footer__logo-text">{site.name}</span>
            </div>
            {(site.about || site.description) && (
              <p className="footer__tagline">{site.about || site.description}</p>
            )}
            {/* Redes sociales */}
            <div className="footer__social">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-btn"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2 — Navegación */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navegación</h4>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={getAppPath(`#${link.id}`)} className="footer__link">
                    <span className="footer__link-arrow">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Servicios */}
          <div className="footer__col">
            <h4 className="footer__col-title">Servicios</h4>
            <ul className="footer__list">
              {services.map((s, i) => (
                <li key={s.id ?? s.title ?? i}>
                  <span className="footer__link footer__link--plain">
                    <span className="footer__link-arrow">›</span>
                    {s.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto rápido */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contacto</h4>
            <ul className="footer__contact-list">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <span className="footer__contact-icon">{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} className="footer__link">{item.value}</a>
                  ) : (
                    <span className="footer__contact-text">{item.value}</span>
                  )}
                </li>
              ))}
              <li>
                <span className="footer__contact-icon">✉️</span>
                <a href={getAppPath('/contacto')} className="footer__link">Formulario de contacto</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Legal</h4>
            <ul className="footer__list">
              <li><a href={getAppPath('/terminos')} className="footer__link">Términos de uso</a></li>
              <li><a href={getAppPath('/privacidad')} className="footer__link">Aviso de privacidad</a></li>
              <li><a href={getAppPath('/cookies')} className="footer__link">Política de cookies</a></li>
            </ul>
          </div>

        </div>

        {/* Divisor */}
        <div className="footer__divider" />

        {/* Barra inferior */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {currentYear} <span className="gradient-text">{site.brandName || site.name}</span>.
            Todos los derechos reservados.
          </p>
          <p className="footer__made">
            Hecho con <span className="footer__heart">❤️</span> y mucho ☕ desde el espacio
          </p>
        </div>

      </div>

      {/* ── Botón volver arriba ── */}
      <button
        className={`footer__top-btn ${showTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
        title="Volver arriba"
      >
        🚀
      </button>

    </footer>
  );
};

export default Footer;