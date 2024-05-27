import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../assets/styles/EjercicioForm.css";

const RutinaForm = ({ onClose, clienteID, actualizarRutinas, rutina }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    clienteID: { clienteID: clienteID },
  });

  useEffect(() => {
    if (rutina) {
      setFormData({
        nombre: rutina.nombre || "",
        clienteID: { clienteID: clienteID },
      });
    }
  }, [rutina, clienteID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (rutina) {
        response = await axios.put(
          `https://coachifybackend-1.onrender.com/api/rutinas/${rutina.rutinaID}`,
          formData
        );
        actualizarRutinas((prevRutinas) =>
          prevRutinas.map((item) =>
            item.rutinaID === rutina.rutinaID ? response.data : item
          )
        );
      } else {
        response = await axios.post(
          "https://coachifybackend-1.onrender.com/api/rutinas",
          formData
        );
        actualizarRutinas((prevRutinas) => [...prevRutinas, response.data]);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting personal data:", error);
    }
  };

  return (
    <div className="formulario-container">
      <h2>{rutina ? "Modificar Rutina" : "Añadir Rutina"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-name">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <input type="hidden" name="clienteID" value={clienteID} />
        <div className="button-group">
          <button type="submit">{rutina ? "Guardar" : "Añadir"}</button>
        </div>
      </form>
    </div>
  );
};

export default RutinaForm;
