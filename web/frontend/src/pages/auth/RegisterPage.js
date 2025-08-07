// src/pages/auth/RegisterPage.js
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import AuthTabs from '../../components/auth/AuthTabs';
import AuthService from '../../services/AuthService';

import { AuthContext } from '../../contexts/AuthContext';
import '../../components/auth/styles/auth.css';
import '../../components/auth/styles/client.css';
import '../../components/auth/styles/driver.css';

const RegisterPage = ({
  isModal = false,
  onClose = () => {},
  onRegisterSuccess = () => {},
  userType = 'client',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);  // Contexto de autenticação

  const [formData, setFormData] = useState({
    telefone: location.state?.telefone || '+258',
    password: location.state?.password || '',
    password_confirmation: '',
    user_type: userType === 'driver' ? 'driver' : 'client',
    nome: '',
    data_nascimento: '',
    provincia: '',
    veiculo: '',
    capacidade_carga: '',
    numero_carta_conducao: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const provincias = [
    'Cidade de Maputo',
    'Maputo Província/Matola',
    'Gaza',
    'Inhambane',
    'Sofala',
    'Manica',
    'Tete',
    'Zambézia',
    'Nampula',
    'Niassa',
    'Cabo Delgado',
  ];

  useEffect(() => {
    if (location.state?.user_type) {
      setFormData((prev) => ({ ...prev, user_type: location.state.user_type }));
    }
  }, [location.state]);

  const normalizePhone = (raw) => {
    const phone = raw.replace(/\D/g, '');
    return phone.startsWith('258') ? phone : '258' + phone.slice(-9);
  };

  const calculateAge = (birthDateStr) => {
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Alterando campo ${name}:`, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    const telefoneFormatado = normalizePhone(formData.telefone);

    if (!/^\d{12}$/.test(telefoneFormatado)) {
      setErrors({ telefone: 'Use um número moçambicano válido: +258XXXXXXXXX' });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: 'As senhas não coincidem.' });
      setLoading(false);
      return;
    }

    if (!formData.nome) {
      setErrors({ nome: 'O nome é obrigatório.' });
      setLoading(false);
      return;
    }

    if (!formData.data_nascimento) {
      setErrors({ data_nascimento: 'A data de nascimento é obrigatória.' });
      setLoading(false);
      return;
    }

    const idade = calculateAge(formData.data_nascimento);
    if (formData.user_type === 'client' && idade < 16) {
      setErrors({ data_nascimento: 'Você deve ter pelo menos 16 anos para se registrar como cliente.' });
      setLoading(false);
      return;
    }
    if (formData.user_type === 'driver' && idade < 18) {
      setErrors({ data_nascimento: 'Você deve ter pelo menos 18 anos para se registrar como motorista.' });
      setLoading(false);
      return;
    }

    if (!formData.provincia || formData.provincia.trim() === '') {
      setErrors({ provincia: 'Selecione uma província.' });
      setLoading(false);
      return;
    }

    const provinciaString = String(formData.provincia).trim();

    const registerPayload = {
      telefone: telefoneFormatado,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      user_type: formData.user_type,
      nome: formData.nome,
      data_nascimento: formData.data_nascimento,
      provincia: provinciaString,
    };

    if (formData.user_type === 'driver') {
      if (!formData.veiculo) {
        setErrors({ veiculo: 'O campo veículo é obrigatório para motoristas.' });
        setLoading(false);
        return;
      }

      if (!formData.capacidade_carga) {
        setErrors({ capacidade_carga: 'Informe a capacidade de carga.' });
        setLoading(false);
        return;
      }

      const cartaRegex = /^\d{8}\/\d{1}$/;
      if (!cartaRegex.test(formData.numero_carta_conducao)) {
        setErrors({ numero_carta_conducao: 'Formato inválido. Ex: 12345678/1' });
        setLoading(false);
        return;
      }

      registerPayload.veiculo = formData.veiculo;
      registerPayload.capacidade_carga = formData.capacidade_carga;
      registerPayload.numero_carta_conducao = formData.numero_carta_conducao;
    }

    console.log('DEBUG: formData.provincia =', formData.provincia);
    console.log('✅ Payload enviado:', registerPayload);

    try {
      const response = await AuthService.register(registerPayload);

      if (response.token) {
        // Chama o login do contexto para salvar token e carregar perfil
        await login({
          telefone: telefoneFormatado,
          password: formData.password,
          user_type: formData.user_type,
        });

        setSuccessMessage('Cadastro realizado com sucesso!');
        onRegisterSuccess();

        setTimeout(() => {
          if (isModal) {
            onClose();
          } else {
            const path =
              formData.user_type === 'driver'
                ? '/pre-app-no-navegador-motorista'
                : '/pre-app-no-navegador';
            navigate(path);
          }
        }, 1500);
      }
    } catch (err) {
      const backendErrors = err?.errors || err?.message || {};
      console.error('❌ Erro detalhado no cadastro:', err);

      if (typeof backendErrors === 'string') {
        setErrors({ non_field_errors: backendErrors });
      } else if (typeof backendErrors === 'object') {
        setErrors(backendErrors);
      } else {
        setErrors({ non_field_errors: 'Erro inesperado no cadastro.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => (
    <>
      <AuthTabs
        userType={formData.user_type}
        setUserType={(type) =>
          setFormData((prev) => ({ ...prev, user_type: type === 'driver' ? 'driver' : 'client' }))
        }
      />

      <input
        name="nome"
        placeholder="Nome completo"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      {errors.nome && <div className="error-message">{errors.nome}</div>}

      <input
        type="date"
        name="data_nascimento"
        value={formData.data_nascimento}
        onChange={handleChange}
        required
      />
      {errors.data_nascimento && <div className="error-message">{errors.data_nascimento}</div>}

      <select
        className="select-provincia"
        name="provincia"
        value={formData.provincia}
        onChange={(e) => {
          console.log('Selecionou província:', e.target.value);
          setFormData((prev) => ({ ...prev, provincia: e.target.value }));
          setErrors((prev) => ({ ...prev, provincia: '' }));
        }}
        required
      >
        <option value="">Selecione a Província</option>
        {provincias.map((prov) => (
          <option key={prov} value={prov}>
            {prov}
          </option>
        ))}
      </select>
      {errors.provincia && <div className="error-message">{errors.provincia}</div>}

      <input
        name="telefone"
        placeholder="+258XXXXXXXXX"
        value={formData.telefone}
        onChange={handleChange}
        required
      />
      {errors.telefone && <div className="error-message">{errors.telefone}</div>}

      <input
        type="password"
        name="password"
        placeholder="Senha (Ex: Senha123@)"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <div className="error-message">{errors.password}</div>}

      <input
        type="password"
        name="password_confirmation"
        placeholder="Confirmar Senha"
        value={formData.password_confirmation}
        onChange={handleChange}
        required
      />
      {errors.password_confirmation && (
        <div className="error-message">{errors.password_confirmation}</div>
      )}

      {formData.user_type === 'driver' && (
        <>
          <input
            name="veiculo"
            placeholder="Tipo de Veículo"
            value={formData.veiculo}
            onChange={handleChange}
            required
          />
          {errors.veiculo && <div className="error-message">{errors.veiculo}</div>}

          <input
            name="capacidade_carga"
            placeholder="Capacidade de Carga (kg)"
            value={formData.capacidade_carga}
            onChange={handleChange}
            required
          />
          {errors.capacidade_carga && (
            <div className="error-message">{errors.capacidade_carga}</div>
          )}

          <input
            name="numero_carta_conducao"
            placeholder="Nr da Carta de Condução (Ex: 12345678/1)"
            value={formData.numero_carta_conducao}
            onChange={handleChange}
            required
          />
          {errors.numero_carta_conducao && (
            <div className="error-message">{errors.numero_carta_conducao}</div>
          )}
        </>
      )}

      {errors.non_field_errors && <div className="error-message">{errors.non_field_errors}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </>
  );

  return (
    <div className="page-container">
      <div className="auth-container">
        {!isModal && (
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Voltar
          </button>
        )}

        {isModal ? (
          <div className="login-overlay">
            <div className="auth-modal-container">
              <AuthForm
                title={`Cadastro (${formData.user_type === 'driver' ? 'Motorista' : 'Cliente'})`}
                onSubmit={handleSubmit}
              >
                {renderFormFields()}
              </AuthForm>
            </div>
          </div>
        ) : (
          <AuthForm
            title={`Cadastro (${formData.user_type === 'driver' ? 'Motorista' : 'Cliente'})`}
            onSubmit={handleSubmit}
          >
            {renderFormFields()}
          </AuthForm>
        )}
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  isModal: PropTypes.bool,
  onClose: PropTypes.func,
  onRegisterSuccess: PropTypes.func,
  userType: PropTypes.oneOf(['client', 'driver']),
};

export default RegisterPage;
