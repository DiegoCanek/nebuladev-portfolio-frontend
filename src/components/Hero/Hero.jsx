// src/components/Hero/Hero.jsx
import './Hero.css';

const Hero = ({ site, stats }) => {

  // ── Scroll suave ──────────────────────────────────
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 70;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">

      <div className="hero-container">

        {/* ── CONTENIDO IZQUIERDO ────────────────── */}
        <div className="hero-content">

          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Agencia de desarrollo digital 🌌
          </div>

          {/* Textos */}
          <p className="hero-greeting">Bienvenidos a</p>
          <h1 className="hero-name">{site.brandName || site.name}</h1>
          <h2 className="hero-title">{site.headline}</h2>
          <p className="hero-description">{site.description}</p>

          {/* Botones */}
          <div className="hero-buttons">
            <button
              className="hero-btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              Ver Proyectos 🚀
            </button>
            <button
              className="hero-btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              Contáctanos 📬
            </button>
          </div>

          {stats.length > 0 && <div className="hero-stats">
            {stats.map((stat) => (
              <div className="hero-stat" key={stat.id}>
                <span className="hero-stat-number">{stat.value}</span>
                <span className="hero-stat-icon">{stat.icon}</span>
                <span className="hero-stat-label">{stat.shortLabel}</span>
              </div>
            ))}
          </div>}
        </div>

        {/* ── PLANETA DERECHO ──────────────────────── */}
        <div className="hero-visual">
          <div className="hero-planet">

            <div className="planet-orbit orbit-1" />
            <div className="planet-orbit orbit-2" />
            <div className="planet-orbit orbit-3" />

            <div className="planet-satellite satellite-1">🛸</div>
            <div className="planet-satellite satellite-2">⭐</div>
            <div className="planet-satellite satellite-3">💻</div>

            <div className="planet-body">
              <span className="planet-emoji">🌐</span>
            </div>

          </div>
        </div>

      </div>

      {/* ── SCROLL ───────────────────────────────── */}
      <button
        className="hero-scroll"
        onClick={() => scrollToSection('about')}
        aria-label="Ir a la siguiente sección"
      >
        <span>Scroll</span>
        <span className="hero-scroll-arrow">↓</span>
      </button>

    </section>
  );
};

export default Hero;