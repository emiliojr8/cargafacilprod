import React from 'react';
import { FaChartLine, FaLightbulb, FaUsers, FaGlobe, FaMoneyBillWave, FaTruck, FaHandHoldingUsd, FaArrowRight } from 'react-icons/fa';
import './Parceiros.css';

const Parceiros = () => {
    return (
        <div className="parceiros-container">
            {/* Hero Section */}
            <div className="parceiros-hero" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/parceiros-cta.jpg')" }}>
                <div className="hero-content">
                    <h1>Faça Parte da Revolução do Transporte em Moçambique</h1>
                    <p>Junte-se à CargaFácil como parceiro e cresça conosco neste mercado promissor</p>
                    <button className="hero-button">
                        Quero Saber Mais <FaArrowRight className="button-icon" />
                    </button>
                </div>
            </div>

            {/* Benefícios para Parceiros */}
            <div className="beneficios-section">
                <div className="section-header">
                    <h2>Vantagens Exclusivas para Nossos Parceiros</h2>
                    <p>Descubra como sua empresa pode se beneficiar desta colaboração estratégica</p>
                </div>
                <div className="beneficios-grid">
                    <div className="beneficio-card">
                        <div className="icon-container">
                            <FaChartLine className="beneficio-icon" />
                        </div>
                        <h3>Retorno Financeiro</h3>
                        <p>Participação em um modelo de negócios escalável com alto potencial de crescimento e retorno sobre investimento atrativo</p>
                    </div>
                    <div className="beneficio-card">
                        <div className="icon-container">
                            <FaLightbulb className="beneficio-icon" />
                        </div>
                        <h3>Tecnologia Inovadora</h3>
                        <p>Acesso exclusivo à nossa plataforma digital de última geração com analytics em tempo real</p>
                    </div>
                    <div className="beneficio-card">
                        <div className="icon-container">
                            <FaUsers className="beneficio-icon" />
                        </div>
                        <h3>Base de Clientes</h3>
                        <p>Exposição para milhares de usuários ativos e acesso a novos mercados através da nossa plataforma</p>
                    </div>
                    <div className="beneficio-card">
                        <div className="icon-container">
                            <FaGlobe className="beneficio-icon" />
                        </div>
                        <h3>Expansão Regional</h3>
                        <p>Oportunidade de crescimento em todo território moçambicano com nossa rede logística integrada</p>
                    </div>
                </div>
            </div>

            {/* Dados de Impacto */}
         
       {/* <div className="dados-section">
                <div className="dados-container">
                    <div className="dado-item">
                        <h3>+200</h3>
                        <p>Parceiros Ativos</p>
                    </div>
                    <div className="dado-item">
                        <h3>+5000</h3>
                        <p>Clientes Satisfeitos</p>
                    </div>
                    <div className="dado-item">
                        <h3>+100%</h3>
                        <p>Crescimento Anual</p>
                    </div>
                    <div className="dado-item">
                        <h3>100%</h3>
                        <p>Satisfação Garantida</p>
                    </div>
                </div>
            </div> */}

            {/* Oportunidades de Parceria */}
            <div className="oportunidades-section">
                <div className="section-header">
                    <h2>Modalidades de Parceria</h2>
                    <p>Escolha a forma de colaboração que melhor se adapta ao seu negócio e objetivos</p>
                </div>
                <div className="oportunidades-grid">
                    <div className="oportunidade-card investidores">
                        <div className="card-header">
                            <FaMoneyBillWave className="card-icon" />
                            <h3>Investidores</h3>
                        </div>
                        <ul>
                            <li>Participação acionária com retorno atrativo</li>
                            <li>Taxas preferenciais nos serviços</li>
                            <li>Relatórios trimestrais detalhados</li>
                            <li>Acesso a oportunidades exclusivas</li>
                        </ul>
                        <button className="card-button">Investir Agora <FaArrowRight /></button>
                    </div>
                    
                    <div className="oportunidade-card transportadoras">
                        <div className="card-header">
                            <FaTruck className="card-icon" />
                            <h3>Transportadoras</h3>
                        </div>
                        <ul>
                            <li>Aumento da capacidade operacional</li>
                            <li>Redução de custos com ociosidade</li>
                            <li>Treinamento especializado</li>
                            <li>Gestão inteligente de frotas</li>
                        </ul>
                        <button className="card-button">Parceria Operacional <FaArrowRight /></button>
                    </div>
                    
                    <div className="oportunidade-card financiadores">
                        <div className="card-header">
                            <FaHandHoldingUsd className="card-icon" />
                            <h3>Financiadores</h3>
                        </div>
                        <ul>
                            <li>Modelos de financiamento flexíveis</li>
                            <li>Garantias reais e contratos seguros</li>
                            <li>Taxas competitivas de retorno</li>
                            <li>Portfólio diversificado</li>
                        </ul>
                        <button className="card-button">Oferecer Financiamento <FaArrowRight /></button>
                    </div>
                </div>
            </div>

            ``            {/* Depoimentos */}
           
           {/* <div className="depoimentos-section">
                <div className="section-header">
                    <h2>O Que Nossos Parceiros Dizem</h2>
                    <p>Confira os depoimentos de quem já faz parte da nossa rede</p>
                </div>
                <div className="depoimentos-container">
                    <div className="depoimento-card">
                        <div className="depoimento-content">
                            <p>&quot;A parceria com a CargaFácil transformou nosso negócio, aumentando nossa capacidade operacional em 40% no primeiro ano.&quot;</p>
                        </div>
                        <div className="depoimento-autor">
                            <div className="autor-foto"></div>
                            <div className="autor-info">
                                <h4>Carlos Mbanze</h4>
                                <p>CEO, Transportes Mbanze</p>
                            </div>
                        </div>
                    </div>
                    <div className="depoimento-card">
                        <div className="depoimento-content">
                            <p>&quot;Como investidor, o retorno tem sido acima da média do mercado. A equipe é profissional e a plataforma é inovadora.&quot;</p>
                        </div>
                        <div className="depoimento-autor">
                            <div className="autor-foto"></div>
                            <div className="autor-info">
                                <h4>Ana Macuácua</h4>
                                <p>Investidora Anjo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* CTA Section */}
            <div className="cta-section">
  <div className="cta-content">
    <h2>Pronto para fazer parte desta jornada?</h2>
    <p>
      Nossa equipe de especialistas está pronta para discutir oportunidades personalizadas para o seu negócio
    </p>
    <div className="cta-buttons">
      <a href="mailto:contacto@cargafacil.co.mz" className="cta-button-primary">
        Fale Conosco <FaArrowRight />
      </a>
      <a href="tel:+258820985159" className="cta-button-secondary">
        Agendar Reunião <FaArrowRight />
      </a>
    </div>
  </div>
</div>
  </div>
    );
};

export default Parceiros;