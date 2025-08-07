// src/components/auth/AuthTabs.js
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/auth.css';

const AuthTabs = ({ userType, setUserType }) => {
  return (
    <div className="auth-tabs" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={userType === 'client'}
        className={userType === 'client' ? 'active' : ''}
        onClick={() => setUserType('client')}
      >
        Cliente
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={userType === 'driver'}
        className={userType === 'driver' ? 'active' : ''}
        onClick={() => setUserType('driver')}
      >
        Motorista
      </button>
    </div>
  );
};

AuthTabs.propTypes = {
  userType: PropTypes.oneOf(['client', 'driver']).isRequired,
  setUserType: PropTypes.func.isRequired,
};

export default AuthTabs;
