import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Perfil.css';

const PerfilMotorista = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/motorista/perfil/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do perfil do motorista:', error);
      }
    };

    fetchPerfil();
  }, []);

  return (
    <div className="perfil-container">
      <h2>Perfil do Motorista</h2>
      {userData ? (
        <div className="perfil-dados">
          <p><strong>Nome:</strong> {userData.nome}</p>
          <p><strong>Telefone:</strong> {userData.telefone}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>CNH:</strong> {userData.cnh}</p>
        </div>
      ) : (
        <p>Carregando dados do perfil...</p>
      )}
    </div>
  );
};

export default PerfilMotorista;
