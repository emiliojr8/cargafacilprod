import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaTruck,
  FaClock,
  FaCheckCircle,
  FaMoneyBillWave,
  FaChartLine,
  FaMobileAlt,
} from 'react-icons/fa';
import HeaderSuspenso from '../components/HeaderSuspenso'; // importando nav suspensa
import './preapp.css';

const PreAppNoNavegadorMotorista = () => {
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
    if (timeLeft.days <= 0) return 'Painel disponível hoje! 🚛💨';
    if (timeLeft.days <= 3) return 'Quase lá, motorista!';
    if (timeLeft.days <= 7) return 'Contagem regressiva final!';
    return 'Seu painel profissional está chegando!';
  };

  return (
    <div className="preapp-page motorista">
      {/* USANDO O COMPONENTE HeaderSuspenso PARA A NAV */}
      <HeaderSuspenso userType="motorista" />

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
              alt="Mockup do Painel Web para Motoristas"
              className="mockup-image"
            />
            <div className="benefits-list">
              <h3><FaTruck /> Vantagens exclusivas:</h3>
              <ul>
                <li><FaMoneyBillWave /> <strong>+30% de lucro</strong> com rotas otimizadas</li>
                <li><FaChartLine /> <strong>Controle total</strong> de seus fretes</li>
                <li><FaCheckCircle /> <strong>Sem app</strong> - acesse de qualquer dispositivo</li>
                <li>💰 <strong>Pagamentos</strong> direto no painel</li>
                <li>🔄 <strong>Atualizações</strong> automáticas sem downloads</li>
              </ul>
            </div>
          </div>

          <div className="info-section">
            <div className="info-card">
              <FaClock className="info-icon" />
              <h3>O que esperar?</h3>
              <p>Estamos desenvolvendo ferramentas profissionais específicas para motoristas de carga.</p>
            </div>

            <div className="info-card urgent">
              <FaMobileAlt className="info-icon" />
              <h3>Precisa trabalhar agora?</h3>
              <p>Nosso app móvel já está disponível com todas as funcionalidades.</p>
              <button
                className="app-button"
                onClick={() => navigate('/baixar-app-motorista')}
              >
                Baixar App Motorista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreAppNoNavegadorMotorista;
