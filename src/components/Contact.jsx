import React, { useState } from 'react';
import axios from 'axios';
import './../styles/components.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('http://localhost/backend/contact', formData);

            if (response.status === 200 || response.status === 201) {
                setStatus({
                    type: 'success',
                    message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
                });
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({
                type: 'error',
                message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
            });
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: '📧',
            title: 'Email',
            value: 'walidouu200@gmail.com',
            link: 'mailto:walidouu200@gmail.com'
        },
        {
            icon: '📱',
            title: 'Téléphone',
            value: '+213 7 92 65 40 46',
            link: 'tel:+213792654046'
        },
        {
            icon: '📍',
            title: 'Localisation',
            value: 'Algerie',
            link: null
        },
        {
            icon: '💼',
            title: 'LinkedIn',
            value: 'Linkedin',
            link: 'https://www.linkedin.com/in/walid-rezzoug-22475a336/'
        },
        {
            icon: '🐙',
            title: 'GitHub',
            value: 'Github',
            link: 'https://github.com/Walid-Rezzoug'
        }
    ];

    return (
        <section id="contact" className="contact-section">
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">Contactez-moi</h2>
                    <div className="section-divider"></div>
                    <p className="section-subtitle">
                        Discutons de vos projets et opportunités
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3 className="contact-info-title">Mes Coordonnées</h3>

                        <div className="contact-info-grid">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="contact-info-card">
                                    <div className="contact-info-icon">
                                        <span>{info.icon}</span>
                                    </div>
                                    <div className="contact-info-content">
                                        <h4>{info.title}</h4>
                                        {info.link ? (
                                            <a
                                                href={info.link}
                                                target={info.link.startsWith('http') ? '_blank' : '_self'}
                                                rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                                className="contact-link"
                                            >
                                                {info.value}
                                            </a>
                                        ) : (
                                            <p>{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="availability">
                            <h4>Disponibilité</h4>
                            <div className="availability-status">
                                <span className="status-indicator available"></span>
                                <span className="status-text">Disponible pour de nouvelles opportunités</span>
                            </div>
                            <p className="availability-note">
                                Réponse sous 24-48 heures maximum
                            </p>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Nom Complet *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Votre nom"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">
                                    Sujet
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Objet de votre message"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    rows="6"
                                    placeholder="Décrivez votre projet ou votre demande..."
                                ></textarea>
                            </div>

                            {status.message && (
                                <div className={`form-status ${status.type}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Envoi en cours...
                                    </>
                                ) : (
                                    'Envoyer le message'
                                )}
                            </button>

                            <p className="form-note">
                                * Champs obligatoires
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;