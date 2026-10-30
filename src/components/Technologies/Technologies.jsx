// src/components/Technologies/Technologies.jsx
import { useState, useEffect, useRef } from 'react';
import './Technologies.css';

const Technologies = ({ skills, loading }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Categorías únicas
  const categories = ['Todos', ...new Set(skills.map(t => t.category).filter(Boolean))];

  // Filtrar tecnologías
  const filtered = activeCategory === 'Todos'
    ? skills
    : skills.filter(t => t.category === activeCategory);

  // Activar animación al entrar en vista
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Completar la animación al cambiar de categoría.
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Color por categoría
  const getCategoryColor = (category) => {
    const colors = {
      Frontend: 'var(--nebula-purple)',
      Backend:  'var(--nebula-blue)',
      Database: 'var(--nebula-pink)',
      DevOps:   'var(--star-gold)',
    };
    return colors[category] || 'var(--nebula-purple)';
  };

  return (
    <section className="technologies" id="technologies" ref={sectionRef}>

      {/* Fondo espacial */}
      <div className="technologies__bg">
        <div className="tech__nebula tech__nebula--1" />
        <div className="tech__nebula tech__nebula--2" />
      </div>

      <div className="technologies__container">

        {/* Encabezado */}
        <div className="technologies__header">
          <span className="technologies__label">⚡ Stack Tecnológico</span>
          <h2 className="technologies__title">
            Nuestras <span className="gradient-text">Herramientas</span>
          </h2>
          <p className="technologies__subtitle">
            Tecnologías registradas en el perfil.
          </p>
        </div>

        {/* Filtros */}
        <div className="technologies__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`tech__filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                if (activeCategory !== cat) setAnimated(false);
                setActiveCategory(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de tecnologías */}
        <div className="technologies__grid">
          {filtered.map((tech, index) => (
            <div
              key={tech.name}
              className="tech__card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header de la card */}
              <div className="tech__card-header">
                <span className="tech__icon">{tech.icon}</span>
                <div className="tech__info">
                  <h3 className="tech__name">{tech.name}</h3>
                  <span
                    className="tech__category-badge"
                    style={{ backgroundColor: getCategoryColor(tech.category) + '33',
                             color: getCategoryColor(tech.category) }}
                  >
                    {tech.category}
                  </span>
                </div>
                {Number.isFinite(Number(tech.level)) && tech.level !== null && tech.level !== '' && (
                  <span className="tech__percentage">{tech.level}%</span>
                )}
              </div>

              {/* Barra de progreso */}
              {Number.isFinite(Number(tech.level)) && tech.level !== null && tech.level !== '' && (
                <div className="tech__progress-track">
                  <div
                    className="tech__progress-bar"
                    style={{
                      width: animated ? `${tech.level}%` : '0%',
                      backgroundColor: getCategoryColor(tech.category),
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {!loading && skills.length === 0 && (
          <p className="technologies__subtitle" role="status">No hay habilidades publicadas todavía.</p>
        )}

      </div>
    </section>
  );
};

export default Technologies;