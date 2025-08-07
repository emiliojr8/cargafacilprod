// src/pages/DownloadApp.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaDownload,
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
} from 'react-icons/fa';
import HeaderSuspenso from '../components/HeaderSuspenso';
import './DownloadApp.css';

const DownloadApp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
  });

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 90);

  const calculateTimeLeft = () => {
    const diff = launchDate - new Date();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Obrigado, ${formData.nome}! Vamos te avisar quando o app estiver disponível.`);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCountdownMessage = () => {
    if (timeLeft.days <= 0) return 'O lançamento é hoje! 🎉';
    if (timeLeft.days <= 3) return 'Últimos dias! Prepare-se!';
    if (timeLeft.days <= 7) return 'Contagem regressiva final!';
    return 'Nosso app está chegando!';
  };

  return (
    <div className="download-app-page">
      {/* USANDO O HEADER SUSPENSO - USER TYPE CLIENTE */}
      <HeaderSuspenso userType="cliente" />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="download-app-container">
        <div className={`header-section ${countdownStyle}`}>
          <h1>{getCountdownMessage()}</h1>
          <p className="subtitle">
            Cadastre-se para ser <span className="highlight">notificado</span> no lançamento
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
          <div className="app-mockup-section">
            <img
              src="/images/mockupApp1.1.jpg"
              alt="Mockup do Aplicativo CargaFácil"
              className="mockup-image"
            />
            <div className="features-list">
              <h3>Recursos exclusivos:</h3>
              <ul>
                <li>✔ Solicitação de fretes em 1 minuto</li>
                <li>✔ Rastreamento em tempo real</li>
                <li>✔ Histórico completo de transportes</li>
                <li>✔ Pagamento seguro integrado</li>
                <li>✔ Suporte 24/7</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <h2>Garanta seu acesso antecipado!</h2>

            <div className="input-group">
              <FaUserCircle className="input-icon" />
              <input
                name="nome"
                type="text"
                placeholder="Nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                name="email"
                type="email"
                placeholder="Seu melhor e-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaPhoneAlt className="input-icon" />
              <input
                name="telefone"
                type="tel"
                placeholder="Seu número de telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="notify-button">
              <FaDownload className="button-icon" />
              Quero ser avisado do lançamento!
            </button>
          </form>
        </div>

        <div className="store-badges">
          <div className="badge-container">
            <img
              src="/images/google-play-badge.png"
              alt="Em breve na Google Play"
              className="store-badge"
            />
            <span className="badge-label">Disponível em breve</span>
          </div>
          <div className="badge-container">
            <img
              src="/images/app-store-badge.png"
              alt="Em breve na App Store"
              className="store-badge"
            />
            <span className="badge-label">Disponível em breve</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
