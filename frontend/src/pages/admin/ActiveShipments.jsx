// src/pages/admin/ActiveShipments.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShipmentMap from './ShipmentMap';
import './ActiveShipments.css';

export default function ActiveShipments() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    axios.get('/api/shipments/active/')
      .then(res => setShipments(res.data));
  }, []);

  return (
    <div className="shipments-container">
      <h2>Fretes Ativos</h2>
      <ShipmentMap shipments={shipments} />
      <div className="shipments-list">
        {shipments.map(shipment => (
          <div key={shipment.id} className="shipment-card">
            <h3>Frete #{shipment.id}</h3>
            <p>Status: {shipment.status}</p>
            <p>Motorista: {shipment.driver.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}