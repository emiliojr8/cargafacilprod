// src/components/auth/AuthForm.js
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/auth.css';

const AuthForm = ({ children, title, onSubmit }) => (
  <div className="page-container">
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>
        <form onSubmit={onSubmit} className="auth-form">
          {children}
        </form>
      </div>
    </div>
  </div>
);

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthForm;
