import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaCheckCircle, FaMobileAlt } from 'react-icons/fa';
import Header from '../components/Header';
import './preapp.css';

const PreAppNoNavegador = () => {
  const navigate = useNavigate();
  
  const availableDate = new Date();
  availableDate.setDate(availableDate.getDate() + 90);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [countdownStyle, setCountdownStyle] = useState('normal');

  function calculateTimeLeft() {
    const difference = availableDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days <= 7) setCountdownStyle('warning');
      if (newTimeLeft.days <= 3) setCountdownStyle('critical');
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCountdownMessage = () => {
    if (timeLeft.days <= 0) return 'Disponível hoje mesmo! 🎉';
    if (timeLeft.days <= 3) return 'Quase lá! Prepare-se!';
    if (timeLeft.days <= 7) return 'Contagem regressiva final!';
    return 'Nosso painel web está chegando!';
  };

  return (
    <div className="preapp-page">
      <Header />
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>

      <div className="preapp-container">
        <div className={`header-section ${countdownStyle}`}>
          <h1>{getCountdownMessage()}</h1>
          <p className="subtitle">Acesso completo via navegador em <span className="highlight">{timeLeft.days} dias</span></p>
          
          <div className="countdown">
            <div className="countdown-item">
              <span className="number">{timeLeft.days || '0'}</span>
              <span className="label">dias</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.hours || '0'}</span>
              <span className="label">horas</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.minutes || '0'}</span>
              <span className="label">min</span>
            </div>
            <div className="countdown-item">
              <span className="number">{timeLeft.seconds || '0'}</span>
              <span className="label">seg</span>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="mockup-section">
            <img 
              src="/images/mockupLaptop1.jpg" 
              alt="Mockup do Painel Web para Clientes" 
              className="mockup-image"
            />
            
            <div className="features-list">
              <h3>O que você poderá fazer:</h3>
              <ul>
                <li><FaCheckCircle /> Solicitar fretes diretamente pelo navegador</li>
                <li><FaCheckCircle /> Rastrear suas cargas em tempo real</li>
                <li><FaCheckCircle /> Gerenciar histórico e pagamentos</li>
                <li><FaCheckCircle /> Acesso rápido sem necessidade de instalação</li>
                <li><FaCheckCircle /> Compatível com qualquer dispositivo</li>
              </ul>
            </div>
          </div>

          <div className="info-section">
            <div className="info-card">
              <FaClock className="info-icon" />
              <h3>Por que 90 dias?</h3>
              <p>Estamos finalizando os testes para garantir a melhor experiência possível no navegador.</p>
            </div>
            
            <div className="info-card">
              <FaMobileAlt className="info-icon" />
              <h3>Quer acesso imediato?</h3>
              <p>Nosso aplicativo móvel já está disponível para download nas lojas.</p>
             <button 
                  className="app-button" 
                  onClick={() => navigate('/baixar-app')} // Corrigido para bater com a rota no App.js
                >
                  Baixar App
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreAppNoNavegador;