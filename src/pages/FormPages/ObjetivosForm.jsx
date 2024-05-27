import React, { useState } from "react";
import axios from "axios";
import "../../assets/styles/FormClientes.css";

const ObjetivosForm = ({ onFinish, clienteID }) => {
  const [formData, setFormData] = useState(
    {
      nivelInicial: "",
      obj_cor_pla: "",
      obj_gen: "",
      obj_lar_pla: "",
      observaciones: "",
      preferencias: "",
      cliente: { clienteID: clienteID },
    },
    [clienteID]
  );

  
  // Maneja el cambio en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://coachifybackend-1.onrender.com/api/objetivos",
        formData
      );
      onFinish(response.data.clienteID);
    } catch (error) {
      console.error("Error submitting goals data:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Objetivos y Observaciones</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nivel Inicial:</label>
          <input
            type="text"
            name="nivelInicial"
            value={formData.nivelInicial}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Objetivos a Corto Plazo:</label>
          <input
            type="text"
            name="obj_cor_pla"
            value={formData.obj_cor_pla}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Objetivo General:</label>
          <input
            type="text"
            name="obj_gen"
            value={formData.obj_gen}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Objetivos a Largo Plazo:</label>
          <input
            type="text"
            name="obj_lar_pla"
            value={formData.obj_lar_pla}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Observaciones:</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Preferencias:</label>
          <textarea
            name="preferencias"
            value={formData.preferencias}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <input type="hidden" name="clienteID" value={clienteID} />
        <div className="button-group">
          <button type="submit">Añadir</button>
        </div>
      </form>
    </div>
  );
};

export default ObjetivosForm;
