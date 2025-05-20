import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/auth.css'; // Caminho permanece o mesmo

const AuthTabs = ({ userType, setUserType }) => {
  return (
    <div className="auth-tabs">
      <button
        type="button"
        className={userType === 'client' ? 'active' : ''}
        onClick={() => setUserType('client')}
      >
        Cliente
      </button>
      <button
        type="button"
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
