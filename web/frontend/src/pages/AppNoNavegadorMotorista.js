import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaUserCircle, FaHistory, FaSignOutAlt, FaTimes, FaChevronLeft } from 'react-icons/fa';
import './AppNoNavegadorMotorista.css';

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
      <div className={`dynamic-overlay driver ${showOverlay ? 'active' : ''}`}>
        <div className={`overlay-content ${isLoggedIn ? 'logged-in' : ''}`}>
          <button onClick={onBack} className="back-button-overlay">
            <FaChevronLeft /> Voltar
          </button>
          
          {currentView === 'welcome' ? (
            <>
              {isLoggedIn ? (
                <>
                  <h2>Cadastro de Motorista Confirmado!</h2>
                  <p>Estamos validando seus documentos e preparando a plataforma.</p>
                  <p>Você receberá um e-mail assim que estivermos prontos para começar.</p>
                  <div className="overlay-actions">
                    <button onClick={onLogout} className="logout-button">
                      <FaSignOutAlt /> Sair da conta
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>Seja um Motorista Parceiro</h2>
                  <p>Cadastre-se agora para garantir suas primeiras corridas no lançamento!</p>
                  <div className="overlay-actions">
                    <button onClick={onRegister} className="primary-button">
                      Cadastrar como Motorista
                    </button>
                    <button onClick={onLogin} className="secondary-button">
                      Entrar na Plataforma
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="login-form-container">
              <h2>Login Motorista</h2>
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

const AppNoNavegadorMotorista = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [localizacaoMotorista, setLocalizacaoMotorista] = useState({
        latitude: -25.9689,
        longitude: 32.5699,
    });
    const [mostrarDropdownPerfil, setMostrarDropdownPerfil] = useState(false);
    const [mostrarPainelDireito, setMostrarPainelDireito] = useState(false);
    const [overlayView, setOverlayView] = useState('welcome');
    const [showOverlay, setShowOverlay] = useState(true);
    
    const [loginForm, setLoginForm] = useState({
      username: '',
      password: '',
      user_type: 'driver'
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
        const token = localStorage.getItem('driverToken');
        setIsLoggedIn(!!token);
        if (token) {
            fetchSolicitacoes();
            atualizarLocalizacao();
            setShowOverlay(false);
        }
    }, [navigate]);

    const fetchSolicitacoes = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/solicitacoes/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('driverToken')}`,
                },
            });
            const data = await response.json();
            setSolicitacoes(data);
        } catch (error) {
            console.error('Erro ao buscar solicitações:', error);
        }
    };

    const atualizarLocalizacao = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocalizacaoMotorista({ latitude, longitude });
                },
                (error) => {
                    console.error('Erro ao obter localização:', error);
                }
            );
        }
    };

    const handleAceitarSolicitacao = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/solicitar-transporte/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('driverToken')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                alert('Solicitação aceita com sucesso!');
                fetchSolicitacoes();
            } else {
                alert(data.message || 'Erro ao aceitar a solicitação.');
            }
        } catch (error) {
            console.error('Erro ao aceitar a solicitação:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('driverToken');
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
        const response = await fetch('http://localhost:8000/api/auth/web/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(loginForm)
        });

        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('driverToken', data.token);
          setIsLoggedIn(true);
          setShowOverlay(false);
          fetchSolicitacoes();
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

    return (
        <>
            <div className="app-no-navegador-motorista">
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
                        >
                            <FaHistory className="icone-menu" />
                            Histórico de Viagens
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
                            <span>{isLoggedIn ? 'Perfil' : 'Iniciar Sessão'}</span>
                            {isLoggedIn && <span className="seta">▼</span>}
                        </div>
                        {isLoggedIn && mostrarDropdownPerfil && (
                            <ul className="perfil-dropdown">
                                <li onClick={() => navigate('/perfil-motorista')}>
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

                <div className="mapa-container">
                    <MapContainer
                        center={[localizacaoMotorista.latitude, localizacaoMotorista.longitude]}
                        zoom={13}
                        style={{ height: '100vh', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {solicitacoes.map((solicitacao) => (
                            <Marker
                                key={solicitacao.id}
                                position={[solicitacao.latitude, solicitacao.longitude]}
                                icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png' })}
                            >
                                <Popup>
                                    <div>
                                        <p>Partida: {solicitacao.partida}</p>
                                        <p>Destino: {solicitacao.destino}</p>
                                        <button onClick={() => handleAceitarSolicitacao(solicitacao.id)}>
                                            Aceitar
                                        </button>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                <div className={`painel-esquerdo ${mostrarPainelDireito ? 'escondido' : ''}`}>
                    <h2>Solicitações Disponíveis</h2>
                    <ul>
                        {solicitacoes.map((solicitacao) => (
                            <li key={solicitacao.id}>
                                <p>Partida: {solicitacao.partida}</p>
                                <p>Destino: {solicitacao.destino}</p>
                                <button onClick={() => handleAceitarSolicitacao(solicitacao.id)}>
                                    Aceitar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {mostrarPainelDireito && (
                    <div className="painel-direito">
                        <h2>Histórico de Viagens</h2>
                        <FaTimes className="fechar-painel" onClick={() => setMostrarPainelDireito(false)} />
                        <ul>
                            <li>Viagem 1</li>
                            <li>Viagem 2</li>
                            <li>Viagem 3</li>
                        </ul>
                    </div>
                )}
            </div>

            <DynamicOverlay
                isLoggedIn={isLoggedIn}
                onRegister={() => navigate('/register')}
                onLogin={() => setOverlayView('login')}
                onLogout={handleLogout}
                onBack={() => {
                  if (overlayView === 'login') {
                    setOverlayView('welcome');
                  } else {
                    navigate('/motorista');
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
        </>
    );
};

export default AppNoNavegadorMotorista;

