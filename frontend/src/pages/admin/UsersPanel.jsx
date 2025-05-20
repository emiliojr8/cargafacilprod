// src/pages/admin/UsersPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UsersPanel.css';

export default function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/users/')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="users-panel">
      <h2>Gestão de Usuários</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.user_type}</td>
                <td>
                  <button>Editar</button>
                  <button>Desativar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}