import React from 'react';
import Mapa from '../components/Mapa'; // Caminho correto para o componente Mapa
import './Mapa.css';

const MapaPage = () => {
    return (
        <div>
            <div className="mapa-header">
                <h1>Veículos Disponíveis</h1>
            </div>
            <Mapa />
        </div>
    );
};

export default MapaPage;

