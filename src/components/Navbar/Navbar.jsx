import { useState, useEffect } from 'react';
import { navLinks as defaultNavLinks } from '../../data/portfolioData';
import { getAppPath } from '../../utils/sitePaths';
import './Navbar.css';

const Navbar = ({ site, navigation }) => {
  const navLinks = Array.isArray(navigation) ? navigation : defaultNavLinks;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // ============================================
  // DETECTAR SCROLL
  // ============================================
  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        setIsScrolled(window.scrollY > 50);

        const sections = navLinks.map((link) => link.id);
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [navLinks]);

  // ============================================
  // BLOQUEAR SCROLL CUANDO MENÚ MÓVIL ESTÁ ABIERTO
  // ============================================
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // ============================================
  // SCROLL A SECCIÓN
  // ============================================
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 70;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.location.href = getAppPath(`#${id}`);
    }
    setIsMenuOpen(false);
  };

  // ============================================
  // CERRAR MENÚ CON TECLA ESC
  // ============================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* ============================================
          NAVBAR PRINCIPAL
          ============================================ */}
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">

          {/* LOGO */}
          <div
            className="navbar__logo"
            onClick={() => scrollToSection('hero')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollToSection('hero')}
            aria-label="Ir al inicio"
          >
            <span className="navbar__logo-icon">🚀</span>
            <span className="navbar__logo-text">{site.name}</span>
          </div>

          {/* MENÚ DESKTOP */}
          <ul className="navbar__menu" role="menubar">
            {navLinks.map((link) => (
              <li key={link.id} role="none">
                <button
                  className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                  onClick={() => scrollToSection(link.id)}
                  role="menuitem"
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  <span className="navbar__link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* BOTÓN HAMBURGUESA */}
          <button
            className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="navbar__toggle-bar">
              <span />
              <span />
              <span />
            </div>
          </button>

        </div>
      </header>

      {/* ============================================
          OVERLAY - CIERRA EL MENÚ AL HACER CLIC FUERA
          ============================================ */}
      {isMenuOpen && (
        <div
          className="navbar__mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ============================================
          MENÚ MÓVIL
          ============================================ */}
      <nav
        id="mobile-menu"
        className={`navbar__mobile-menu ${isMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
        aria-label="Menú de navegación móvil"
        aria-hidden={!isMenuOpen}
      >
        {/* Estrellitas decorativas */}
        <div className="navbar__mobile-stars" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        {/* Logo dentro del menú móvil */}
        <div className="navbar__mobile-brand">
          <span className="navbar__mobile-brand-icon">🚀</span>
          <span className="navbar__mobile-brand-text">{site.name}</span>
        </div>

        {/* Links */}
        <ul className="navbar__mobile-list" role="menubar">
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              role="none"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                className={`navbar__mobile-link ${activeSection === link.id ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => scrollToSection(link.id)}
                role="menuitem"
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                <span className="navbar__mobile-link-icon">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer del menú móvil */}
        <p className="navbar__mobile-footer">
          ✨ Explorando el universo digital
        </p>
      </nav>
    </>
  );
};

export default Navbar;