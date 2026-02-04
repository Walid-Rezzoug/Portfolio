import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/components.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await axios.get('http://localhost/backend/skills');
            setSkills(response.data);

            // Extraire les catégories uniques
            const uniqueCategories = [...new Set(response.data.map(skill => skill.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching skills:', error);
            const demoSkills = [
                { id: 1, name: 'React.js', category: 'Frontend', level: 4, icon: '⚛️' },
                { id: 2, name: 'JavaScript', category: 'Frontend', level: 4, icon: '📜' },
                { id: 3, name: 'HTML5 & CSS3', category: 'Frontend', level: 5, icon: '🎨' },
                { id: 4, name: 'PHP', category: 'Backend', level: 4, icon: '🐘' },
                { id: 5, name: 'Node.js', category: 'Backend', level: 3, icon: '🟢' },
                { id: 6, name: 'MySQL', category: 'Database', level: 4, icon: '🐬' },
                { id: 7, name: 'MongoDB', category: 'Database', level: 3, icon: '🍃' },
                { id: 8, name: 'Git & GitHub', category: 'Tools', level: 4, icon: '📂' },
                { id: 9, name: 'Gestion de Projet', category: 'Soft Skills', level: 4, icon: '📊' },
                { id: 10, name: 'Leadership', category: 'Soft Skills', level: 4, icon: '👥' }
            ];
            setSkills(demoSkills);
            setCategories([...new Set(demoSkills.map(skill => skill.category))]);
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'Frontend': '💻',
            'Backend': '⚙️',
            'Database': '🗄️',
            'Language': '📝',
            'Tools': '🛠️',
            'Soft Skills': '🌟'
        };
        return icons[category] || '🔧';
    };

    return (
        <section id="skills" className="skills-section">
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">Mes Compétences</h2>
                    <div className="section-divider"></div>
                    <p className="section-subtitle">
                        Un aperçu de mon expertise technique en développement web et mes outils de prédilection
                    </p>
                </div>

                <div className="skills-container">
                    {categories.map(category => (
                        <div key={category} className="skill-category">
                            <h3>
                                <span className="category-icon">{getCategoryIcon(category)}</span>
                                {category}
                            </h3>
                            <div className="skills-grid">
                                {(Array.isArray(skills) ? skills : [])
                                    .filter(skill => skill.category === category)
                                    .map(skill => (
                                        <div key={skill.id} className="skill-card">
                                            <div className="skill-header">
                                                <span className="skill-icon">{skill.icon || '💡'}</span>
                                                <h4>{skill.name}</h4>
                                            </div>
                                            <div className="skill-level">
                                                <div className="level-bar">
                                                    <div
                                                        className="level-fill"
                                                        style={{ width: `${skill.level * 20}%` }}
                                                    ></div>
                                                </div>
                                                <span className="level-text">Niveau {skill.level}/5</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;