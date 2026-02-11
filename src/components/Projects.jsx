import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/components.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            // Données de démo en cas d'erreur
            setProjects([
                {
                    id: 1,
                    title: 'Portfolio Professionnel',
                    description: 'Site portfolio complet avec React et PHP',
                    technologies: 'React, PHP, MySQL, Ant Design',
                    github_url: 'https://github.com/walid/portfolio',
                    live_url: '',
                    featured: true
                },
                {
                    id: 2,
                    title: 'Application de Gestion de Tâches',
                    description: 'Application web de gestion de projets en équipe',
                    technologies: 'React, Node.js, MongoDB',
                    github_url: 'https://github.com/walid/task-manager',
                    live_url: '',
                    featured: true
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const getTechArray = (techString) => {
        return techString ? techString.split(',').map(t => t.trim()) : [];
    };

    const filteredProjects = Array.isArray(projects)
        ? (filter === 'all' ? projects : projects.filter(project => project.featured))
        : [];

    return (
        <section id="projects" className="projects-section">
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">Mes Projets</h2>
                    <div className="section-divider"></div>
                    <p className="section-subtitle">
                        Découvrez une sélection de mes réalisations techniques
                    </p>
                </div>

                <div className="projects-filter">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Tous les projets
                    </button>
                    <button
                        className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
                        onClick={() => setFilter('featured')}
                    >
                        Projets principaux
                    </button>
                </div>

                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Chargement des projets...</p>
                    </div>
                ) : (
                    <div className="projects-grid">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
                                <div className="project-header">
                                    <h3 className="project-title">{project.title}</h3>
                                    {project.featured && (
                                        <span className="featured-badge">🌟 Projet Principal</span>
                                    )}
                                </div>

                                <div className="project-body">
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-technologies">
                                        <h4>Technologies utilisées :</h4>
                                        <div className="tech-tags">
                                            {getTechArray(project.technologies).map((tech, index) => (
                                                <span key={index} className="tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="project-footer">
                                    <div className="project-links">
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link github"
                                            >
                                                <span className="link-icon">📂</span>
                                                Code Source
                                            </a>
                                        )}
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link live"
                                            >
                                                <span className="link-icon">🚀</span>
                                                Voir le projet
                                            </a>
                                        )}
                                    </div>
                                    <div className="project-date">
                                        {project.created_at && (
                                            <span className="date-text">
                                                📅 {new Date(project.created_at).toLocaleDateString('fr-FR')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredProjects.length === 0 && (
                    <div className="no-projects">
                        <p>Aucun projet à afficher pour le moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;