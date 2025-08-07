import React, { useContext } from 'react';
import './i18n';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Home from './pages/Home';
import DonoDaCarga from './pages/DonoDaCarga';
import Motorista from './pages/Motorista';
import Cidades from './pages/Cidades';
import Carreiras from './pages/Carreiras';
import SobreCargaFacil from './pages/SobreCargaFacil';
import Parceiros from './pages/Parceiros';
{/*import AppNoNavegador from './pages/AppNoNavegador'; */}
import AppNoNavegadorMotorista from './pages/AppNoNavegadorMotorista';
import MapaPage from './pages/MapaPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PreAppNoNavegador from './pages/PreAppNoNavegador';
import PreAppNoNavegadorMotorista from './pages/PreAppNoNavegadorMotorista';
import DownloadApp from './pages/DownloadApp';
import DownloadAppMotorista from './pages/DownloadAppMotorista';
import PerfilDonoCarga from './pages/PerfilDonoCarga';
import PerfilMotorista from './pages/PerfilMotorista';

import { AuthProvider, AuthContext } from './contexts/AuthContext';

const LayoutWithHeader = ({ children }) => (
  <>
    <Header />
    <main className="main-content">{children}</main>
  </>
);

LayoutWithHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

// Componente de rota protegida definido dentro do App.js
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Carregando...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/cliente/login" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Páginas sem layout (pré-app e app) */}
            <Route path="/pre-app-no-navegador" element={<PreAppNoNavegador />} />
            <Route path="/pre-app-no-navegador-motorista" element={<PreAppNoNavegadorMotorista />} />
            {/*<Route path="/app-no-navegador" element={<AppNoNavegador />} /> */}
            <Route path="/app-no-navegador-motorista" element={<AppNoNavegadorMotorista />} />
            <Route path="/baixar-app" element={<DownloadApp />} />
            <Route path="/baixar-app-motorista" element={<DownloadAppMotorista />} />

            {/* Páginas de perfil protegidas sem LayoutWithHeader */}
            <Route
              path="/perfil-cliente"
              element={
                <ProtectedRoute>
                  <PerfilDonoCarga />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil-motorista"
              element={
                <ProtectedRoute>
                  <PerfilMotorista />
                </ProtectedRoute>
              }
            />

            {/* Páginas com layout (Header + Main) */}
            <Route path="/" element={<LayoutWithHeader><Home /></LayoutWithHeader>} />
            <Route path="/dono-da-carga" element={<LayoutWithHeader><DonoDaCarga /></LayoutWithHeader>} />
            <Route path="/motorista" element={<LayoutWithHeader><Motorista /></LayoutWithHeader>} />
            <Route path="/cidades" element={<LayoutWithHeader><Cidades /></LayoutWithHeader>} />
            <Route path="/carreiras" element={<LayoutWithHeader><Carreiras /></LayoutWithHeader>} />
            <Route path="/sobre" element={<LayoutWithHeader><SobreCargaFacil /></LayoutWithHeader>} />
            <Route path="/parceiros" element={<LayoutWithHeader><Parceiros /></LayoutWithHeader>} />
            <Route path="/mapa" element={<LayoutWithHeader><MapaPage /></LayoutWithHeader>} />
            

            {/* Rotas de autenticação */}
            <Route
              path="/cliente/login"
              element={<LayoutWithHeader><LoginPage userType="client" /></LayoutWithHeader>}
            />
            <Route
              path="/motorista/login"
              element={<LayoutWithHeader><LoginPage userType="driver" /></LayoutWithHeader>}
            />
            <Route
              path="/cliente/cadastro"
              element={<LayoutWithHeader><RegisterPage userType="client" /></LayoutWithHeader>}
            />
            <Route
              path="/motorista/cadastro"
              element={<LayoutWithHeader><RegisterPage userType="driver" /></LayoutWithHeader>}
            />

            {/* Rotas legadas */}
            <Route path="/login" element={<Navigate to="/cliente/login" replace />} />
            <Route path="/cadastro" element={<Navigate to="/cliente/cadastro" replace />} />
            <Route path="/register" element={<Navigate to="/cliente/cadastro" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;