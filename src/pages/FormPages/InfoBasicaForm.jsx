import React, { useState } from "react";
import axios from "axios";
import "../../assets/styles/FormClientes.css";

const InfoBasicaForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    img: "",
    nombreCompleto: "",
    genero: "",
    fechaNacimiento: "",
    direccion: "",
    mail: "",
    telefono: "",
  });

  // Maneja los cambios de los inputs y convierte la imagen a base64
  const handleChange = (e) => {
    const { name, value, files } = e.target; // Extrae nombre, valor y archivos del evento
    if (name === "img" && files.length > 0) { // Si el cambio es en el input de imagen y hay archivo seleccionado
      const reader = new FileReader(); // Crea una instancia de FileReader para leer el archivo
      reader.onloadend = () => { // Define qué hacer cuando la lectura del archivo finalice
        setFormData({ ...formData, [name]: reader.result }); // Actualiza el estado del formulario con la imagen codificada en base64
      };
      reader.readAsDataURL(files[0]); // Lee el archivo seleccionado como URL de datos
    } else { // Para otros inputs que no son de imagen
      setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario con el nuevo valor
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/clientes", formData);
      const newClientID = response.data.clienteID; // Obtener el ID del nuevo cliente desde la respuesta
      onNext(newClientID); // Pasar el ID del nuevo cliente a onNext
    } catch (error) {
      console.error("Error submitting personal data:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Datos Personales</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Imagen:</label>
          <input type="file" name="img" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Género:</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button type="submit">Siguiente</button>
        </div>
      </form>
    </div>
  );
};

export default InfoBasicaForm;
