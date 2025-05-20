import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaUser, FaEnvelope, FaPhoneAlt, FaArrowLeft } from 'react-icons/fa';
import './DownloadApp.css';

const DownloadApp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  // Configura a data de lançamento para 90 dias no futuro
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 90);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [countdownStyle, setCountdownStyle] = useState('normal');

  function calculateTimeLeft() {
    const difference = launchDate - new Date();
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

      // Atualiza o estilo conforme o tempo diminui
      if (newTimeLeft.days <= 7) {
        setCountdownStyle('warning');
      }
      if (newTimeLeft.days <= 3) {
        setCountdownStyle('critical');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Obrigado, ${formData.nome}! Vamos te avisar quando o app estiver disponível.`);
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCountdownMessage = () => {
    if (timeLeft.days <= 0) return 'O lançamento é hoje! 🎉';
    if (timeLeft.days <= 3) return 'Últimos dias! Prepare-se!';
    if (timeLeft.days <= 7) return 'Contagem regressiva final!';
    return 'Nosso app está chegando!';
  };

  return (
    <div className="download-app-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>

      <div className="download-app-container">
        <div className={`header-section ${countdownStyle}`}>
          <h1>{getCountdownMessage()}</h1>
          <p className="subtitle">Cadastre-se para ser <span className="highlight">notificado</span> no lançamento</p>
          
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

          {timeLeft.days <= 7 && (
            <div className="special-message">
              {timeLeft.days > 3 
                ? `Faltam apenas ${timeLeft.days} dias!`
                : 'Contagem final - Prepare-se para o lançamento!'}
            </div>
          )}
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
              <FaUser className="input-icon" />
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