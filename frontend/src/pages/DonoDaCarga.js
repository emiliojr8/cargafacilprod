import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  FaDownload, 
  FaGlobe, 
  FaTruck, 
  FaMapMarkerAlt, 
  FaShieldAlt,
  FaBoxes,
  FaUserCheck,
  FaHandsHelping
} from 'react-icons/fa';
import './DonoDaCarga.css';

const DonoDaCarga = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleAbrirAppNoNavegador = () => navigate('/app-no-navegador');
    const handleDownloadClick = () => navigate('/baixar-app'); // Correção aqui

    return (
        <div className="dono-da-carga-container">
            {/* Imagem Superior - Modificada para exibição completa */}
            <div className="hero-image-section">
                <img 
                    src="/images/donodacaraga25.jpg" 
                    alt="Logística de Cargas Eficiente" 
                    className="hero-image"
                    loading="eager"
                />
            </div>

            {/* Conteúdo Principal */}
            <div className="dono-da-carga-content">
                <h1>{t('Solução Completa para seu Transporte de Cargas')}</h1>
                <p className="lead-text">{t('Conectamos você aos melhores profissionais para uma logística eficiente e sem preocupações')}</p>

                {/* Seção de Benefícios Primários */}
                <div className="benefits-section">
                    <h2>{t('Nossos Diferenciais')}</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <FaTruck className="benefit-icon truck-icon" />
                            <h3>{t('Frota Qualificada')}</h3>
                            <p>{t('Motoristas profissionais com veículos adequados para qualquer tipo de carga')}</p>
                        </div>
                        <div className="benefit-card">
                            <FaMapMarkerAlt className="benefit-icon track-icon" />
                            <h3>{t('Rastreamento 24/7')}</h3>
                            <p>{t('Monitoramento em tempo real com atualizações constantes do trajeto')}</p>
                        </div>
                        <div className="benefit-card">
                            <FaShieldAlt className="benefit-icon shield-icon" />
                            <h3>{t('Segurança Total')}</h3>
                            <p>{t('Proteção garantida desde a coleta até a entrega final')}</p>
                        </div>
                    </div>
                </div>

                {/* Seção de Auxiliares de Carga */}
                <div className="assistants-section">
                    <h2>{t('Serviços Complementares')}</h2>
                    <div className="assistants-grid">
                        <div className="assistant-card">
                            <FaHandsHelping className="assistant-icon helper-icon" />
                            <h3>{t('Auxiliares de Carga')}</h3>
                            <p>{t('Profissionais especializados para carregamento e descarregamento seguro')}</p>
                        </div>
                        <div className="assistant-card">
                            <FaBoxes className="assistant-icon box-icon" />
                            <h3>{t('Manuseio Especializado')}</h3>
                            <p>{t('Cuidado profissional com cargas frágeis ou de alto valor')}</p>
                        </div>
                        <div className="assistant-card">
                            <FaUserCheck className="assistant-icon check-icon" />
                            <h3>{t('Supervisão')}</h3>
                            <p>{t('Acompanhamento em tempo real de todas as etapas do processo')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botões Fixos */}
            <div className="action-buttons">
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

export default DonoDaCarga;