import React from 'react';
import { FaCity, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa'; // Ícones modernos
import './Cidades.css';

const Cidades = () => {
    return (
        <div className="cidades-container">
            {/* Título Principal */}
            <h1 className="cidades-titulo">Cidades Atendidas pela CargaFácil</h1>

            {/* Cards das Cidades */}
            <div className="cidades-cards">
                {/* Card Maputo */}
                <div className="cidade-card maputo">
                    <FaCity className="cidade-icon" />
                    <h2>Maputo</h2>
                    <p>
                        A capital de Moçambique, conhecida por sua cultura vibrante, praias deslumbrantes
                        e centro financeiro do país.
                    </p>
                </div>

                {/* Card Matola */}
                <div className="cidade-card matola">
                    <FaMapMarkerAlt className="cidade-icon" />
                    <h2>Matola</h2>
                    <p>
                        Uma cidade em crescimento, próxima a Maputo, com um importante parque industrial
                        e uma rica história cultural.
                    </p>
                </div>

                {/* Card Beira */}
                <div className="cidade-card beira">
                    <FaBuilding className="cidade-icon" />
                    <h2>Beira</h2>
                    <p>
                        A segunda maior cidade de Moçambique, famosa por seu porto estratégico e arquitetura
                        colonial.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cidades;