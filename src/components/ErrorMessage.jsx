import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import ErrorMessage from './ErrorMessage';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { token } = await AuthService.login(formData.username, formData.password);
      // Aquí puedes guardar el token en el estado global, local storage, o en las cookies
      console.log('Token:', token);
      // Luego puedes redirigir al usuario a la página principal o a donde desees
    } catch (error) {
      setError(error.toString()); // Convertimos el error a un string
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;