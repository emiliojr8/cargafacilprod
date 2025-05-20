import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaGlobe, FaTruck, FaUserPlus, FaInfoCircle } from 'react-icons/fa';
import './Motorista.css';

const Motorista = () => {
    const navigate = useNavigate();

    const handleAbrirNoNavegador = () => navigate('/app-no-navegador-motorista');
    const handleDownloadClick = () => navigate('/baixar-app-motorista');
    const handleCadastroClick = () => navigate('/Cadastro');
    const handleSobreClick = () => navigate('/Sobre');

    return (
        <div className="motorista-page">
            {/* Seção Hero */}
            <div className="motorista-hero-section">
                <div className="motorista-hero-content">
                    <h1>Bem-vindo, Motorista!</h1>
                    <p>Gerencie suas solicitações de transporte e visualize pedidos disponíveis.</p>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="motorista-content-section">
                <div className="motorista-info-section">
                    <h2>Tens um veículo que pode transportar cargas?</h2>
                    <p>
                        Cadastra-se na nossa plataforma <span className="motorista-link" onClick={handleCadastroClick}>clicando aqui</span> e trabalhe onde estiver e na hora que quiser usando o nosso aplicativo Carga Fácil.
                    </p>
                    <p>
                        Para mais informações sobre requisitos necessários para ser um motorista Carga Fácil, encontre nossos <span className="motorista-link" onClick={handleSobreClick}>contactos aqui</span>.
                    </p>
                </div>

                <div className="motorista-funcionalidades">
                    <div className="motorista-card">
                        <FaTruck className="motorista-card-icon" />
                        <h2>Minhas Solicitações</h2>
                        <p>Visualize e gerencie suas solicitações de transporte.</p>
                    </div>
                    <div className="motorista-card">
                        <FaUserPlus className="motorista-card-icon" />
                        <h2>Disponibilidade</h2>
                        <p>Defina sua disponibilidade para receber novos pedidos.</p>
                    </div>
                    <div className="motorista-card">
                        <FaInfoCircle className="motorista-card-icon" />
                        <h2>Histórico</h2>
                        <p>Consulte seu histórico de serviços realizados.</p>
                    </div>
                </div>
            </div>

            {/* Botões Fixos na Parte Inferior */}
            <div className="motorista-fixed-buttons">
                <button className="motorista-btn-download pulse" onClick={handleDownloadClick}>
                    <FaDownload className="motorista-button-icon" />
                    Baixar o Aplicativo     
                </button>
                <button className="motorista-btn-open pulse" onClick={handleAbrirNoNavegador}>
                    <FaGlobe className="motorista-button-icon" />
                    Abrir no Navegador
                </button>
            </div>
        </div>
    );
};

export default Motorista;