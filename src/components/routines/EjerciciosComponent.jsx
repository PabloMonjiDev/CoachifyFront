// Componente EjerciciosComponente
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/EjerciciosComponente.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import EjercicioForm from "./EjercicioForm";

const EjerciciosComponente = ({ rutinaID, volverARutinas }) => {
  const [ejercicios, setEjercicios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        if (rutinaID) {
          const response = await axios.get(
            `http://localhost:8080/api/rutinas/${rutinaID}/ejercicios`
          );
          setEjercicios(response.data);
        }
      } catch (error) {
        console.error("Error al cargar los ejercicios:", error);
      }
    };

    fetchEjercicios();
  }, [rutinaID]);

  const handleToggleFormulario = (ejercicio) => {
    setEjercicioSeleccionado(ejercicio);
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleModificar = (ejercicio) => {
    handleToggleFormulario(ejercicio);
  };

  const handleEliminar = async (ejercicio) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/ejercicios/${ejercicio.rutinaEjercicioID}`
      );
      setEjercicios((prevEjercicios) =>
        prevEjercicios.filter(
          (item) => item.rutinaEjercicioID !== ejercicio.rutinaEjercicioID
        )
      );
    } catch (error) {
      console.error("Error al eliminar el ejercicio:", error);
    }
  };

  const handleVolver = () => {
    volverARutinas();
  };

  return (
    <div className="ejercicios-container">
      <h1 className="titulo">
        <button className="volver-button" onClick={handleVolver}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        Ejercicios
        <button
          className="añadir-button"
          onClick={() => handleToggleFormulario(null)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </h1>
      {mostrarFormulario && (
        <EjercicioForm
          rutinaID={rutinaID}
          onClose={() => setMostrarFormulario(false)}
          ejercicio={ejercicioSeleccionado}
          actualizarEjercicios={setEjercicios}
        />
      )}
      <div className="ejercicios-lista">
        {ejercicios.map((ejercicio, index) => (
          <div
            key={ejercicio.rutinaEjercicioID}
            className={`ejercicio-card ${
              index === ejercicios.length - 1 && mostrarFormulario
                ? "ultimo-card-formulario-visible"
                : ""
            }`}
          >
            <img
              src={
                ejercicio.img ||
                "https://via.placeholder.com/150/CCCCCC?text=No hay imagen"
              }
              alt={ejercicio.nombre}
              className="ejercicio-imagen"
            />
            <div className="ejercicio-info">
              <h2 className="ejercicio-nombre">{ejercicio.nombre}</h2>
              <p className="series-repeticiones">
                Series: {ejercicio.series} Repeticiones:{" "}
                {ejercicio.repeticiones}
              </p>
              <div className="botones-accion">
                <button
                  className="boton-modificar"
                  onClick={() => handleModificar(ejercicio)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="boton-eliminar"
                  onClick={() => handleEliminar(ejercicio)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EjerciciosComponente;
