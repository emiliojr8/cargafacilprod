// src/pages/admin/ShipmentMap.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Definindo os tipos de props
ShipmentMap.propTypes = {
  shipments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      current_location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired,
      driver: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};

export default function ShipmentMap({ shipments }) {
  return (
    <MapContainer 
      center={[-25.96, 32.58]} 
      zoom={12} 
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shipments.map(shipment => (
        <Marker
          key={shipment.id}
          position={[
            shipment.current_location.lat,
            shipment.current_location.lng
          ]}
        >
          <Popup>
            Frete #{shipment.id} <br/>
            Motorista: {shipment.driver.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}