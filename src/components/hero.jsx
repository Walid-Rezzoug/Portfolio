import React from 'react';
import './../styles/components.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Walid Rezzoug</h1>
        <h2 className="hero-subtitle">Étudiant en L3 Informatique & Développeur Full-Stack</h2>
        <p className="hero-description">
          Passionné par le développement web, avec une expérience en gestion de projet 
          et une expertise dans la création de solutions digitales innovantes.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">Voir mes projets</a>
          <a href="#contact" className="btn btn-secondary">Me contacter</a>
        </div>
      </div>
      <div className="hero-image">
        <div className="avatar-placeholder">
          <span>WR</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;