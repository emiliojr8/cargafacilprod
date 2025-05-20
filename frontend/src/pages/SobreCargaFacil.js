import React from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaHandshake } from 'react-icons/fa';
import './SobreCargaFacil.css';

const SobreCargaFacil = () => {
    return (
        <div className="sobre-container">
            {/* Seção de Imagens em Fullscreen */}
            <div className="fullscreen-section">
                <div className="fullscreen-image" id="quem-somos">
                    <img 
                        src="/images/quemsomos.jpg" 
                        alt="Quem Somos" 
                        loading="eager"
                    />
                </div>
                <div className="fullscreen-image" id="missao">
                    <img 
                        src="/images/Missao.jpg" 
                        alt="Missão" 
                        loading="eager"
                    />
                </div>
                <div className="fullscreen-image" id="visao">
                    <img 
                        src="/images/visao.jpg" 
                        alt="Visão" 
                        loading="eager"
                    />
                </div>
                <div className="fullscreen-image" id="valores">
                    <img 
                        src="/images/valores.jpg" 
                        alt="Valores" 
                        loading="eager"
                    />
                </div>
            </div>

            {/* Seção de Contatos */}
            <div className="contact-section">
                <h2>Entre em Contacto</h2>
                <div className="contact-info">
                    <div className="contact-item">
                        <FaPhone className="contact-icon" />
                        <span>+258 82 098 5159</span>
                    </div>
                    <div className="contact-item">
                        <FaMapMarkerAlt className="contact-icon" />
                        <span>Cidade de Maputo, Moçambique</span>
                    </div>
                    <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <span>contacto@cargafacil.co.mz</span>
                    </div>
                </div>
                
                <div className="social-media">
                    <h3>Click em nossas Redes Sociais</h3>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/profile.php?id=61571206525088" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="social-icon" />
                        </a>
                        <a href="https://instagram.com/carga.facil25" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href="https://linkedin.com/company/cargafacil" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Seção de Parceiros */}
            <div className="partners-section">
                <div className="partners-row">
                    {/* Fonte de Financiamento */}
                    <div className="partner-column">
                        <h2 className="partner-title">Fonte de Financiamento</h2>
                        <div className="logo-container">
                            <img 
                                src="/images/iadclogo.jpg" 
                                alt="IADC" 
                                className="partner-logo"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Parceiros de Implementação */}
                    <div className="partner-column">
                        <div className="partner-header">
                            <FaHandshake className="partner-icon" />
                            <h2>Parceiros de Implementação</h2>
                        </div>
                        <div className="logos-container">
                            <img src="/images/UEMlogo.jpg" alt="UEM" className="partner-logo" loading="lazy" />
                            <img src="/images/cieslogo.jpg" alt="CIES" className="partner-logo" loading="lazy" />
                            <img src="/images/inuem.jpg" alt="INUEM" className="partner-logo" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SobreCargaFacil;