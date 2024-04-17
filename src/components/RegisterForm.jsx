// RegisterForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import "../styles/RegisterFormStyle.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    mail: "",
    nombreCompleto: "",
    telefono: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await AuthService.register(formData); // Obtener el token del registro
      // Almacenar el token en el localStorage
      localStorage.setItem('jwtToken', token);
      // Redirigir al usuario a la página de inicio de sesión u otra página
      window.location.href = '/home';
    } catch (error) {
      setError(error?.toString() || "Ocurrió un error desconocido");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Registro</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
        <div>
            <label>Nombre y Apellidos:</label>
            <input
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              required
            />
          </div>
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
          <div>
            <label>Correo Electrónico:</label>
            <input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label>Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <p>
          <Link className="linkBtn" to="/">
            ¿Ya tienes una cuenta?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
