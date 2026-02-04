import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Exprience';
import Contact from '../components/Contact';
import '../styles/components.css';

const Home = () => {
    return (
        <div className="app-container">
            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <div className="sidebar-content">
                    <Link to="/" className="logo">WR</Link>

                    <nav className="nav-menu">
                        <a href="#accueil" className="nav-item">
                            <span className="nav-icon">🏠</span>
                            <span>Accueil</span>
                        </a>
                        <a href="#apropos" className="nav-item">
                            <span className="nav-icon">👤</span>
                            <span>À Propos</span>
                        </a>
                        <a href="#competences" className="nav-item">
                            <span className="nav-icon">💡</span>
                            <span>Compétences</span>
                        </a>
                        <a href="#projets" className="nav-item">
                            <span className="nav-icon">📁</span>
                            <span>Projets</span>
                        </a>
                        <a href="#experience" className="nav-item">
                            <span className="nav-icon">📊</span>
                            <span>Expérience</span>
                        </a>
                        <a href="#contact" className="nav-item">
                            <span className="nav-icon">✉️</span>
                            <span>Contact</span>
                        </a>
                    </nav>

                    <div className="admin-section">
                        <Link to="/admin" className="admin-btn">
                            <span>Admin</span>
                            <span>🔧</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Sections dynamiques via composants */}
                <div id="accueil">
                    <Hero />
                </div>

                <section id="apropos" className="section">
                    <About />
                </section>

                <section id="competences" className="section">
                    <Skills />
                </section>

                <section id="projets" className="section">
                    <Projects />
                </section>

                <section id="experience" className="section">
                    <Experience />
                </section>

                <section id="contact" className="section">
                    <Contact />
                </section>
            </main>
        </div>
    );
};

export default Home;
