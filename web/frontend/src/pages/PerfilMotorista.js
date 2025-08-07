// src/pages/PerfilMotorista.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AuthService from '../services/AuthService';
import './perfil.css';

function PerfilMotorista() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data_nascimento: '',
    provincia: '',
    veiculo: '',
    capacidade_carga: '',
    numero_carta_conducao: '',
    foto: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await AuthService.getProfile();
        setProfile(data);
        setFormData({
          nome: data.nome || '',
          email: data.email || '',
          data_nascimento: data.data_nascimento || '',
          provincia: data.provincia || '',
          veiculo: data.veiculo || '',
          capacidade_carga: data.capacidade_carga || '',
          numero_carta_conducao: data.numero_carta_conducao || '',
          foto: null,
        });
        if (data.foto_url) setPreview(data.foto_url);
        document.title = data.nome ? `${data.nome} - Perfil` : 'Perfil do Motorista';
      } catch (err) {
        console.error(err);
        setMessage('Erro ao carregar perfil.');
      }
    }
    fetchProfile();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setErrors(null);
    setMessage(null);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData((f) => ({ ...f, foto: file }));
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setLoading(true);
    setErrors(null);
    setMessage(null);

    try {
      const data = new FormData();
      data.append('nome', formData.nome);
      data.append('email', formData.email);
      data.append('data_nascimento', formData.data_nascimento);
      data.append('provincia', formData.provincia);
      data.append('veiculo', formData.veiculo);
      data.append('capacidade_carga', formData.capacidade_carga);
      data.append('numero_carta_conducao', formData.numero_carta_conducao);
      if (formData.foto) data.append('foto', formData.foto);

      const updatedProfile = await AuthService.updateProfile(data);
      setProfile(updatedProfile);
      if (updatedProfile.foto_url) setPreview(updatedProfile.foto_url);
      document.title = updatedProfile.nome ? `${updatedProfile.nome} - Perfil` : 'Perfil do Motorista';
      setMessage('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (error) {
      setErrors(error.errors || { general: error.message });
    } finally {
      setLoading(false);
    }
  }

  if (!profile) {
    return <div className="perfil-loading">Carregando perfil...</div>;
  }

  return (
    <div className="perfil-container">
      <button className="perfil-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Voltar
      </button>
      <h2 className="perfil-title">{profile.nome || 'Perfil do Motorista'}</h2>

      <form className="perfil-form" onSubmit={handleSubmit}>
        <div className="perfil-photo-section">
          <label htmlFor="foto" className="perfil-photo-label">
            {preview ? (
              <img src={preview} alt="Foto do usuário" className="perfil-photo" />
            ) : (
              <div className="perfil-photo-placeholder">Sem foto</div>
            )}
            {isEditing && (
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="perfil-photo-input"
              />
            )}
          </label>
        </div>

        <div className="perfil-field">
          <label>Telefone:</label>
          <input type="text" value={profile.telefone} disabled />
        </div>

        <div className="perfil-field">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="perfil-field">
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="perfil-field">
          <label>Data de Nascimento:</label>
          <input
            type="text"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="perfil-field">
          <label>Província:</label>
          <input
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="perfil-field">
          <label>Veículo:</label>
          <input
            type="text"
            name="veiculo"
            value={formData.veiculo}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="perfil-field">
          <label>Capacidade de Carga:</label>
          <input
            type="text"
            name="capacidade_carga"
            value={formData.capacidade_carga}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="perfil-field">
          <label>Nº Carta de Condução:</label>
          <input
            type="text"
            name="numero_carta_conducao"
            value={formData.numero_carta_conducao}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <button type="submit" className="perfil-btn" disabled={loading}>
          {loading ? 'Salvando...' : isEditing ? 'Salvar' : 'Editar'}
        </button>

        {message && <div className="perfil-message">{message}</div>}
        {errors?.general && <div className="perfil-error">{errors.general}</div>}
      </form>
    </div>
  );
}

export default PerfilMotorista;
