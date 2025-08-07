import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaClock,
  FaCheckCircle,
  FaMobileAlt,
} from 'react-icons/fa';
import HeaderSuspenso from '../components/HeaderSuspenso'; 
import './preapp.css';

const PreAppNoNavegador = () => {
  const navigate = useNavigate();

  const availableDate = new Date();
  availableDate.setDate(availableDate.getDate() + 90);

  const calculateTimeLeft = () => {
    const diff = availableDate - new Date();
    if (diff <= 0) return {};
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [countdownStyle, setCountdownStyle] = useState('normal');

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      if (tl.days <= 3) setCountdownStyle('critical');
      else if (tl.days <= 7) setCountdownStyle('warning');
      else setCountdownStyle('normal');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getCountdownMessage = () => {
    if (timeLeft.days <= 0) return 'Disponível hoje mesmo! 🚀';
    if (timeLeft.days <= 3) return 'Quase lá! Prepare-se!';
    if (timeLeft.days <= 7) return 'Contagem regressiva final!';
    return 'Nosso painel web está chegando!';
  };

  return (
    <div className="preapp-page">
      {/* USANDO O COMPONENTE HeaderSuspenso PARA A NAV */}
      <HeaderSuspenso userType="cliente" />

      <div className="preapp-container">
        <div className={`header-section ${countdownStyle}`}>
          <h1>{getCountdownMessage()}</h1>
          <p className="subtitle">
            Acesso completo via navegador em{' '}
            <span className="highlight">{timeLeft.days || 0} dias</span>
          </p>

          <div className="countdown">
            {['days', 'hours', 'minutes', 'seconds'].map((label) => (
              <div key={label} className="countdown-item">
                <span className="number">{timeLeft[label] || 0}</span>
                <span className="label">
                  {label === 'days'
                    ? 'dias'
                    : label === 'hours'
                    ? 'horas'
                    : label === 'minutes'
                    ? 'min'
                    : 'seg'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="content-grid">
          <div className="mockup-section">
            <img
              src="/images/mockupLaptop1.jpg"
              alt="Mockup Painel Web"
              className="mockup-image"
            />
            <div className="features-list">
              <h3>O que você poderá fazer:</h3>
              <ul>
                <li><FaCheckCircle /> Solicitar fretes</li>
                <li><FaCheckCircle /> Rastrear cargas</li>
                <li><FaCheckCircle /> Histórico e pagamentos</li>
                <li><FaCheckCircle /> Acesso rápido</li>
                <li><FaCheckCircle /> Compatível em qualquer lugar</li>
              </ul>
            </div>
          </div>

          <div className="info-section">
            <div className="info-card">
              <FaClock className="info-icon" />
              <h3>Por que 90 dias?</h3>
              <p>Estamos finalizando testes para garantir a melhor experiência.</p>
            </div>
            <div className="info-card">
              <FaMobileAlt className="info-icon" />
              <h3>Quer acesso imediato?</h3>
              <p>Nosso app móvel já está disponível nas lojas.</p>
              <button className="app-button" onClick={() => navigate('/baixar-app')}>
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
