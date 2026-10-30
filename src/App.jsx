// src/App.jsx
import { useEffect, useRef } from 'react';
import Navbar    from './components/Navbar/index';
import Hero      from './components/Hero/index';
import About     from './components/About/index';
import Services  from './components/Services/index';
import Projects  from './components/Projects/index';
import Technologies from './components/Technologies/index';
import Contact   from './components/Contact/index';
import Footer    from './components/Footer/index';
import InfoPage from './components/InfoPage/InfoPage';
import CookieNotice from './components/CookieNotice/CookieNotice';
import NotFound from './components/NotFound/NotFound';
import { getRoutePath } from './utils/sitePaths';
import {
  companyInfo,
  companyStats,
  navLinks,
  projects,
  services,
  teamMembers,
  technologies,
} from './data/portfolioData';
import './App.css';

const site = { ...companyInfo, teamMembers };
const pathname = getRoutePath(window.location.pathname);
const isHomePage = pathname === '/';
const isContactPage = pathname === '/contacto';
const isLegalPage = ['/terminos', '/privacidad', '/cookies'].includes(pathname);
const isKnownPage = isHomePage || isContactPage || isLegalPage;

function App() {
  const starsRef = useRef(null);

  useEffect(() => {
    const pageTitles = {
      '/terminos': 'Términos de uso',
      '/privacidad': 'Aviso de privacidad',
      '/cookies': 'Política de cookies',
      '/contacto': 'Contacto',
    };
    const title = !isKnownPage
      ? `404 | ${companyInfo.name}`
      : pageTitles[pathname]
      ? `${pageTitles[pathname]} | ${companyInfo.name}`
      : companyInfo.brandName || companyInfo.name;
    const description = !isKnownPage
      ? `La página solicitada no existe en ${companyInfo.name}.`
      : pageTitles[pathname]
      ? `${pageTitles[pathname]} de ${companyInfo.name}.`
      : companyInfo.description;
    if (title) document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    }
    if (title) document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    if (companyInfo.name) document.querySelector('meta[name="author"]')?.setAttribute('content', companyInfo.name);
  }, []);

  // ── Generar estrellas globales ──────────────────────
  useEffect(() => {
    if (!starsRef.current) return;
    const container = starsRef.current;
    container.innerHTML = '';

    for (let i = 0; i < 72; i++) {
      const star = document.createElement('div');
      star.classList.add('global-star');
      const size = Math.random() * 2.5 + 0.5;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        --duration: ${Math.random() * 3 + 2}s;
        --delay: ${Math.random() * 5}s;
      `;
      container.appendChild(star);
    }
  }, []);

  return (
    <div className="app">

      {/* ── FONDO GLOBAL (detrás de todo) ── */}
      <div className="global-bg">
        <div className="global-stars" ref={starsRef} />
        <div className="global-nebula global-nebula-1" />
        <div className="global-nebula global-nebula-2" />
      </div>

      {/* ── CONTENIDO ── */}
      <Navbar site={site} navigation={navLinks} />
      {isHomePage ? (
        <>
          <main>
            <Hero site={site} stats={companyStats} />
            <About site={site} stats={companyStats} />
            <Services services={services} />
            <Projects projects={projects} />
            <Technologies skills={technologies} />
            <Contact site={site} />
          </main>
        </>
      ) : (
        <>
          {isContactPage ? (
            <main><Contact site={site} /></main>
          ) : isLegalPage ? (
            <InfoPage pathname={pathname} />
          ) : (
            <NotFound />
          )}
        </>
      )}
      <Footer site={site} navigation={navLinks} services={services} />
      <CookieNotice />

    </div>
  );
}

export default App;