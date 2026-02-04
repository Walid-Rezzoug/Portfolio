import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/components.css';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [stats, setStats] = useState({
        projects: 0,
        messages: 0,
        skills: 0,
        unreadMessages: 0
    });

    // États pour la gestion des projets
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        technologies: '',
        github_url: '',
        live_url: '',
        image_url: '',
        featured: false
    });

    // États pour la gestion des compétences
    const [skills, setSkills] = useState([]);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [skillForm, setSkillForm] = useState({
        name: '',
        category: 'Frontend',
        level: 80,
        icon: '💻'
    });

    // États pour les paramètres
    const [settingsForm, setSettingsForm] = useState({
        displayName: 'Walid Rezzoug',
        contactEmail: 'walid.rezzoug@example.com',
        shortDescription: 'Étudiant en L3 Informatique, développeur full-stack et chef de projet.'
    });

    useEffect(() => {
        fetchStats();
        if (activeTab === 'projects') fetchProjects();
        if (activeTab === 'messages') fetchMessages();
        if (activeTab === 'skills') fetchSkills();
    }, [activeTab]);

    const fetchStats = async () => {
        try {
            // Pour l'instant, données de démo
            setStats({
                projects: 3,
                messages: 5,
                skills: 10,
                unreadMessages: 2
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost/backend/projects');
            setProjects(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjects([]);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost/backend/contact');
            setMessages(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            // Données de démo en cas d'erreur
            setMessages([
                {
                    id: 1,
                    name: 'Jean Dupont',
                    email: 'jean@example.com',
                    subject: 'Proposition de projet',
                    message: 'Bonjour, je suis intéressé par vos services...',
                    created_at: new Date().toISOString(),
                    read_status: false
                }
            ]);
        }
    };

    const markAsRead = (messageId) => {
        setMessages(messages.map(msg =>
            msg.id === messageId ? { ...msg, read_status: true } : msg
        ));
    };

    const deleteMessage = (messageId) => {
        setMessages(messages.filter(msg => msg.id !== messageId));
    };

    // Fonctions de gestion des projets
    const openAddProjectModal = () => {
        setEditingProject(null);
        setProjectForm({
            title: '',
            description: '',
            technologies: '',
            github_url: '',
            live_url: '',
            image_url: '',
            featured: false
        });
        setIsProjectModalOpen(true);
    };

    const openEditProjectModal = (project) => {
        setEditingProject(project);
        setProjectForm({
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            github_url: project.github_url || '',
            live_url: project.live_url || '',
            image_url: project.image_url || '',
            featured: project.featured || false
        });
        setIsProjectModalOpen(true);
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            try {
                await axios.delete(`http://localhost/backend/projects/${id}`);
                fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Erreur lors de la suppression.');
            }
        }
    };

    const handleSaveProject = async (e) => {
        e.preventDefault();
        try {
            if (editingProject) {
                await axios.put(`http://localhost/backend/projects/${editingProject.id}`, projectForm);
            } else {
                await axios.post('http://localhost/backend/projects', projectForm);
            }
            setIsProjectModalOpen(false);
            fetchProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Erreur lors de l\'enregistrement.');
        }
    };

    const handleProjectFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProjectForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const fetchSkills = async () => {
        try {
            const response = await axios.get('http://localhost/backend/skills');
            setSkills(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching skills:', error);
            setSkills([]);
        }
    };

    // Fonctions de gestion des compétences
    const openAddSkillModal = () => {
        setEditingSkill(null);
        setSkillForm({
            name: '',
            category: 'Frontend',
            level: 80,
            icon: '💻'
        });
        setIsSkillModalOpen(true);
    };

    const openEditSkillModal = (skill) => {
        setEditingSkill(skill);
        setSkillForm({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            icon: skill.icon
        });
        setIsSkillModalOpen(true);
    };

    const handleDeleteSkill = async (id) => {
        if (window.confirm('Supprimer cette compétence ?')) {
            try {
                await axios.delete(`http://localhost/backend/skills/${id}`);
                fetchSkills();
            } catch (error) {
                console.error('Error deleting skill:', error);
                alert('Erreur lors de la suppression.');
            }
        }
    };

    const handleSaveSkill = async (e) => {
        e.preventDefault();
        try {
            if (editingSkill) {
                await axios.put(`http://localhost/backend/skills/${editingSkill.id}`, skillForm);
            } else {
                await axios.post('http://localhost/backend/skills', skillForm);
            }
            setIsSkillModalOpen(false);
            fetchSkills();
        } catch (error) {
            console.error('Error saving skill:', error);
            alert('Erreur lors de l\'enregistrement.');
        }
    };

    const handleSkillFormChange = (e) => {
        const { name, value } = e.target;
        setSkillForm(prev => ({
            ...prev,
            [name]: name === 'level' ? parseInt(value) : value
        }));
    };

    // Fonctions pour les paramètres
    const handleSettingsChange = (e) => {
        const { name, value } = e.target;
        setSettingsForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveSettings = async () => {
        try {
            // Simulation de sauvegarde ou appel API futur
            console.log('Settings saved:', settingsForm);
            alert('Paramètres enregistrés avec succès !');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Erreur lors de la sauvegarde des paramètres.');
        }
    };

    const adminTabs = [
        { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
        { id: 'projects', label: 'Projets', icon: '📁' },
        { id: 'messages', label: 'Messages', icon: '✉️' },
        { id: 'skills', label: 'Compétences', icon: '💡' },
        { id: 'stats', label: 'Statistiques', icon: '📈' },
        { id: 'settings', label: 'Paramètres', icon: '⚙️' }
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1 className="admin-title">Administration du Portfolio</h1>
                <p className="admin-subtitle">Gérez votre contenu et vos messages</p>
            </div>

            <div className="admin-container">
                <aside className="admin-sidebar">
                    <div className="admin-profile">
                        <div className="profile-avatar">
                            <span>WR</span>
                        </div>
                        <div className="profile-info">
                            <h3>Walid Rezzoug</h3>
                            <p>Administrateur</p>
                        </div>
                    </div>

                    <nav className="admin-nav">
                        <ul className="nav-list">
                            {adminTabs.map(tab => (
                                <li key={tab.id}>
                                    <button
                                        className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <span className="nav-icon">{tab.icon}</span>
                                        <span className="nav-label">{tab.label}</span>
                                    </button>
                                </li>
                            ))}
                            <li className="nav-separator"></li>
                            <li>
                                <a href="/" className="nav-btn logout">
                                    <span className="nav-icon">🏠</span>
                                    <span className="nav-label">Retour au site</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="admin-status">
                        <div className="status-item">
                            <span className="status-label">Statut :</span>
                            <span className="status-value online">🟢 En ligne</span>
                        </div>
                        <div className="status-item">
                            <span className="status-label">Dernière connexion :</span>
                            <span className="status-value">Aujourd'hui</span>
                        </div>
                    </div>
                </aside>

                <main className="admin-content">
                    {activeTab === 'dashboard' && (
                        <div className="dashboard">
                            <h2 className="content-title">Tableau de bord</h2>

                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">📁</div>
                                    <div className="stat-content">
                                        <h3>{stats.projects}</h3>
                                        <p>Projets</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">✉️</div>
                                    <div className="stat-content">
                                        <h3>{stats.messages}</h3>
                                        <p>Messages</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">💡</div>
                                    <div className="stat-content">
                                        <h3>{stats.skills}</h3>
                                        <p>Compétences</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">📨</div>
                                    <div className="stat-content">
                                        <h3>{stats.unreadMessages}</h3>
                                        <p>Non lus</p>
                                    </div>
                                </div>
                            </div>

                            <div className="quick-actions">
                                <h3>Actions Rapides</h3>
                                <div className="actions-grid">
                                    <button className="action-btn" onClick={() => setActiveTab('projects')}>
                                        <span className="action-icon">➕</span>
                                        <span className="action-text">Ajouter un projet</span>
                                    </button>
                                    <button className="action-btn" onClick={() => setActiveTab('skills')}>
                                        <span className="action-icon">✏️</span>
                                        <span className="action-text">Modifier les compétences</span>
                                    </button>
                                    <button className="action-btn" onClick={() => setActiveTab('stats')}>
                                        <span className="action-icon">📈</span>
                                        <span className="action-text">Voir les statistiques</span>
                                    </button>
                                    <button className="action-btn" onClick={() => setActiveTab('settings')}>
                                        <span className="action-icon">🔄</span>
                                        <span className="action-text">Mettre à jour le profil</span>
                                    </button>
                                </div>
                            </div>

                            <div className="recent-activity">
                                <h3>Activité Récente</h3>
                                <div className="activity-list">
                                    <div className="activity-item">
                                        <span className="activity-icon">📅</span>
                                        <div className="activity-content">
                                            <p>Portfolio mis à jour le {new Date().toLocaleDateString('fr-FR')}</p>
                                            <span className="activity-time">Aujourd'hui</span>
                                        </div>
                                    </div>
                                    <div className="activity-item">
                                        <span className="activity-icon">✉️</span>
                                        <div className="activity-content">
                                            <p>Nouveau message de Jean Dupont</p>
                                            <span className="activity-time">Il y a 2 heures</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="projects-admin">
                            <div className="content-header">
                                <h2 className="content-title">Gestion des Projets</h2>
                                <button className="add-btn" onClick={openAddProjectModal}>
                                    <span className="btn-icon">➕</span>
                                    Ajouter un projet
                                </button>
                            </div>

                            <div className="projects-list">
                                {Array.isArray(projects) && projects.length > 0 ? (
                                    projects.map(project => (
                                        <div key={project.id} className="project-admin-card">
                                            <div className="project-admin-header">
                                                <h3>{project.title}</h3>
                                                <div className="project-actions">
                                                    <button className="action-btn small" onClick={() => openEditProjectModal(project)}>✏️</button>
                                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="action-btn small">👁️</a>
                                                    <button className="action-btn small delete" onClick={() => handleDeleteProject(project.id)}>🗑️</button>
                                                </div>
                                            </div>
                                            <p className="project-description">{project.description}</p>
                                            <div className="project-meta">
                                                <span className="meta-item">🔄 {new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
                                                {project.featured && (
                                                    <span className="meta-item featured">🌟 Projet principal</span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-data">Aucun projet trouvé.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="messages-admin">
                            <h2 className="content-title">Messages Reçus</h2>

                            <div className="messages-list">
                                {Array.isArray(messages) && messages.length > 0 ? (
                                    messages.map(message => (
                                        <div key={message.id} className={`message-card ${!message.read_status ? 'unread' : ''}`}>
                                            <div className="message-header">
                                                <div className="message-sender">
                                                    <span className="sender-name">{message.name}</span>
                                                    <span className="sender-email">{message.email}</span>
                                                </div>
                                                <div className="message-actions">
                                                    {!message.read_status && (
                                                        <button
                                                            onClick={() => markAsRead(message.id)}
                                                            className="action-btn small"
                                                        >
                                                            👁️ Marquer comme lu
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteMessage(message.id)}
                                                        className="action-btn small delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="message-body">
                                                <h4 className="message-subject">{message.subject}</h4>
                                                <p className="message-content">{message.message}</p>
                                            </div>

                                            <div className="message-footer">
                                                <span className="message-date">
                                                    📅 {new Date(message.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                                {!message.read_status && (
                                                    <span className="unread-badge">Nouveau</span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-data">Aucun message reçu.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div className="skills-admin">
                            <div className="content-header">
                                <h2 className="content-title">Gestion des Compétences</h2>
                                <button className="add-btn" onClick={openAddSkillModal}>
                                    <span className="btn-icon">💡</span>
                                    Ajouter une compétence
                                </button>
                            </div>

                            <div className="skills-admin-grid">
                                {['Frontend', 'Backend', 'Outils', 'Soft Skills'].map(category => (
                                    <div key={category} className="skill-category-admin">
                                        <h3>{category}</h3>
                                        <div className="skills-list-admin">
                                            {Array.isArray(skills) && skills
                                                .filter(s => s.category === category)
                                                .map(skill => (
                                                    <div key={skill.id} className="skill-admin-item">
                                                        <div className="skill-info">
                                                            <span className="skill-icon">{skill.icon}</span>
                                                            <span className="skill-name">{skill.name}</span>
                                                            <span className="skill-level">{skill.level}%</span>
                                                        </div>
                                                        <div className="skill-actions">
                                                            <button className="icon-btn" onClick={() => openEditSkillModal(skill)}>✏️</button>
                                                            <button className="icon-btn delete" onClick={() => handleDeleteSkill(skill.id)}>🗑️</button>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'stats' && (
                        <div className="stats-admin">
                            <h2 className="content-title">Analytique & Statistiques</h2>

                            <div className="stats-main-grid">
                                <div className="stats-chart-card">
                                    <h3>Visites du Portfolio (7 derniers jours)</h3>
                                    <div className="chart-placeholder">
                                        {[65, 45, 75, 50, 85, 95, 80].map((height, i) => (
                                            <div key={i} className="chart-bar-container">
                                                <div className="chart-bar" style={{ height: `${height}%` }}>
                                                    <span className="bar-value">{height}</span>
                                                </div>
                                                <span className="bar-label">{['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="stats-info-grid">
                                    <div className="mini-stat-card">
                                        <h4>Taux de conversion</h4>
                                        <div className="mini-stat-value">3.2%</div>
                                        <div className="mini-stat-change positive">↑ 12%</div>
                                    </div>
                                    <div className="mini-stat-card">
                                        <h4>Temps moyen / session</h4>
                                        <div className="mini-stat-value">2m 45s</div>
                                        <div className="mini-stat-change">stable</div>
                                    </div>
                                    <div className="mini-stat-card">
                                        <h4>Messages reçus</h4>
                                        <div className="mini-stat-value">{stats.messages}</div>
                                        <div className="mini-stat-change positive">↑ 2 ce mois</div>
                                    </div>
                                </div>
                            </div>

                            <div className="top-skills-stats">
                                <h3>Compétences les plus consultées</h3>
                                <div className="skills-stat-list">
                                    <div className="skill-stat-item">
                                        <span>React.js</span>
                                        <div className="stat-progress"><div className="progress-fill" style={{ width: '90%' }}></div></div>
                                        <span>90%</span>
                                    </div>
                                    <div className="skill-stat-item">
                                        <span>PHP / Laravel</span>
                                        <div className="stat-progress"><div className="progress-fill" style={{ width: '75%' }}></div></div>
                                        <span>75%</span>
                                    </div>
                                    <div className="skill-stat-item">
                                        <span>UI Design</span>
                                        <div className="stat-progress"><div className="progress-fill" style={{ width: '60%' }}></div></div>
                                        <span>60%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="settings-admin">
                            <h2 className="content-title">Paramètres</h2>
                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Nom d'affichage</label>
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={settingsForm.displayName}
                                        onChange={handleSettingsChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email de contact</label>
                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={settingsForm.contactEmail}
                                        onChange={handleSettingsChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description courte</label>
                                    <textarea
                                        name="shortDescription"
                                        value={settingsForm.shortDescription}
                                        onChange={handleSettingsChange}
                                    />
                                </div>
                                <button className="save-btn" onClick={handleSaveSettings}>
                                    💾 Enregistrer les modifications
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Modal de Projet */}
            {isProjectModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingProject ? 'Modifier le projet' : 'Ajouter un projet'}</h2>
                            <button className="close-btn" onClick={() => setIsProjectModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSaveProject} className="modal-form">
                            <div className="form-group">
                                <label>Titre</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={projectForm.title}
                                    onChange={handleProjectFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={projectForm.description}
                                    onChange={handleProjectFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Technologies (séparées par des virgules)</label>
                                <input
                                    type="text"
                                    name="technologies"
                                    value={projectForm.technologies}
                                    onChange={handleProjectFormChange}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Lien GitHub</label>
                                    <input
                                        type="url"
                                        name="github_url"
                                        value={projectForm.github_url}
                                        onChange={handleProjectFormChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Lien Live</label>
                                    <input
                                        type="url"
                                        name="live_url"
                                        value={projectForm.live_url}
                                        onChange={handleProjectFormChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>URL de l'image</label>
                                <input
                                    type="text"
                                    name="image_url"
                                    value={projectForm.image_url}
                                    onChange={handleProjectFormChange}
                                />
                            </div>
                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={projectForm.featured}
                                        onChange={handleProjectFormChange}
                                    />
                                    Mettre en avant ce projet
                                </label>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsProjectModalOpen(false)}>Annuler</button>
                                <button type="submit" className="btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Compétence */}
            {isSkillModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingSkill ? 'Modifier la compétence' : 'Ajouter une compétence'}</h2>
                            <button className="close-btn" onClick={() => setIsSkillModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSaveSkill} className="modal-form">
                            <div className="form-group">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={skillForm.name}
                                    onChange={handleSkillFormChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Catégorie</label>
                                    <select
                                        name="category"
                                        value={skillForm.category}
                                        onChange={handleSkillFormChange}
                                        required
                                    >
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Outils">Outils</option>
                                        <option value="Soft Skills">Soft Skills</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Icon (Emoji)</label>
                                    <input
                                        type="text"
                                        name="icon"
                                        value={skillForm.icon}
                                        onChange={handleSkillFormChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Niveau ({skillForm.level}%)</label>
                                <input
                                    type="range"
                                    name="level"
                                    min="0"
                                    max="100"
                                    value={skillForm.level}
                                    onChange={handleSkillFormChange}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsSkillModalOpen(false)}>Annuler</button>
                                <button type="submit" className="btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;