import React, { useState } from "react";
import axios from "axios";
import "../../assets/styles/FormClientes.css";

const HistorialMedicoForm = ({ onNext, clienteID }) => {
  const [formData, setFormData] = useState({
    alergias: "",
    condiciones: "",
    enfermedades: "",
    informesMedicos: "",
    restricciones: "",
    cliente: {clienteID: clienteID},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://coachifybackend-1.onrender.com/api/historialMedico",
        formData
      );
      onNext();
    } catch (error) {
      console.error("Error submitting medical history data:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Historial Médico</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Alergias:</label>
          <input
            type="text"
            name="alergias"
            value={formData.alergias}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Condiciones Médicas:</label>
          <input
            type="text"
            name="condicionesMedicas"
            value={formData.condiciones}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Enfermedades:</label>
          <input
            type="text"
            name="enfermedades"
            value={formData.enfermedades}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Informes Médicos:</label>
          <textarea
            name="informesMedicos"
            value={formData.informesMedicos}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Restricciones:</label>
          <textarea
            name="restricciones"
            value={formData.restricciones}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <input type="hidden" name="clienteID" value={clienteID} />
        <div className="button-group">          
          <button type="submit">Siguiente</button>
        </div>
      </form>
    </div>
  );
};

export default HistorialMedicoForm;
