import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import AuthTabs from '../../components/auth/AuthTabs';
import AuthService from '../../services/AuthService';

const LoginPage = ({ isModal = false, onClose = () => {}, onLoginSuccess = () => {}, userType = 'client' }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrPhone: '',
    password: '',
    user_type: userType
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await AuthService.login(formData);

      if (response.token) {
        setSuccessMessage('Login realizado com sucesso!');
        onLoginSuccess();

        setTimeout(() => {
          const path = formData.user_type === 'driver'
            ? '/pre-app-no-navegador-motorista'
            : '/pre-app-no-navegador';

          if (isModal) {
            onClose();
          }
          navigate(path);
        }, 1500);
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
      console.error('Erro detalhado no login:', backendErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isModal && (
        <div className="login-overlay">
          <div className="auth-modal-container">
            <button 
              className="fechar-login-x"
              onClick={onClose}
            >
              ×
            </button>
            <AuthForm
              title={`Login (${formData.user_type === 'driver' ? 'Motorista' : 'Cliente'})`}
              onSubmit={handleSubmit}
            >
              <AuthTabs
                userType={formData.user_type}
                setUserType={(type) =>
                  setFormData(prev => ({ ...prev, user_type: type }))
                }
              />

              <input
                name="usernameOrPhone"
                placeholder="Nome ou Telefone"
                value={formData.usernameOrPhone}
                onChange={handleChange}
                required
              />
              {errors.usernameOrPhone && <div className="error-message">{errors.usernameOrPhone}</div>}

              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <div className="error-message">{errors.password}</div>}

              {errors.non_field_errors && <div className="error-message">{errors.non_field_errors}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}

              <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </AuthForm>
          </div>
        </div>
      )}

      {!isModal && (
        <AuthForm
          title={`Login (${formData.user_type === 'driver' ? 'Motorista' : 'Cliente'})`}
          onSubmit={handleSubmit}
        >
          <AuthTabs
            userType={formData.user_type}
            setUserType={(type) =>
              setFormData(prev => ({ ...prev, user_type: type }))
            }
          />

          <input
            name="usernameOrPhone"
            placeholder="Nome ou Telefone"
            value={formData.usernameOrPhone}
            onChange={handleChange}
            required
          />
          {errors.usernameOrPhone && <div className="error-message">{errors.usernameOrPhone}</div>}

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}

          {errors.non_field_errors && <div className="error-message">{errors.non_field_errors}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </AuthForm>
      )}
    </>
  );
};

LoginPage.propTypes = {
  isModal: PropTypes.bool,
  onClose: PropTypes.func,
  onLoginSuccess: PropTypes.func,
  userType: PropTypes.oneOf(['client', 'driver'])
};

export default LoginPage;
