import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate y Link
import AuthService from '../services/AuthService';
import '../styles/LoginFormStyle.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Utiliza el hook useNavigate

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await AuthService.login(formData.username, formData.password);
      navigate('/home'); // Navega a la página de inicio cuando el inicio de sesión sea exitoso
    } catch (error) {
      setError('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre de Usuario:</label>
            <br/>
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
            <br/>
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
        <Link className='linkBtn' to="/register">¿Nuevo usuario?</Link>
      </div>
    </div>
  );
};

export default LoginForm;