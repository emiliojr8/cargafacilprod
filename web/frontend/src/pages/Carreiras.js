import React from 'react';
import { FaSearch,  FaChartLine, FaHandsHelping, FaLaptopCode, /*FaUserTie, FaMapMarkedAlt*/ } from 'react-icons/fa';
// import { MdWork, MdPeople, MdSchool } from 'react-icons/md';
import './Carreiras.css';

const Carreiras = () => {
    return (
        <div className="carreiras-container">
            {/* Hero Section */}
            <div className="carreiras-hero">
                <div className="hero-content">
                    <h1>Construa sua carreira na CargaFácil</h1>
                    <p>Junte-se a uma equipe inovadora que está revolucionando o transporte em Moçambique</p>
                    <button className="hero-button">
                        Ver Vagas Disponíveis <FaSearch className="button-icon" />
                    </button>
                </div>
            </div>

            {/* Por que trabalhar conosco */}
            <div className="beneficios-section">
                <div className="section-header">
                    <h2>Por que fazer parte da CargaFácil?</h2>
                    <p>Oferecemos mais que um emprego - oferecemos uma carreira com propósito</p>
                </div>
                <div className="beneficios-grid">
                    <div className="beneficio-card">
                        <div className="icon-container">
                            <FaChartLine className="beneficio-icon" />
                        </div>
                        <h3>Crescimento Profissional</h3>
                        <p>Oportunidades contínuas de aprendizado e desenvolvimento na área de logística e tecnologia</p>
                    </div>
                    <div className="beneficio-card">
                        <div className="icon-container">
                            <FaHandsHelping className="beneficio-icon" />
                        </div>
                        <h3>Impacto Real</h3>
                        <p>Seu trabalho contribuirá diretamente para melhorar a economia e infraestrutura do país</p>
                    </div>
                    <div className="beneficio-card">
                        <div className="icon-container">
                            <FaLaptopCode className="beneficio-icon" />
                        </div>
                        <h3>Tecnologia de Ponta</h3>
                        <p>Trabalhe com as ferramentas mais modernas do mercado de logística digital</p>
                    </div>
                </div>
            </div>

            {/* Vagas em Destaque */}
           {/* <div className="vagas-section">
                <div className="section-header">
                    <h2>Vagas em Destaque</h2>
                    <p>Encontre a oportunidade perfeita para sua carreira</p>
                </div>
                <div className="vagas-grid">
                    <div className="vaga-card">
                        <div className="vaga-header">
                            <MdWork className="vaga-icon" />
                            <div className="vaga-titulo">
                                <h3>Desenvolvedor Front-end</h3>
                                <p>Maputo • Tempo Integral</p>
                            </div>
                        </div>
                        <div className="vaga-descricao">
                            <p>Procuramos um desenvolvedor front-end experiente para ajudar a construir a próxima geração da nossa plataforma de logística.</p>
                        </div>
                        <div className="vaga-requisitos">
                            <h4>Requisitos:</h4>
                            <ul>
                                <li>3+ anos de experiência com React</li>
                                <li>Conhecimento em TypeScript</li>
                                <li>Experiência com APIs REST</li>
                            </ul>
                        </div>
                        <button className="vaga-button">Candidatar-se</button>
                    </div>

                    <div className="vaga-card">
                        <div className="vaga-header">
                            <MdPeople className="vaga-icon" />
                            <div className="vaga-titulo">
                                <h3>Gerente de Operações</h3>
                                <p>Nampula • Tempo Integral</p>
                            </div>
                        </div>
                        <div className="vaga-descricao">
                            <p>Liderar nossa equipe de operações em Nampula, garantindo eficiência e qualidade no serviço prestado.</p>
                        </div>
                        <div className="vaga-requisitos">
                            <h4>Requisitos:</h4>
                            <ul>
                                <li>5+ anos em gestão logística</li>
                                <li>Experiência em liderança de equipes</li>
                                <li>Conhecimento do mercado regional</li>
                            </ul>
                        </div>
                        <button className="vaga-button">Candidatar-se</button>
                    </div>

                    <div className="vaga-card">
                        <div className="vaga-header">
                            <FaMapMarkedAlt className="vaga-icon" />
                            <div className="vaga-titulo">
                                <h3>Analista de Rotas</h3>
                                <p>Beira • Tempo Integral</p>
                            </div>
                        </div>
                        <div className="vaga-descricao">
                            <p>Otimizar rotas de transporte para maximizar eficiência e reduzir custos operacionais.</p>
                        </div>
                        <div className="vaga-requisitos">
                            <h4>Requisitos:</h4>
                            <ul>
                                <li>Formação em Engenharia ou áreas afins</li>
                                <li>Experiência com ferramentas de GIS</li>
                                <li>Capacidade analítica comprovada</li>
                            </ul>
                        </div>
                        <button className="vaga-button">Candidatar-se</button>
                    </div>
                </div>
                <button className="ver-todas-button">Ver Todas as Vagas</button>
            </div> */}

            {/* Cultura */}
            <div className="cultura-section">
                <div className="section-header">
                    <h2>Nossa Cultura</h2>
                    <p>Valores que nos guiam e nos tornam únicos</p>
                </div>
                <div className="cultura-grid">
                    <div className="cultura-card">
                        <h3>Inovação</h3>
                        <p>Buscamos constantemente novas maneiras de resolver problemas antigos da logística moçambicana.</p>
                    </div>
                    <div className="cultura-card">
                        <h3>Colaboração</h3>
                        <p>Trabalhamos em equipe, onde cada voz é ouvida e cada contribuição é valorizada.</p>
                    </div>
                    <div className="cultura-card">
                        <h3>Responsabilidade</h3>
                        <p>Assumimos compromissos sérios com nossos clientes, parceiros e colaboradores.</p>
                    </div>
                    <div className="cultura-card">
                        <h3>Crescimento</h3>
                        <p>Investimos no desenvolvimento contínuo de cada membro da nossa equipe.</p>
                    </div>
                </div>
            </div>

            {/* Processo Seletivo */}
            <div className="processo-section">
                <div className="section-header">
                    <h2>Nosso Processo Seletivo</h2>
                    <p>Transparente, justo e focado no potencial</p>
                </div>
                <div className="processo-steps">
                    <div className="processo-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Inscrição</h3>
                            <p>Envie seu currículo e informações através do nosso portal</p>
                        </div>
                    </div>
                    <div className="processo-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Avaliação Inicial</h3>
                            <p>Nossa equipe de RH analisa seu perfil em até 5 dias úteis</p>
                        </div>
                    </div>
                    <div className="processo-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Entrevista</h3>
                            <p>Conversa com nosso time para conhecer melhor suas habilidades</p>
                        </div>
                    </div>
                    <div className="processo-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3>Proposta</h3>
                            <p>Se selecionado, receberá uma oferta competitiva e personalizada</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
    <div className="cta-content">
        <h2>Pronto para embarcar nesta jornada?</h2>
        <p>Junte-se a nós e faça parte da revolução do transporte em Moçambique</p>
        <div className="cta-buttons">
            <button className="cta-button-primary">Ver Vagas Abertas</button>
            <a 
              href="mailto:contacto@cargafacil.co.mz" 
              className="cta-button-secondary"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Enviar Currículo
            </a>
        </div>
    </div>
    </div>

        </div>
    );
};

export default Carreiras;
