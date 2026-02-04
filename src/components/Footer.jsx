import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/components.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Accueil', path: '/#home' },
        { name: 'À Propos', path: '/#about' },
        { name: 'Compétences', path: '/#skills' },
        { name: 'Projets', path: '/#projects' },
        { name: 'Contact', path: '/#contact' }
    ];

    const socialLinks = [
        { name: 'GitHub', icon: '🐙', url: 'https://github.com/Walid-Rezzoug' },
        { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/walid-rezzoug-22475a336/' },
        { name: 'Email', icon: '📧', url: 'mailto:walidouu200@gmail.com' }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-initials">WR</span>
                        </div>
                        <div className="brand-info">
                            <h3 className="brand-name">Walid Rezzoug</h3>
                            <p className="brand-title">Développeur Full-Stack & Chef de Projet</p>
                            <p className="brand-description">
                                Étudiant en L3 Informatique passionné par le développement web et la gestion de projet.
                            </p>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4 className="links-title">Navigation Rapide</h4>
                        <ul className="links-list">
                            {quickLinks.map((link) => (
                                <li key={link.name} className="links-item">
                                    <Link
                                        to={link.path}
                                        className="footer-link"
                                        onClick={link.path.includes('#') ? scrollToTop : null}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h4 className="social-title">Réseaux Sociaux</h4>
                        <div className="social-icons">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon-link"
                                    aria-label={social.name}
                                >
                                    <span className="social-icon">{social.icon}</span>
                                    <span className="social-name">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-contact">
                        <h4 className="contact-title">Contact Direct</h4>
                        <div className="contact-info">
                            <p className="contact-item">
                                <span className="contact-icon">📧</span>
                                <a href="mailto:walidouu200@gmail.com" className="contact-link">
                                    walidouu200@gmail.com
                                </a>
                            </p>
                            <p className="contact-item">
                                <span className="contact-icon">📍</span>
                                <span>Algerie</span>
                            </p>
                            <p className="contact-item">
                                <span className="contact-icon">🎓</span>
                                <span>Étudiant L3 Informatique</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <div className="copyright">
                        <p>
                            &copy; {currentYear} Walid Rezzoug. Tous droits réservés.
                        </p>
                        <p className="tech-stack">
                            Développé avec React, PHP et MySQL
                        </p>
                    </div>

                    <div className="footer-actions">
                        <button
                            onClick={scrollToTop}
                            className="back-to-top"
                            aria-label="Retour en haut"
                        >
                            <span className="arrow-up">↑</span>
                            <span className="back-text">Haut de page</span>
                        </button>
                    </div>
                </div>

                <div className="footer-credits">
                    <p>
                        Portfolio réalisé avec passion et professionnalisme.
                        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;