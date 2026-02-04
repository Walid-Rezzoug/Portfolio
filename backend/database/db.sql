-- Créer la base de données
CREATE DATABASE IF NOT EXISTS portfolio_walid;
USE portfolio_walid;

-- Table des compétences
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level INT DEFAULT 1,
    icon VARCHAR(100)
);

-- Table des projets
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    technologies VARCHAR(500),
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des expériences
CREATE TABLE experiences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200),
    description TEXT,
    start_date DATE,
    end_date DATE,
    current_job BOOLEAN DEFAULT FALSE,
    type VARCHAR(50) -- 'work', 'project_lead', 'education'
);

-- Table des messages de contact
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_status BOOLEAN DEFAULT FALSE
);

-- Insertion des données de compétences
INSERT INTO skills (name, category, level, icon) VALUES
('React', 'Frontend', 4, 'react'),
('PHP', 'Backend', 4, 'php'),
('JavaScript', 'Language', 5, 'javascript'),
('HTML/CSS', 'Frontend', 5, 'html'),
('MySQL', 'Database', 4, 'mysql'),
('Git', 'Tools', 4, 'git'),
('Node.js', 'Backend', 3, 'nodejs'),
('Python', 'Language', 3, 'python'),
('Java', 'Language', 3, 'java'),
('Gestion de Projet', 'Soft Skills', 5, 'project');

-- Insertion des données de projets
INSERT INTO projects (title, description, technologies, github_url, featured) VALUES
('Portfolio Professionnel', 'Site portfolio complet avec React et PHP', 'React, PHP, MySQL, Ant Design', 'https://github.com/walid/portfolio', TRUE),
('Application de Gestion de Tâches', 'Application web de gestion de projets en équipe', 'React, Node.js, MongoDB', 'https://github.com/walid/task-manager', TRUE),
('Système de Réservation en ligne', 'Plateforme de réservation pour petites entreprises', 'PHP, JavaScript, MySQL', 'https://github.com/walid/booking-system', FALSE);

-- Insertion des expériences
INSERT INTO experiences (title, company, description, start_date, end_date, current_job, type) VALUES
('Chef de Projet Développement Web', 'Projet Académique', 'Lead d une équipe de 4 développeurs sur un projet de gestion de bibliothèque', '2023-09-01', '2023-12-15', FALSE, 'project_lead'),
('Étudiant en Licence Informatique', 'Université', 'Licence en Informatique avec spécialisation en développement web', '2021-09-01', NULL, TRUE, 'education'),
('Développeur Web Freelance', 'Auto-entrepreneur', 'Création de sites web pour clients locaux', '2022-01-01', NULL, TRUE, 'work');




