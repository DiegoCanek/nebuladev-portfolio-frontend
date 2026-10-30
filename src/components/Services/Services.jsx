// src/components/Services/Services.jsx
import { useState } from 'react';
import './Services.css';

const Services = ({ services, loading }) => {
  const [activeService, setActiveService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveService(activeService === index ? null : index);
  };

  return (
    <section id="services" className="services-section">

      <div className="services-container">

        {/* Header */}
        <div className="services-header">
          <span className="services-label">⚡ Lo que hacemos</span>
          <h2 className="services-title">
            Nuestros <span className="services-title--highlight">Servicios</span>
          </h2>
        </div>

        {/* Grid de servicios */}
        <div className="services-grid-cards">
          {services.map((service, index) => (
            <div
              key={service.id ?? service.title}
              className={`service-card
                ${hoveredCard === index ? 'service-card--hovered' : ''}
                ${activeService === index ? 'service-card--active' : ''}`}
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Brillo de fondo */}
              <div className="service-card__glow" />

              {/* Icono */}
              <div className="service-card__icon-wrap">
                <span className="service-card__icon">{service.icon}</span>
                <div className="service-card__icon-ring" />
              </div>

              {/* Contenido */}
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>

                {/* Tags */}
                {Array.isArray(service.technologies) && (
                  <div className="service-card__tags">
                    {service.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="service-card__tag">{typeof tech === 'string' ? tech : tech.name}</span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className="service-card__tag service-card__tag--more">
                        +{service.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Detalle expandible */}
                <div
                  id={`service-detail-${service.id}`}
                  className={`service-card__detail
                  ${activeService === index ? 'service-card__detail--open' : ''}`}>
                  {Array.isArray(service.features) && (
                    <ul className="service-card__features">
                      {service.features.map((feature, i) => (
                        <li key={i} className="service-card__feature">
                          <span className="service-card__feature-dot">▸</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Botón */}
                <button
                  type="button"
                  className="service-card__toggle"
                  aria-expanded={activeService === index}
                  aria-controls={`service-detail-${service.id}`}
                >
                  {activeService === index ? '▲ Ver menos' : '▼ Ver más'}
                </button>
              </div>

              {/* Número decorativo */}
              <span className="service-card__number">0{index + 1}</span>
            </div>
          ))}
        </div>
        {!loading && services.length === 0 && (
          <p className="services-subtitle" role="status">No hay servicios publicados todavía.</p>
        )}

        {/* CTA */}
        <div className="services-cta">
          <p className="services-cta__text">¿No encuentras lo que necesitas?</p>
          <a href="#contact" className="services-cta__btn">
            🚀 Hablemos de tu proyecto
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;