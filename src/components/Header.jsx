import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './../styles/components.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Accueil', path: '/', id: 'home' },
        { name: 'À Propos', path: '#about', id: 'about' },
        { name: 'Compétences', path: '#skills', id: 'skills' },
        { name: 'Projets', path: '#projects', id: 'projects' },
        { name: 'Expérience', path: '#experience', id: 'experience' },
        { name: 'Contact', path: '#contact', id: 'contact' },
    ];

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${id}`;
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <span className="logo-text">Walid Rezzoug</span>
                        <span className="logo-subtitle">Développeur Full-Stack</span>
                    </Link>
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                >
                    <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
                    <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
                </button>

                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        {navItems.map((item) => (
                            <li key={item.name} className="nav-item">
                                {item.path.startsWith('#') ? (
                                    <button
                                        className="nav-link"
                                        onClick={() => scrollToSection(item.id)}
                                    >
                                        {item.name}
                                    </button>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className="nav-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header-actions">
                    <a
                        href="https://github.com/Walid-Rezzoug"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="GitHub"
                    >
                        <span className="social-icon">
                            <i className="fi fi-brands-github"></i>
                        </span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/walid-rezzoug-22475a336"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label="LinkedIn"
                    >
                        <span className="social-icon">
                            <i className="fi fi-brands-linkedin"></i>
                        </span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;