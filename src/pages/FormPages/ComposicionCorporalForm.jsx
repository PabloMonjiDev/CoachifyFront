import React, { useState } from "react";
import axios from "axios";
import "../../assets/styles/FormClientes.css";

const ComposicionCorporalForm = ({ onNext, clienteID }) => {
  const [formData, setFormData] = useState({
    altura: "",
    cirCadera: "",
    cirCintura: "",
    imc: "",
    peso: "",
    por_gra_cor: "",
    // le pasa la id del cliente como objeto
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
        "http://localhost:8080/api/composicioncorporal",
        formData
      );

      console.log("Composición Corporal data submitted:", formData);

      // Envia el peso insertado, la fecha actual y la id del cliente a la grafica de pesos
      await axios.post(
        "http://localhost:8080/api/pesos",
        {
          peso: formData.peso,
          clienteID: { clienteID: formData.cliente.clienteID },
          fecha: new Date().toISOString(),
        }
      );
        
      onNext();
    } catch (error) {
      console.error("Error submitting body composition data:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Composición Corporal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Altura (cm):</label>
          <input
            type="number"
            name="altura"
            value={formData.altura}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Circunferencia de Cadera (cm):</label>
          <input
            type="number"
            name="cirCadera"
            value={formData.cirCadera}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Circunferencia de Cintura (cm):</label>
          <input
            type="number"
            name="cirCintura"
            value={formData.cirCintura}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Índice de Masa Corporal (IMC):</label>
          <input
            type="number"
            name="imc"
            value={formData.imc}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Peso (kg):</label>
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Porcentaje de Grasa Corporal:</label>
          <input
            type="number"
            name="por_gra_cor"
            value={formData.por_gra_cor}
            onChange={handleChange}
          />
        </div>
        <input type="hidden" name="clienteID" value={clienteID} />
        <div className="button-group">
          <button type="submit">Siguiente</button>
        </div>
      </form>
    </div>
  );
};

export default ComposicionCorporalForm;
