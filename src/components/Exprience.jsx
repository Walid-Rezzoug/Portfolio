import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/components.css';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const response = await axios.get('http://localhost:8000/experiences');
            setExperiences(response.data);
        } catch (error) {
            console.error('Error fetching experiences:', error);
            // Données de démo
            setExperiences([
                {
                    id: 1,
                    title: 'Chef de Projet Développement Web',
                    company: 'Projet Académique',
                    description: 'Lead d\'une équipe de 4 développeurs sur un projet de gestion de bibliothèque universitaire',
                    start_date: '2024-09-01',
                    end_date: '2025-02-15',
                    current_job: false,
                    type: 'project_lead'
                },
                {
                    id: 2,
                    title: 'Étudiant en Licence Informatique',
                    company: 'Université',
                    description: 'Licence en Informatique avec spécialisation en développement web et gestion de projet',
                    start_date: '2023-09-01',
                    end_date: null,
                    current_job: true,
                    type: 'education'
                }
            ]);
        }
    };

    const filteredExperiences = Array.isArray(experiences)
        ? (activeTab === 'all' ? experiences : experiences.filter(exp => exp.type === activeTab))
        : [];

    const formatDate = (dateString) => {
        if (!dateString) return 'Présent';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'project_lead': return '👨‍💼';
            case 'education': return '🎓';
            case 'work': return '💼';
            default: return '📋';
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'project_lead': return 'Leadership Projet';
            case 'education': return 'Éducation';
            case 'work': return 'Expérience Pro';
            default: return 'Autre';
        }
    };

    return (
        <section id="experience" className="experience-section">
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">Parcours & Expérience</h2>
                    <div className="section-divider"></div>
                    <p className="section-subtitle">
                        Mon parcours académique et mes expériences de leadership
                    </p>
                </div>

                <div className="experience-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        Toutes les expériences
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'project_lead' ? 'active' : ''}`}
                        onClick={() => setActiveTab('project_lead')}
                    >
                        Leadership Projet
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                        onClick={() => setActiveTab('education')}
                    >
                        Formation
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
                        onClick={() => setActiveTab('work')}
                    >
                        Expérience Pro
                    </button>
                </div>

                <div className="experience-timeline">
                    {filteredExperiences.map((exp, index) => (
                        <div key={exp.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <div className="type-badge">
                                        <span className="type-icon">{getTypeIcon(exp.type)}</span>
                                        <span className="type-label">{getTypeLabel(exp.type)}</span>
                                    </div>
                                    <h3 className="timeline-title">{exp.title}</h3>
                                    <h4 className="timeline-company">{exp.company}</h4>
                                </div>

                                <div className="timeline-body">
                                    <p className="timeline-description">{exp.description}</p>

                                    <div className="timeline-dates">
                                        <span className="date-start">
                                            📅 {formatDate(exp.start_date)}
                                        </span>
                                        <span className="date-arrow">→</span>
                                        <span className={`date-end ${exp.current_job ? 'current' : ''}`}>
                                            {exp.current_job ? '🚀 En cours' : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                </div>

                                <div className="timeline-footer">
                                    {exp.current_job && (
                                        <span className="current-badge">Expérience actuelle</span>
                                    )}
                                    {exp.type === 'project_lead' && (
                                        <span className="lead-badge">Rôle de leadership</span>
                                    )}
                                </div>
                            </div>
                            <div className="timeline-marker">
                                <div className="marker-dot"></div>
                                <div className="marker-line"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredExperiences.length === 0 && (
                    <div className="no-experience">
                        <p>Aucune expérience à afficher pour cette catégorie.</p>
                    </div>
                )}

                <div className="leadership-highlight">
                    <h3>Compétences en Gestion de Projet</h3>
                    <div className="leadership-skills">
                        <div className="leadership-skill">
                            <span className="skill-icon">📋</span>
                            <span className="skill-name">Planification</span>
                        </div>
                        <div className="leadership-skill">
                            <span className="skill-icon">👥</span>
                            <span className="skill-name">Coordination d'équipe</span>
                        </div>
                        <div className="leadership-skill">
                            <span className="skill-icon">⏱️</span>
                            <span className="skill-name">Gestion du temps</span>
                        </div>
                        <div className="leadership-skill">
                            <span className="skill-icon">💬</span>
                            <span className="skill-name">Communication</span>
                        </div>
                        <div className="leadership-skill">
                            <span className="skill-icon">🎯</span>
                            <span className="skill-name">Définition d'objectifs</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;