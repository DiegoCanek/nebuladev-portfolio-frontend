// src/components/About/About.jsx
import { useEffect, useState } from 'react';
import './About.css';

const getCardsVisible = () => {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

const getRoleClass = (role) => {
  const classes = {
    'Frontend Developer': 'role-frontend',
    'Backend Developer': 'role-backend',
    'Full Stack Developer': 'role-fullstack',
    'DevOps Engineer': 'role-devops',
    'UI/UX Designer & Dev': 'role-uiux',
    'Mobile Developer': 'role-mobile',
  };

  return classes[role] ?? '';
};

const About = ({ site, stats }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(getCardsVisible);
  const teamMembers = site.teamMembers;

  useEffect(() => {
    const update = () => {
      const visible = getCardsVisible();
      setCardsVisible(visible);
      setCurrentIndex(index => Math.min(index, Math.max(0, teamMembers.length - visible)));
    };

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [teamMembers.length]);

  const maxIndex = Math.max(0, teamMembers.length - cardsVisible);
  const handlePrev = () => setCurrentIndex(p => Math.max(0, p - 1));
  const handleNext = () => setCurrentIndex(p => Math.min(maxIndex, p + 1));

  return (
    <section id="about" className="about-section">
      <div className="about-container">

        {/* ── HEADER ── */}
        <div className="about-header">
          <span className="about-label">✦ Quiénes Somos</span>
          <h2 className="about-title">
            Exploradores del
            <span className="about-title--highlight"> universo digital</span>
          </h2>
          <p className="about-subtitle">{site.description}</p>
        </div>

        {/* ── CONTENIDO PRINCIPAL ── */}
        <div className="about-content">

          {/* Misión / Visión / Valores */}
          <div className="about-text">
            {[
              { icon: '🎯', title: 'Nuestra Misión', text: site.mission },
              { icon: '🌌', title: 'Nuestra Visión', text: site.vision },
              { icon: '💫', title: 'Nuestros Valores', text: site.values },
            ].map(({ icon, title, text }) => (
              <div className="about-mission" key={title}>
                <div className="about-mission__icon">{icon}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual planeta */}
          <div className="about-visual animate-on-scroll">
            <div className="about-planet">
              <div className="about-planet__core">
                <span className="about-planet__emoji">🚀</span>
              </div>
              <div className="about-planet__ring about-planet__ring--1" />
              <div className="about-planet__ring about-planet__ring--2" />
              <div className="about-planet__ring about-planet__ring--3" />
              <div className="about-orbit about-orbit--1">
                <div className="about-orbit__dot">⚛️</div>
              </div>
              <div className="about-orbit about-orbit--2">
                <div className="about-orbit__dot">🐍</div>
              </div>
              <div className="about-orbit about-orbit--3">
                <div className="about-orbit__dot">🎨</div>
              </div>
            </div>
            <div className="about-founded">
              <span className="about-founded__year">{site.founded}</span>
              <span className="about-founded__label">Año de fundación</span>
            </div>
          </div>

        </div>

        {/* ── STATS ── */}
        {stats.length > 0 && <div className="about-stats">
          {stats.map((stat, i) => (
            <div
              key={stat.id ?? stat.label ?? i}
              className="about-stat"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="about-stat__icon">{stat.icon}</span>
              <span className="about-stat__number">{stat.value}</span>
              <span className="about-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>}

        {/* ══════════════════════════════════════
            ── SECCIÓN EQUIPO ──
        ══════════════════════════════════════ */}
        {teamMembers.length > 0 ? (
        <div className="team-section">

          {/* Encabezado equipo */}
          <div className="team-header">
            <span className="team-label">👥 Las personas detrás del código</span>
            <h3 className="team-title">Nuestro <span className="team-title--highlight">Equipo</span></h3>
            <p className="team-subtitle">
              Un grupo de apasionados exploradores digitales comprometidos
              con crear experiencias extraordinarias
            </p>
          </div>

          {/* Carousel wrapper */}
          <div className="team-carousel-wrapper">

            {/* Botón anterior */}
            <button
              className="team-arrow team-arrow--prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Anterior"
            >
              <span>‹</span>
            </button>

            {/* Viewport */}
            <div className="team-viewport">
              <div
                className="team-track"
                style={{
                  width: `${(teamMembers.length / cardsVisible) * 100}%`,
                  transform: `translateX(-${(currentIndex / teamMembers.length) * 100}%)`,
                }}
              >
                {teamMembers.map(member => (
                  <article
                    className="team-card"
                    key={member.id ?? member.name}
                    style={{ flex: `0 0 ${100 / teamMembers.length}%` }}
                  >
                    <div className="team-card__inner">
                      <div className="team-avatar">
                        {(member.avatar || member.avatar_url) ? (
                          <img src={member.avatar || member.avatar_url} alt={member.name} loading="lazy" />
                        ) : (
                          <span aria-hidden="true">{member.name?.charAt(0) || '•'}</span>
                        )}
                      </div>

                      <h4 className="team-name">{member.name}</h4>
                      <span className={`team-role ${getRoleClass(member.role)}`}>
                        {member.role}
                      </span>
                      <p className="team-bio">{member.bio}</p>

                      <div className="team-skills">
                        {(Array.isArray(member.skills) ? member.skills : []).map(skill => (
                          <span key={skill} className="skill-badge">{skill}</span>
                        ))}
                      </div>

                      {(member.social?.github || member.github_url
                        || member.social?.linkedin || member.linkedin_url
                        || member.social?.twitter || member.twitter_url) && (
                      <div className="team-social">
                        {(member.social?.github || member.github_url) && (
                          <a href={member.social?.github || member.github_url} target="_blank" rel="noreferrer"
                             className="social-link" aria-label={`${member.name} en GitHub`}>
                            GH
                          </a>
                        )}
                        {(member.social?.linkedin || member.linkedin_url) && (
                          <a href={member.social?.linkedin || member.linkedin_url} target="_blank" rel="noreferrer"
                             className="social-link" aria-label={`${member.name} en LinkedIn`}>
                            in
                          </a>
                        )}
                        {(member.social?.twitter || member.twitter_url) && (
                          <a href={member.social?.twitter || member.twitter_url} target="_blank" rel="noreferrer"
                             className="social-link" aria-label={`${member.name} en Twitter`}>
                            tw
                          </a>
                        )}
                      </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Botón siguiente */}
            <button
              className="team-arrow team-arrow--next"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Siguiente"
            >
              <span>›</span>
            </button>

          </div>

          {/* Indicadores dots */}
          {maxIndex > 0 && (
            <div className="team-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`team-dot ${i === currentIndex ? 'team-dot--active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Grupo ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Contador */}
          <p className="team-counter">
            {currentIndex + 1} / {maxIndex + 1}
          </p>

          </div>
          ) : null}
      </div>
    </section>
  );
};

export default About;