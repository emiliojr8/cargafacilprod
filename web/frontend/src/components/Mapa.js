import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../pages/Mapa.css'; // Importe o arquivo CSS

// Ícone personalizado para a localização do usuário
const minhaLocalizacaoIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png', // Ícone amarelo
    iconSize: [25, 41], // Tamanho do ícone
    iconAnchor: [12, 41], // Ponto de ancoragem do ícone
    popupAnchor: [1, -34], // Posição do popup
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41], // Tamanho da sombra
});

const Mapa = () => {
    const mapRef = useRef(null); // Referência para o mapa
    const [userLocation, setUserLocation] = useState(null); // Localização do usuário

    // Função para obter a localização atual do usuário
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]); // Atualiza a localização do usuário
                    if (mapRef.current) {
                        mapRef.current.flyTo([latitude, longitude], 13); // Centraliza o mapa na localização do usuário
                    }
                },
                (error) => {
                    console.error('Erro ao obter localização:', error);
                }
            );
        } else {
            console.error('Geolocalização não suportada pelo navegador.');
        }
    };

    return (
        <div className="mapa-container">
            <MapContainer
                center={[-25.9689, 32.5694]} // Coordenadas iniciais (Maputo, Moçambique)
                zoom={13}
                style={{ height: '100vh', width: '100%' }}
                zoomControl={false} // Desativa o controle de zoom padrão
                ref={mapRef} // Referência para o mapa
            >
                {/* TileLayer com tema padrão */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Controle de zoom personalizado */}
                <div className="leaflet-control-custom-zoom">
                    <button onClick={() => mapRef.current.zoomIn()}>+</button>
                    <button onClick={() => mapRef.current.zoomOut()}>-</button>
                </div>

                {/* Botão de localização personalizado */}
                <div className="leaflet-control-custom-location">
                    <button onClick={getUserLocation}>📍</button>
                </div>

                {/* Marcador da localização do usuário */}
                {userLocation && (
                    <Marker position={userLocation} icon={minhaLocalizacaoIcon}>
                        <Popup>Minha localização</Popup>
                    </Marker>
                )}

                {/* Exemplo de marcadores (substitua por dados reais) */}
                <Marker position={[-25.9689, 32.5694]}>
                    <Popup>Exemplo de marcador</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Mapa;