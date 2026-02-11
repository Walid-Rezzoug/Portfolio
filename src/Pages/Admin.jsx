import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/components.css';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
        if (isAuthenticated !== 'true') {
            navigate('/');
        }
    }, [navigate]);

    const [activeTab, setActiveTab] = useState('dashboard');
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [stats, setStats] = useState({
        projects: 0,
        messages: 0,
        skills: 0,
        experiences: 0,
        unreadMessages: 0
    });

    // États pour la gestion des expériences
    const [experiences, setExperiences] = useState([]);
    const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState(null);
    const [experienceForm, setExperienceForm] = useState({
        title: '',
        company: '',
        description: '',
        start_date: '',
        end_date: '',
        current_job: false,
        type: 'work'
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
        level: 5,
        icon: '💻'
    });

    // États pour les paramètres
    const [settingsForm, setSettingsForm] = useState({
        displayName: 'Walid Rezzoug',
        contactEmail: 'walid.rezzoug@example.com',
        shortDescription: 'Étudiant en L3 Informatique, développeur full-stack et chef de projet.'
    });

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (activeTab === 'dashboard') {
            fetchProjects();
            fetchMessages();
            fetchSkills();
            fetchExperiences();
        }
        if (activeTab === 'projects') fetchProjects();
        if (activeTab === 'messages') fetchMessages();
        if (activeTab === 'skills') fetchSkills();
        if (activeTab === 'experiences') fetchExperiences();
    }, [activeTab]);

    useEffect(() => {
        setStats({
            projects: projects.length,
            messages: messages.length,
            skills: skills.length,
            experiences: experiences.length,
            unreadMessages: messages.filter(m => !m.read_status).length
        });
    }, [projects, messages, skills, experiences]);

    const fetchStats = () => {
        // Cette fonction est maintenant gérée par le useEffect ci-dessus
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8000/projects');
            setProjects(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setProjects([]);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/contact');
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

    const markAsRead = async (messageId) => {
        try {
            await axios.put(`http://localhost:8000/contact/${messageId}`, { read_status: true });
            fetchMessages();
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const deleteMessage = async (messageId) => {
        if (window.confirm('Supprimer ce message ?')) {
            try {
                await axios.delete(`http://localhost:8000/contact/${messageId}`);
                fetchMessages();
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
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
                await axios.delete(`http://localhost:8000/projects/${id}`);
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
                await axios.put(`http://localhost:8000/projects/${editingProject.id}`, projectForm);
            } else {
                await axios.post('http://localhost:8000/projects', projectForm);
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
            const response = await axios.get('http://localhost:8000/skills');
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
            level: 5,
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
                await axios.delete(`http://localhost:8000/skills/${id}`);
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
                await axios.put(`http://localhost:8000/skills/${editingSkill.id}`, skillForm);
            } else {
                await axios.post('http://localhost:8000/skills', skillForm);
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

    const fetchExperiences = async () => {
        try {
            const response = await axios.get('http://localhost:8000/experiences');
            setExperiences(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching experiences:', error);
            setExperiences([]);
        }
    };

    const openAddExperienceModal = () => {
        setEditingExperience(null);
        setExperienceForm({
            title: '',
            company: '',
            description: '',
            start_date: '',
            end_date: '',
            current_job: false,
            type: 'work'
        });
        setIsExperienceModalOpen(true);
    };

    const openEditExperienceModal = (exp) => {
        setEditingExperience(exp);
        setExperienceForm({
            title: exp.title,
            company: exp.company,
            description: exp.description,
            start_date: exp.start_date,
            end_date: exp.end_date || '',
            current_job: exp.current_job || false,
            type: exp.type
        });
        setIsExperienceModalOpen(true);
    };

    const handleDeleteExperience = async (id) => {
        if (window.confirm('Supprimer cette expérience ?')) {
            try {
                await axios.delete(`http://localhost:8000/experiences/${id}`);
                fetchExperiences();
            } catch (error) {
                console.error('Error deleting experience:', error);
                alert('Erreur lors de la suppression.');
            }
        }
    };

    const handleSaveExperience = async (e) => {
        e.preventDefault();
        try {
            if (editingExperience) {
                await axios.put(`http://localhost:8000/experiences/${editingExperience.id}`, experienceForm);
            } else {
                await axios.post('http://localhost:8000/experiences', experienceForm);
            }
            setIsExperienceModalOpen(false);
            fetchExperiences();
        } catch (error) {
            console.error('Error saving experience:', error);
            alert('Erreur lors de l\'enregistrement.');
        }
    };

    const handleExperienceFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setExperienceForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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
        { id: 'dashboard', label: 'Tableau de bord', icon: <i className="fi fi-rr-apps"></i> },
        { id: 'projects', label: 'Projets', icon: <i className="fi fi-rr-folder"></i> },
        { id: 'experiences', label: 'Expériences', icon: <i className="fi fi-rr-briefcase"></i> },
        { id: 'messages', label: 'Messages', icon: <i className="fi fi-rr-envelope"></i> },
        { id: 'skills', label: 'Compétences', icon: <i className="fi fi-rr-bulb"></i> },
        { id: 'stats', label: 'Statistiques', icon: <i className="fi fi-rr-stats"></i> },
        { id: 'settings', label: 'Paramètres', icon: <i className="fi fi-rr-settings"></i> }
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="header-left">
                    <button className="toggle-sidebar-btn" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
                        {isSidebarCollapsed ? '➡️' : '⬅️'}
                    </button>
                    <div className="breadcrumb">
                        <span className="breadcrumb-main">Admin</span>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-current">
                            {adminTabs.find(t => t.id === activeTab)?.label}
                        </span>
                    </div>
                </div>
                <div className="header-right">
                    <div className="admin-search">
                        <input type="text" placeholder="Rechercher..." />
                        <span className="search-icon">🔍</span>
                    </div>
                </div>
            </div>

            <div className={`admin-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <aside className={`admin-sidebar ${isSidebarCollapsed ? 'mini' : ''}`}>
                    <div className="admin-profile">
                        <div className="profile-avatar">
                            <span>WR</span>
                        </div>
                        {!isSidebarCollapsed && (
                            <div className="profile-info">
                                <h3>Walid Rezzoug</h3>
                                <p>Administrateur</p>
                            </div>
                        )}
                    </div>

                    <nav className="admin-nav">
                        <ul className="nav-list">
                            {adminTabs.map(tab => (
                                <li key={tab.id}>
                                    <button
                                        className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        title={isSidebarCollapsed ? tab.label : ''}
                                    >
                                        <span className="nav-icon">{tab.icon}</span>
                                        {!isSidebarCollapsed && <span className="nav-label">{tab.label}</span>}
                                        {tab.id === 'messages' && stats.unreadMessages > 0 && (
                                            <span className="nav-badge">{stats.unreadMessages}</span>
                                        )}
                                    </button>
                                </li>
                            ))}
                            <li className="nav-separator"></li>
                            <li>
                                <a href="/" className="nav-btn logout">
                                    <span className="nav-icon"><i className="fi fi-rr-home"></i></span>
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
                                {['Frontend', 'Backend', 'Database', 'Tools', 'Soft Skills'].map(category => (
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
                                                            <span className="skill-level">{skill.level}/5</span>
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

                    {activeTab === 'experiences' && (
                        <div className="experiences-admin">
                            <div className="content-header">
                                <h2 className="content-title">Gestion des Expériences</h2>
                                <button className="add-btn" onClick={openAddExperienceModal}>
                                    <span className="btn-icon">💼</span>
                                    Ajouter une expérience
                                </button>
                            </div>

                            <div className="experiences-list-admin">
                                {Array.isArray(experiences) && experiences.length > 0 ? (
                                    experiences.map(exp => (
                                        <div key={exp.id} className="experience-admin-card">
                                            <div className="experience-admin-header">
                                                <div className="exp-info">
                                                    <span className="exp-type-icon">
                                                        {exp.type === 'education' ? '🎓' : exp.type === 'project_lead' ? '👨‍💼' : '💼'}
                                                    </span>
                                                    <h3>{exp.title}</h3>
                                                </div>
                                                <div className="experience-actions">
                                                    <button className="action-btn small" onClick={() => openEditExperienceModal(exp)}>✏️</button>
                                                    <button className="action-btn small delete" onClick={() => handleDeleteExperience(exp.id)}>🗑️</button>
                                                </div>
                                            </div>
                                            <p className="exp-company"><strong>{exp.company}</strong></p>
                                            <p className="exp-dates">
                                                {new Date(exp.start_date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })} -
                                                {exp.current_job ? ' Présent' : new Date(exp.end_date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-data">Aucune expérience trouvée.</p>
                                )}
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
                                        <option value="Database">Database</option>
                                        <option value="Tools">Tools</option>
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
                                <label>Niveau ({skillForm.level}/5)</label>
                                <input
                                    type="range"
                                    name="level"
                                    min="1"
                                    max="5"
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

            {/* Modal d'Expérience */}
            {isExperienceModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingExperience ? 'Modifier l\'expérience' : 'Ajouter une expérience'}</h2>
                            <button className="close-btn" onClick={() => setIsExperienceModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSaveExperience} className="modal-form">
                            <div className="form-group">
                                <label>Titre / Poste</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={experienceForm.title}
                                    onChange={handleExperienceFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Entreprise / Institution</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={experienceForm.company}
                                    onChange={handleExperienceFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select
                                    name="type"
                                    value={experienceForm.type}
                                    onChange={handleExperienceFormChange}
                                    required
                                >
                                    <option value="work">Expérience Pro</option>
                                    <option value="education">Éducation</option>
                                    <option value="project_lead">Leadership Projet</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={experienceForm.description}
                                    onChange={handleExperienceFormChange}
                                    rows="4"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date de début</label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={experienceForm.start_date}
                                        onChange={handleExperienceFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date de fin</label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={experienceForm.end_date}
                                        onChange={handleExperienceFormChange}
                                        disabled={experienceForm.current_job}
                                    />
                                </div>
                            </div>
                            <div className="form-group checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="current_job"
                                        checked={experienceForm.current_job}
                                        onChange={handleExperienceFormChange}
                                    />
                                    Poste actuel
                                </label>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsExperienceModalOpen(false)}>Annuler</button>
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