import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import AuthTabs from '../../components/auth/AuthTabs';
import AuthService from '../../services/AuthService';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') || 'client';

  const [formData, setFormData] = useState({
    username: '',
    telefone: '',
    password: '',
    password_confirmation: '',
    user_type: defaultType
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const payload = { ...formData };
      const response = await AuthService.register(payload);

      if (response.token) {
        setSuccessMessage('Cadastro realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      const backendErrors = err.response?.data || {};
      const parsedErrors = {};

      for (const key in backendErrors) {
        if (Array.isArray(backendErrors[key])) {
          parsedErrors[key] = backendErrors[key][0];
        }
      }

      setErrors(parsedErrors);
      console.error('Erro detalhado no registro:', backendErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title={`Cadastro (${formData.user_type === 'driver' ? 'Motorista' : 'Cliente'})`}
      onSubmit={handleSubmit}
    >
      <AuthTabs
        userType={formData.user_type}
        setUserType={(type) =>
          setFormData(prev => ({ ...prev, user_type: type }))
        }
      />

      <input
        name="username"
        placeholder="Nome de usuário"
        value={formData.username}
        onChange={handleChange}
        required
        minLength={3}
      />
      {errors.username && <div className="error-message">{errors.username}</div>}

      <input
        name="telefone"
        placeholder="Telefone (258XXXXXXXXX)"
        value={formData.telefone}
        onChange={handleChange}
        required
        pattern="258[0-9]{9}"
        title="Número deve começar com 258 e ter 12 dígitos"
      />
      {errors.telefone && <div className="error-message">{errors.telefone}</div>}

      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={8}
      />
      {errors.password && <div className="error-message">{errors.password}</div>}

      <input
        type="password"
        name="password_confirmation"
        placeholder="Confirmar senha"
        value={formData.password_confirmation}
        onChange={handleChange}
        required
      />
      {errors.password_confirmation && (
        <div className="error-message">{errors.password_confirmation}</div>
      )}

      {errors.non_field_errors && (
        <div className="error-message">{errors.non_field_errors}</div>
      )}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </AuthForm>
  );
};

export default RegisterPage;
