// src/pages/DownloadAppMotorista.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaDownload, 
  FaUser, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaTruck, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaClock 
} from 'react-icons/fa';
import HeaderSuspenso from '../components/HeaderSuspenso';
import './DownloadAppMotorista.css';

const DownloadAppMotorista = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  // Data de lançamento (90 dias a partir de hoje)
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
    alert(`Obrigado, ${formData.nome}! Você será um dos primeiros motoristas a ter acesso ao app.`);
    navigate('/motorista');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCountdownMessage = () => {
    if (timeLeft.days <= 0) return 'O lançamento é hoje! 🚛💨';
    if (timeLeft.days <= 3) return 'Últimos dias! Prepare-se!';
    if (timeLeft.days <= 7) return 'Contagem regressiva final!';
    return 'Sua nova ferramenta de trabalho está chegando!';
  };

  return (
    <div className="download-app-motorista-container">
      {/* Usa HeaderSuspenso com userType motorista */}
      <HeaderSuspenso userType="motorista" />

      <div className="download-app-motorista-page">
        {/* Removi botão voltar daqui pois já tem no HeaderSuspenso */}

        <div className="download-app-container">
          <div className={`header-section ${countdownStyle}`}>
            <h1>{getCountdownMessage()}</h1>
            <p className="subtitle">Cadastre-se para ter <span className="highlight">acesso antecipado</span> e vantagens exclusivas</p>
            
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
                  ? `Faltam apenas ${timeLeft.days} dias para você aumentar seus ganhos!`
                  : 'Última chance para garantir seus benefícios!'}
              </div>
            )}
          </div>

          <div className="content-grid">
            <div className="app-mockup-section">
              <img 
                src="/images/app-motorista-mockup.png" 
                alt="Mockup do Aplicativo para Motoristas" 
                className="mockup-image"
              />
              <div className="benefits-list">
                <h3><FaTruck /> Vantagens exclusivas para motoristas:</h3>
                <ul>
                  <li><FaMoneyBillWave /> <strong>+30% de lucro</strong> com nossa taxa reduzida</li>
                  <li><FaChartLine /> <strong>Rotas otimizadas</strong> que economizam combustível</li>
                  <li><FaClock /> <strong>Menos tempo ocioso</strong> entre fretes</li>
                  <li>🛡️ <strong>Proteção garantida</strong> para todas as cargas</li>
                  <li>💰 <strong>Pagamento rápido</strong> direto no app</li>
                  <li>⭐ <strong>Programa de benefícios</strong> para os primeiros cadastrados</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              <h2>Garanta seu lugar como motorista premium!</h2>
              
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  name="nome"
                  type="text"
                  placeholder="Seu nome completo"
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
                  placeholder="WhatsApp (com DDD)"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="early-access">
                <p>Os primeiros 100 motoristas cadastrados ganharão:</p>
                <ul>
                  <li>✔ 3 meses sem comissão</li>
                  <li>✔ Prioridade nas solicitações</li>
                  <li>✔ Badge &quot;Motorista Pioneiro&quot;</li>
                </ul>
              </div>

              <button type="submit" className="notify-button">
                <FaDownload className="button-icon" />
                Quero ser um motorista premium!
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
    </div>
  );
};

export default DownloadAppMotorista;
