import { useState } from 'react'
import './Projects.css'

const Projects = ({ projects, loading }) => {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [failedImages, setFailedImages] = useState({})
  const categories = ['Todos', ...new Set(projects.map((project) => project.category).filter(Boolean))]

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">

        {/* ── Encabezado ── */}
        <div className="projects-header">
          <span className="section-badge">Portafolio</span>
          <h2 className="section-title">Nuestros Proyectos</h2>
        </div>

        {/* ── Filtros ── */}
        {projects.length > 0 && (
          <div className="filters-container">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Grid de proyectos ── */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id ?? project.title} className="project-card">

              {/* Imagen */}
              <div className="project-image-wrapper">
                {(project.image || project.image_url) && !failedImages[project.id] ? (
                  <img
                    src={project.image || project.image_url}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                    onError={() => setFailedImages((current) => ({
                      ...current,
                      [project.id]: true,
                    }))}
                  />
                ) : (
                  <div className="project-image-fallback">
                    <span aria-hidden="true">✦</span>
                    <small>Imagen próximamente</small>
                  </div>
                )}
                {project.featured && (
                  <span className="featured-badge">⭐ Destacado</span>
                )}
              </div>

              {/* Contenido */}
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Tecnologías */}
                <div className="project-tech">
                  {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, i) => (
                    <span key={i} className="tech-tag">{typeof tech === 'string' ? tech : tech.name}</span>
                  ))}
                </div>

                {/* Links */}
                {(project.demoUrl || project.demo_url || project.githubUrl || project.github_url) && (
                  <div className="project-links">
                    {(project.demoUrl || project.demo_url) && (
                      <a
                        href={project.demoUrl || project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn btn-demo"
                      >
                        Ver Demo
                      </a>
                    )}
                    {(project.githubUrl || project.github_url) && (
                      <a
                        href={project.githubUrl || project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn btn-code"
                      >
                        Código
                      </a>
                    )}
                  </div>
                )}
              </div>

            </article>
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {!loading && filteredProjects.length === 0 && (
          <p className="no-results" role="status">
            {projects.length === 0
              ? 'Aún no hay proyectos publicados.'
              : 'No hay proyectos en esta categoría.'}
          </p>
        )}

      </div>
    </section>
  )
}

export default Projects