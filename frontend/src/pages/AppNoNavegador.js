import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaUserCircle, FaHistory, FaArrowLeft, FaSignOutAlt, FaTimes, FaChevronLeft } from 'react-icons/fa';
import { FaMapMarkerAlt, FaFlagCheckered, FaBox, FaRuler, FaWeightHanging, FaAlignLeft } from 'react-icons/fa';
import Mapa from '../components/Mapa';
import './AppNoNavegador.css';

const DynamicOverlay = ({ 
  isLoggedIn, 
  onRegister, 
  onLogin, 
  onLogout,
  onBack,
  currentView,
  formData,
  errors,
  loading,
  handleChange,
  handleSubmit,
  showOverlay
}) => {
  return (
    <>
      {showOverlay && <div className="overlay-backdrop"></div>}
      <div className={`dynamic-overlay ${showOverlay ? 'active' : ''}`}>
        <div className={`overlay-content ${isLoggedIn ? 'logged-in' : ''}`}>
          <button onClick={onBack} className="back-button-overlay">
            <FaChevronLeft /> Voltar
          </button>
          
          {currentView === 'welcome' ? (
            <>
              {isLoggedIn ? (
                <>
                  <h2>Obrigado por se cadastrar no CargaFácil!</h2>
                  <p>Estamos finalizando os últimos ajustes para lançar nossa plataforma completa.</p>
                  <p>Você receberá uma notificação quando tudo estiver pronto para uso.</p>
                  <div className="overlay-actions">
                    <button onClick={onLogout} className="logout-button">
                      <FaSignOutAlt /> Sair da conta
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>Plataforma em Pré-Lançamento</h2>
                  <p>Cadastre-se agora para garantir seu acesso assim que lançarmos oficialmente!</p>
                  <div className="overlay-actions">
                    <button onClick={onRegister} className="primary-button">
                      Cadastrar como Cliente
                    </button>
                    <button onClick={onLogin} className="secondary-button">
                      Já tem conta? Entrar
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="login-form-container">
              <h2>Login Cliente</h2>
              <form onSubmit={handleSubmit} className="login-form">
                <input
                  name="username"
                  placeholder="Telefone"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {errors.username && <div className="error-message">{errors.username}</div>}

                <input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <div className="error-message">{errors.password}</div>}

                {errors.non_field_errors && (
                  <div className="error-message">{errors.non_field_errors}</div>
                )}

                <button type="submit" disabled={loading} className="login-submit-button">
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

DynamicOverlay.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  currentView: PropTypes.oneOf(['welcome', 'login']).isRequired,
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  showOverlay: PropTypes.bool.isRequired
};

const AppNoNavegador = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [transportes, setTransportes] = useState([]);
    const [partida, setPartida] = useState('');
    const [destino, setDestino] = useState('');
    const [tipoCarga, setTipoCarga] = useState('');
    const [dimensoes, setDimensoes] = useState({ largura: 0, altura: 0, comprimento: 0, peso: 0 });
    const [descricaoCarga, setDescricaoCarga] = useState('');
    const [formaEntrega, setFormaEntrega] = useState('');
    const [dadosDestinatario, setDadosDestinatario] = useState({ nome: '', telefone: '', descricaoEntrega: '' });
    const [sugestoesPartida, setSugestoesPartida] = useState([]);
    const [sugestoesDestino, setSugestoesDestino] = useState([]);
    const [mostrarSugestoesPartida, setMostrarSugestoesPartida] = useState(false);
    const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false);
    const [mostrarDropdownPerfil, setMostrarDropdownPerfil] = useState(false);
    const [mostrarPainelDireito, setMostrarPainelDireito] = useState(false);
    const [overlayView, setOverlayView] = useState('welcome');
    const [showOverlay, setShowOverlay] = useState(true);
    const [telaAtual, setTelaAtual] = useState(1);
    const [botaoBalanco, setBotaoBalanco] = useState(false);
    
    const [loginForm, setLoginForm] = useState({
      username: '',
      password: '',
      user_type: 'client'
    });
    const [loginErrors, setLoginErrors] = useState({});
    const [loginLoading, setLoginLoading] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMostrarDropdownPerfil(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (token) {
            fetchTransportes();
            setShowOverlay(false);
        }
    }, [navigate]);

    const fetchTransportes = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/transportes/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setTransportes(data);
        } catch (error) {
            console.error('Erro ao buscar transportes:', error);
        }
    };

    const buscarSugestoes = async (endereco, setSugestoes) => {
        if (endereco.length > 2) {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}&countrycodes=mz`
                );
                const data = await response.json();
                setSugestoes(data.map(item => item.display_name));
            } catch (error) {
                console.error('Erro ao buscar sugestões:', error);
            }
        } else {
            setSugestoes([]);
        }
    };

    useEffect(() => {
        buscarSugestoes(partida, setSugestoesPartida);
    }, [partida]);

    useEffect(() => {
        buscarSugestoes(destino, setSugestoesDestino);
    }, [destino]);

    const handleSolicitarTransporte = async () => {
        if (!isLoggedIn) {
            setShowOverlay(true);
            setOverlayView('login');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/solicitar-transporte/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    partida,
                    destino,
                    tipoCarga,
                    dimensoes,
                    descricaoCarga,
                    formaEntrega,
                    dadosDestinatario,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Transporte solicitado com sucesso!');
                fetchTransportes();
            } else {
                alert(data.message || 'Erro ao solicitar transporte.');
            }
        } catch (error) {
            console.error('Erro ao solicitar transporte:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setOverlayView('welcome');
        setShowOverlay(true);
    };

    const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLoginForm(prev => ({
        ...prev,
        [name]: value
      }));
      setLoginErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    };

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setLoginLoading(true);
      setLoginErrors({});

      try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginForm)
        });

        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
          setShowOverlay(false);
          fetchTransportes();
        } else {
          setLoginErrors(data.errors || { non_field_errors: 'Credenciais inválidas' });
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        setLoginErrors({ non_field_errors: 'Erro na conexão' });
      } finally {
        setLoginLoading(false);
      }
    };

    const avancarTela = () => {
        if (telaAtual < 3) {
            setTelaAtual(telaAtual + 1);
        }
    };

    const voltarTela = () => {
        if (telaAtual > 1) {
            setTelaAtual(telaAtual - 1);
        }
    };

    const handleInteracaoSemLogin = () => {
        if (!isLoggedIn) {
            setBotaoBalanco(true);
            setTimeout(() => {
                setBotaoBalanco(false);
            }, 1000);
        }
    };

    return (
        <>
            <div className={`app-no-navegador ${showOverlay ? 'tela-escurecida' : ''}`}>
                <DynamicOverlay
                    isLoggedIn={isLoggedIn}
                    onRegister={() => navigate('/register')}
                    onLogin={() => setOverlayView('login')}
                    onLogout={handleLogout}
                    onBack={() => {
                        if (overlayView === 'login') {
                        setOverlayView('welcome');
                        } else {
                        navigate(-1); 
                        }
                    }}
                    currentView={overlayView}
                    formData={loginForm}
                    errors={loginErrors}
                    loading={loginLoading}
                    handleChange={handleLoginChange}
                    handleSubmit={handleLoginSubmit}
                    showOverlay={showOverlay}
                />

                <div className="menu-suspenso">
                    <div className="logo" onClick={() => navigate('/')}>
                        <img src="/images/cflogo-2.png" alt="Logo Carga Fácil" className="logo-image" />
                    </div>

                    <div className="menu-centro">
                        <div
                            className="menu-item"
                            onClick={() => {
                                if (!isLoggedIn) {
                                    setShowOverlay(true);
                                    setOverlayView('login');
                                } else {
                                    setMostrarPainelDireito(!mostrarPainelDireito);
                                }
                            }}
                            style={{ fontWeight: 'bold' }}
                        >
                            <FaHistory className="icone-menu" />
                            Minhas Solicitações
                        </div>
                    </div>

                    <div className="perfil" ref={dropdownRef}>
                        <div
                            className="perfil-icon"
                            onClick={() => {
                                if (!isLoggedIn) {
                                    setShowOverlay(true);
                                    setOverlayView('login');
                                } else {
                                    setMostrarDropdownPerfil(!mostrarDropdownPerfil);
                                }
                            }}
                        >
                            <FaUserCircle className="avatar" size={24} />
                            <span>{isLoggedIn ? 'Nome do Usuário' : 'Iniciar Sessão'}</span>
                            {isLoggedIn && <span className="seta">▼</span>}
                        </div>
                        {isLoggedIn && mostrarDropdownPerfil && (
                            <ul className={`perfil-dropdown ${mostrarDropdownPerfil ? 'show' : ''}`}>
                                <li onClick={() => navigate('/perfil')}>
                                    <FaUserCircle className="dropdown-icon" />
                                    Perfil
                                </li>
                                <li onClick={handleLogout}>
                                    <FaSignOutAlt className="dropdown-icon" />
                                    Logout
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="painel-esquerdo">
                    {telaAtual > 1 && (
                        <button className="botao-voltar" onClick={voltarTela}>
                            <FaArrowLeft />
                        </button>
                    )}

                    <h2 className="titulo-painel">Solicitação de Transporte de Carga</h2>

                    {telaAtual === 1 && (
                        <div className="formulario" onClick={handleInteracaoSemLogin}>
                            <div className="campo-sugestoes">
                                <div className="campo-com-icone">
                                    <FaMapMarkerAlt className="icone" />
                                    <input
                                        type="text"
                                        placeholder="Ponto de Partida"
                                        value={partida}
                                        onChange={(e) => setPartida(e.target.value)}
                                        onFocus={() => setMostrarSugestoesPartida(true)}
                                        onBlur={() => setTimeout(() => setMostrarSugestoesPartida(false), 200)}
                                    />
                                </div>
                                {mostrarSugestoesPartida && sugestoesPartida.length > 0 && (
                                    <ul className="lista-sugestoes">
                                        {sugestoesPartida.map((sugestao, index) => (
                                            <li key={index} onClick={() => setPartida(sugestao)}>
                                                {sugestao}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="campo-sugestoes">
                                <div className="campo-com-icone">
                                    <FaFlagCheckered className="icone" />
                                    <input
                                        type="text"
                                        placeholder="Destino"
                                        value={destino}
                                        onChange={(e) => setDestino(e.target.value)}
                                        onFocus={() => setMostrarSugestoesDestino(true)}
                                        onBlur={() => setTimeout(() => setMostrarSugestoesDestino(false), 200)}
                                    />
                                </div>
                                {mostrarSugestoesDestino && sugestoesDestino.length > 0 && (
                                    <ul className="lista-sugestoes">
                                        {sugestoesDestino.map((sugestao, index) => (
                                            <li key={index} onClick={() => setDestino(sugestao)}>
                                                {sugestao}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="campo-com-icone">
                                <FaBox className="icone" />
                                <select value={tipoCarga} onChange={(e) => setTipoCarga(e.target.value)}>
                                    <option value="">Selecione o tipo de carga</option>
                                    <option value="pequena">Pequena</option>
                                    <option value="media">Média</option>
                                    <option value="grande">Grande</option>
                                </select>
                            </div>
                            <div className="dimensoes-carga">
                                <div className="campo-com-icone">
                                    <FaRuler className="icone" />
                                    <input
                                        type="number"
                                        placeholder="Largura (m)"
                                        value={dimensoes.largura}
                                        onChange={(e) => setDimensoes({ ...dimensoes, largura: e.target.value })}
                                    />
                                </div>
                                <div className="campo-com-icone">
                                    <FaRuler className="icone" />
                                    <input
                                        type="number"
                                        placeholder="Altura (m)"
                                        value={dimensoes.altura}
                                        onChange={(e) => setDimensoes({ ...dimensoes, altura: e.target.value })}
                                    />
                                </div>
                                <div className="campo-com-icone">
                                    <FaRuler className="icone" />
                                    <input
                                        type="number"
                                        placeholder="Comprimento (m)"
                                        value={dimensoes.comprimento}
                                        onChange={(e) => setDimensoes({ ...dimensoes, comprimento: e.target.value })}
                                    />
                                </div>
                                <div className="campo-com-icone">
                                    <FaWeightHanging className="icone" />
                                    <input
                                        type="number"
                                        placeholder="Peso (kg)"
                                        value={dimensoes.peso}
                                        onChange={(e) => setDimensoes({ ...dimensoes, peso: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="campo-descricao">
                                <div className="campo-com-icone">
                                    <FaAlignLeft className="icone" />
                                    <textarea
                                        placeholder="Descrição da carga (opcional)"
                                        value={descricaoCarga}
                                        onChange={(e) => setDescricaoCarga(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {telaAtual === 2 && (
                        <div className="formulario" onClick={handleInteracaoSemLogin}>
                            <div className="campo-com-icone">
                                <h3>Como vai deixar a carga?</h3>
                                <select value={formaEntrega} onChange={(e) => setFormaEntrega(e.target.value)}>
                                    <option value="">Selecione a forma de entrega</option>
                                    <option value="com_motorista">Vou com o motorista</option>
                                    <option value="com_destinatario">Com o destinatário</option>
                                    <option value="com_conhecido">Com um conhecido</option>
                                    <option value="na_portaria">Na portaria</option>
                                    <option value="caixa_correio">Na caixa de correio</option>
                                </select>
                            </div>
                            {formaEntrega !== 'com_motorista' && (
                                <>
                                    <div className="campo-com-icone">
                                        <h3>Dados do destinatário</h3>
                                        <input
                                            type="text"
                                            placeholder="Nome completo"
                                            value={dadosDestinatario.nome}
                                            onChange={(e) => setDadosDestinatario({ ...dadosDestinatario, nome: e.target.value })}
                                        />
                                    </div>
                                    <div className="campo-com-icone">
                                        <input
                                            type="tel"
                                            placeholder="Número de telefone"
                                            value={dadosDestinatario.telefone}
                                            onChange={(e) => setDadosDestinatario({ ...dadosDestinatario, telefone: e.target.value })}
                                        />
                                    </div>
                                    <div className="campo-descricao">
                                        <div className="campo-com-icone">
                                            <FaAlignLeft className="icone" />
                                            <textarea
                                                placeholder="Descrição sobre como vai deixar a carga (opcional)"
                                                value={dadosDestinatario.descricaoEntrega}
                                                onChange={(e) => setDadosDestinatario({ ...dadosDestinatario, descricaoEntrega: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {telaAtual === 3 && (
                        <div className="lista-transportes" onClick={handleInteracaoSemLogin}>
                            <h2>Transportes Disponíveis</h2>
                            <ul>
                                {transportes.map((transporte) => (
                                    <li key={transporte.id}>
                                        <p>{transporte.nome}</p>
                                        <button onClick={handleSolicitarTransporte}>Solicitar Transporte</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="botao-fixo">
                        {!isLoggedIn ? (
                            <button
                                className={`botao-login ${botaoBalanco ? 'balanco' : ''}`}
                                onClick={() => {
                                    setShowOverlay(true);
                                    setOverlayView('login');
                                }}
                            >
                                Inicie sessão para continuar
                            </button>
                        ) : telaAtual === 1 ? (
                            <button onClick={avancarTela}>Continuar a solicitar</button>
                        ) : (
                            <button onClick={handleSolicitarTransporte}>Solicitar Transporte</button>
                        )}
                    </div>
                </div>

                {mostrarPainelDireito && (
                    <div className="painel-direito">
                        <h2>Histórico de Solicitações</h2>
                        <FaTimes className="fechar-painel" onClick={() => setMostrarPainelDireito(false)} />
                        <ul>
                            <li>Solicitação 1</li>
                            <li>Solicitação 2</li>
                            <li>Solicitação 3</li>
                        </ul>
                    </div>
                )}  

                <Mapa />
            </div>
        </>
    );
};

export default AppNoNavegador;