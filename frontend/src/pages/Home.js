import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaDownload, 
  FaGlobe, 
  FaTruck, 
  FaCar, 
  FaMotorcycle, 
  FaUserPlus, 
  FaSearch, 
  FaMapMarkedAlt, 
  FaInfoCircle 
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleAbrirAppNoNavegador = () => {
        navigate('/app-no-navegador');
    };

    const handleDownloadClick = () => {
        navigate('/baixar-app');
    };

    return (
        <div className="home">
            {/* Seção Hero com imagem de fundo */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>{t('Conectamos donos de cargas a motoristas de confiança')}</h1>
                    <p>{t('Soluções rápidas, seguras e eficientes para o transporte de cargas')}</p>
                </div>
            </div>

            {/* Seção de Tipos de Veículos */}
            <div className="content-section">
                <h2>{t('Tipos de Veículos')}</h2>
                <div className="cards-container">
                    <div className="card">
                        <FaTruck className="card-icon" />
                        <h2>{t('Caminhões')}</h2>
                        <p>{t('Caminhões de pequeno, médio e grande porte para qualquer tipo de carga.')}</p>
                    </div>
                    <div className="card">
                        <FaCar className="card-icon" />
                        <h2>{t('Vans e Utilitários')}</h2>
                        <p>{t('Veículos menores para cargas leves e rápidas.')}</p>
                    </div>
                    <div className="card">
                        <FaMotorcycle className="card-icon" />
                        <h2>{t('Motocicletas')}</h2>
                        <p>{t('Entregas rápidas para cargas pequenas e urgentes.')}</p>
                    </div>
                </div>
            </div>

            {/* Seção de Como Funciona */}
            <div className="content-section">
                <h2>{t('Como Funciona o Carga Fácil')}</h2>
                <div className="steps-container">
                    <div className="step">
                        <FaUserPlus className="step-icon" />
                        <h3>{t('Cadastre-se')}</h3>
                        <p>{t('Baixe o aplictivo ou abre pelo navegor. Crie sua conta em poucos minutos.')}</p>
                    </div>
                    <div className="step">
                        <FaSearch className="step-icon" />
                        <h3>{t('Solicite um Motorista')}</h3>
                        <p>{t('Encontre motoristas disponíveis próximos a você.')}</p>
                    </div>
                    <div className="step">
                        <FaMapMarkedAlt className="step-icon" />
                        <h3>{t('Acompanhe em Tempo Real')}</h3>
                        <p>{t('Monitore o transporte da sua carga em tempo real.')}</p>
                    </div>
                </div>
            </div>

            {/* Seção de Sobre */}
            <div className="content-section">
                <Link to="/sobre" className="about-link">
                    <h2>{t('Sobre o CargaFácil')}</h2>
                    <div className="about-container">
                        <FaInfoCircle className="about-icon" />
                        <p>{t('O CargaFácil é uma plataforma inovadora que conecta donos de carga a motoristas de confiança.')}</p>
                    </div>
                </Link>
            </div>

            {/* Botões Fixos na Parte Inferior */}
            <div className="fixed-buttons">
                <button className="btn-download pulse" onClick={handleDownloadClick}>
                    <FaDownload className="button-icon" />
                    {t('Baixar o Aplicativo')}
                </button>
                <button className="btn-open pulse" onClick={handleAbrirAppNoNavegador}>
                    <FaGlobe className="button-icon" />
                    {t('Abrir no Navegador')}
                </button>
            </div>
        </div>
    );
};

export default Home;