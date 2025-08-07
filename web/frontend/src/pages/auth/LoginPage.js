// src/pages/LoginForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import AuthTabs from '../../components/auth/AuthTabs';
import '../../styles/auth.css';

const LoginPage = ({
  isModal = false,
  onClose = () => {},
  onLoginSuccess = () => {},
  userType = 'client',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    telefone: '',
    password: '',
    user_type: userType,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.fromRegister) {
      setFormData({
        telefone: location.state.telefone || '+258',
        password: location.state.password || '',
        user_type: location.state.user_type || 'client',
      });
      setSuccessMessage('Cadastro realizado com sucesso! Faça login agora.');
    }
  }, [location.state]);

  const normalizePhone = (raw) => {
    const onlyDigits = raw.replace(/\D/g, '');
    if (onlyDigits.startsWith('258')) return onlyDigits;
    if (/^(82|83|84|85|86|87)\d{7}$/.test(onlyDigits)) {
      return '258' + onlyDigits;
    }
    return onlyDigits;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    const telefoneFormatado = normalizePhone(formData.telefone);

    if (!/^258(82|83|84|85|86|87)\d{7}$/.test(telefoneFormatado)) {
      setErrors({ telefone: 'Número inválido. Use +25882XXXXXXX ou similar.' });
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch('http://localhost:8000/api/auth/web/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          telefone: telefoneFormatado,
        }),
      });

      await resp.json().then((data) => {
        console.log('[Login] Resposta do backend:', data);

        if (resp.ok) {
          localStorage.setItem('cargafacil_auth_token', data.token);
          if (data.refresh) {
            localStorage.setItem('cargafacil_refresh_token', data.refresh);
          }
          if (data.profile) {
            localStorage.setItem('cargafacil_user_profile', JSON.stringify(data.profile));
          }

          setSuccessMessage('Login realizado com sucesso!');
          onLoginSuccess();

          setTimeout(() => {
            const path = formData.user_type === 'driver'
              ? '/pre-app-no-navegador-motorista'
              : '/pre-app-no-navegador';

            if (isModal) onClose();

            navigate(path);
          }, 800);
        } else {
          setErrors(data.errors || { non_field_errors: data.message || 'Credenciais inválidas' });
        }
      });
    } catch (err) {
      console.error('Erro na conexão:', err);
      setErrors({ non_field_errors: 'Erro na conexão com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  const formFields = (
    <>
      <AuthTabs
        userType={formData.user_type}
        setUserType={(type) =>
          setFormData(prev => ({ ...prev, user_type: type }))
        }
      />

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
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <div className="error-message">{errors.password}</div>}

      {errors.non_field_errors && (
        <div className="error-message">{errors.non_field_errors}</div>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </>
  );

  return (
    <>
      {isModal ? (
        <div className="login-overlay">
          <div className="auth-modal-container">
            <button className="fechar-login-x" onClick={onClose}>×</button>
            <AuthForm
              title={`Login (${formData.user_type === 'driver' ? 'Motorista' : 'Cliente'})`}
              onSubmit={handleSubmit}
            >
              {formFields}
            </AuthForm>
          </div>
        </div>
      ) : (
        <div className="auth-page-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Voltar
          </button>
          <AuthForm
            title={`Login (${formData.user_type === 'driver' ? 'Motorista' : 'Cliente'})`}
            onSubmit={handleSubmit}
          >
            {formFields}
          </AuthForm>
        </div>
      )}
    </>
  );
};

LoginPage.propTypes = {
  isModal: PropTypes.bool,
  onClose: PropTypes.func,
  onLoginSuccess: PropTypes.func,
  userType: PropTypes.oneOf(['client', 'driver']),
};

export default LoginPage;
