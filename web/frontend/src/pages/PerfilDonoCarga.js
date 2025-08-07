// src/pages/PerfilDonoCarga.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AuthService from '../services/AuthService';
import './perfil.css';

function PerfilDonoCarga() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    data_nascimento: '',
    provincia: '',
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
          foto: null,
        });
        if (data.foto_url) setPreview(data.foto_url);
        document.title = data.nome ? `Perfil - ${data.nome}` : 'Perfil do Dono da Carga';
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
      if (formData.foto) data.append('foto', formData.foto);

      const updatedProfile = await AuthService.updateProfile(data);
      setProfile(updatedProfile);
      if (updatedProfile.foto_url) setPreview(updatedProfile.foto_url);
      setMessage('Perfil atualizado com sucesso!');
      setIsEditing(false);
      document.title = updatedProfile.nome ? `Perfil - ${updatedProfile.nome}` : 'Perfil do Dono da Carga';
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
      
      <h2 className="perfil-title">{profile.nome || 'Perfil do Dono da Carga'}</h2>

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
          {errors?.nome && <div className="perfil-error">{errors.nome}</div>}
        </div>

        <div className="perfil-field">
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite seu e-mail"
            autoComplete="email"
            disabled={!isEditing}
          />
          {errors?.email && <div className="perfil-error">{errors.email}</div>}
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
          <label>Tipo de usuário:</label>
          <input type="text" value={profile.is_driver ? 'Motorista' : 'Cliente'} disabled />
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

export default PerfilDonoCarga;
