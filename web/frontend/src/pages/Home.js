import React, { useEffect, useState } from 'react';
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
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';
import './Home.css';

const TypingText = ({ text, speed = 100, onComplete }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(timer);
        if(onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <>{displayed}</>;
};

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Estado para controlar sequência da digitação
  const [typingStep, setTypingStep] = useState(1);

  // Lista das classes de animação que serão alternadas
  const animations = [
    'fade-in-out',
    'color-shift',
    'blinking-text',
    'slide-down-up'
  ];

  // Estado para controlar qual animação está ativa
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Loop para alternar as animações a cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimationIndex(prev => (prev + 1) % animations.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleAbrirAppNoNavegador = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      navigate('/pre-app-no-navegador');
    }
  };

  const handleDownloadClick = () => {
    navigate('/baixar-app');
  };

  const handleRegister = () => {
    setShowModal(false);
    navigate('/cliente/cadastro');
  };

  const handleLogin = () => {
    setShowModal(false);
    navigate('/cliente/login');
  };

  // Callback para avançar na animação do typing
  const onTypingComplete = () => {
    if (typingStep === 1) setTypingStep(2);
  };

  return (
    <div className="home">
      {/* Seção Hero com imagem de fundo */}
      <div className="hero-section">
        {/* Aqui aplicamos a classe dinâmica de animação */}
        <div className={`hero-content ${animations[currentAnimationIndex]}`}>
          <h1>
            {typingStep >= 1 && (
              <TypingText
                text={t('Conectamos donos de cargas a motoristas de confiança')}
                speed={80}
                onComplete={onTypingComplete}
              />
            )}
          </h1>
          <p>
            {typingStep >= 2 && (
              <TypingText
                text={t('Soluções rápidas, seguras e eficientes para o transporte de cargas')}
                speed={80}
              />
            )}
          </p>
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

      {/* Painel Modal de Pré-Lançamento */}
      {showModal && (
        <>
          <div className="overlay-backdrop" onClick={() => setShowModal(false)}></div>
          <div className="dynamic-overlay active">
            <div className="overlay-content">
              <button className="close-button" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
              <h2>Plataforma em Pré-Lançamento</h2>
              <p>Cadastre-se agora para garantir seu acesso assim que lançarmos oficialmente!</p>
              <div className="overlay-actions">
                <button className="primary-button" onClick={handleRegister}>
                  Cadastrar
                </button>
                <button className="secondary-button" onClick={handleLogin}>
                  Já tem conta? Entrar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
