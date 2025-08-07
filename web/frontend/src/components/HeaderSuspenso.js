// src/components/HeaderSuspenso.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaArrowLeft } from 'react-icons/fa';
import './HeaderSuspenso.css';

const HeaderSuspenso = ({ userType }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mostrarDropdownPerfil, setMostrarDropdownPerfil] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const tokenExists = !!localStorage.getItem('cargafacil_auth_token');
    setIsLoggedIn(tokenExists);

    if (tokenExists) {
      const profileStr = localStorage.getItem('cargafacil_user_profile');
      if (profileStr) {
        try {
          const profile = JSON.parse(profileStr);
          setUserName(profile.nome || 'Usuário');
          setUserPhoto(profile.foto_url || '');
        } catch {
          console.warn('Erro ao carregar perfil do usuário');
        }
      }
    }
  }, [userType]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarDropdownPerfil(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePerfilClick = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      setMostrarDropdownPerfil((prev) => !prev);
    } else {
      navigate(userType === 'motorista' ? '/motorista/login' : '/cliente/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cargafacil_refresh_token');
    localStorage.removeItem('cargafacil_auth_token');
    localStorage.removeItem('cargafacil_user_profile');
    setIsLoggedIn(false);
    setMostrarDropdownPerfil(false);
    navigate(userType === 'motorista' ? '/motorista/login' : '/cliente/login');
  };

  return (
    <div className="fixed-nav">
      <div className="nav-left">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Voltar
        </button>
      </div>

      <div className="logo-centro" onClick={() => navigate('/')}>
        <img src="/images/cflogo-2.png" alt="CargaFácil" className="logo-image" />
      </div>

      <div className="perfil" ref={dropdownRef}>
        <div className="perfil-icon" onClick={handlePerfilClick}>
          {userPhoto ? (
            <img
              src={userPhoto}
              alt="Foto do usuário"
              className="foto-perfil"
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
          ) : (
            <FaUserCircle size={24} />
          )}
          <span>{isLoggedIn ? userName : 'Entrar'}</span>
          {isLoggedIn && <FaChevronDown />}
        </div>

        {isLoggedIn && mostrarDropdownPerfil && (
          <ul className="perfil-dropdown visible">
            <li
              onClick={() => {
                setMostrarDropdownPerfil(false);
                navigate(userType === 'motorista' ? '/perfil-motorista' : '/perfil-cliente');
              }}
            >
              <FaUserCircle /> Perfil
            </li>
            <li onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default HeaderSuspenso;
