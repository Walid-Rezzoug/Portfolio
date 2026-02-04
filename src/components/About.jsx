import React from 'react';
import './../styles/components.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">À Propos de Moi</h2>
          <div className="section-divider"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-intro">
              Bonjour ! Je suis <strong>Walid Rezzoug</strong>, étudiant passionné en troisième année de Licence Informatique.
            </p>
            
            <div className="about-details">
              <div className="detail-card">
                <div className="detail-icon">🎓</div>
                <div className="detail-content">
                  <h3>Formation</h3>
                  <p>Licence 3 Informatique - Spécialisation Développement Web</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">🚀</div>
                <div className="detail-content">
                  <h3>Expertise</h3>
                  <p>Développement Full-Stack, Gestion de Projet, Architecture Web</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">👨‍💼</div>
                <div className="detail-content">
                  <h3>Leadership</h3>
                  <p>Expérience en tant que chef de projet sur plusieurs initiatives</p>
                </div>
              </div>
            </div>

            <div className="about-mission">
              <h3>Ma Mission</h3>
              <p>
                Je combine mes compétences techniques en développement avec mes aptitudes en gestion 
                pour créer des solutions web efficaces et innovantes. Mon objectif est de contribuer 
                à des projets ambitieux tout en continuant à développer mon expertise.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Années d'études</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projets réalisés</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Langages maîtrisés</span>
              </div>
              <div className="stat">
                <span className="stat-number">3</span>
                <span className="stat-label">Projets en tant que lead</span>
              </div>
            </div>
          </div>

          <div className="about-image">
            <div className="profile-image-placeholder">
              <div className="profile-content">
                <span className="profile-initials">WR</span>
                <div className="profile-ring"></div>
                <div className="profile-dots">
                  <span className="dot dot-1"></span>
                  <span className="dot dot-2"></span>
                  <span className="dot dot-3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;