import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/EjercicioForm.css";

const EjercicioForm = ({ onClose, rutinaID, actualizarEjercicios, ejercicio }) => {
  const [formData, setFormData] = useState({
    img: "",
    nombre: "",
    series: "",
    repeticiones: "",
    rutinaID: { rutinaID: rutinaID },
  });

  useEffect(() => {
    if (ejercicio) {
      setFormData({
        img: ejercicio.img || "",
        nombre: ejercicio.nombre || "",
        series: ejercicio.series || "",
        repeticiones: ejercicio.repeticiones || "",
        rutinaID: { rutinaID: rutinaID },
      });
    }
  }, [ejercicio, rutinaID]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let response;
    if (ejercicio) {

      response = await axios.put(
        `https://coachifybackend-1.onrender.com/api/ejercicios/${ejercicio.rutinaEjercicioID}`,
        formData
      );
      actualizarEjercicios((prevEjercicios) =>
        prevEjercicios.map((item) =>
          item.rutinaEjercicioID === ejercicio.rutinaEjercicioID ? response.data : item
        )
      );
    } else {
      // Si es un nuevo ejercicio
      response = await axios.post("https://coachifybackend-1.onrender.com/api/ejercicios", formData);
      // Actualiza el estado de ejercicios utilizando los datos devueltos por la API
      actualizarEjercicios((prevEjercicios) => [...prevEjercicios, response.data]);
    }
    onClose();
  } catch (error) {
    console.error("Error submitting personal data:", error);
  }
};

  return (
    <div className="formulario-container">
      <h2>{ejercicio ? "Modificar Ejercicio" : "Añadir Ejercicio"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-img">
            <label>Imagen:</label>
            <input type="file" name="img" onChange={handleChange} />
          </div>
          <div className="form-name">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-info">
            <label>Series:</label>
            <input
              type="number"
              name="series"
              value={formData.series}
              onChange={handleChange}
              required
            />
            <label>Repeticiones:</label>
            <input
              type="number"
              name="repeticiones"
              value={formData.repeticiones}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <input type="hidden" name="rutinaID" value={rutinaID} />
        <div className="button-group">
          <button type="submit">{ejercicio ? "Guardar" : "Añadir"}</button>
        </div>
      </form>
    </div>
  );
};

export default EjercicioForm;
