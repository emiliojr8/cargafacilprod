import React from 'react';
import './Loader.css'; // Crie um ficheiro CSS para estilizar o spinner

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loader;