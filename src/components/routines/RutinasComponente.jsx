import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/RutinasComponente.css";
import EjerciciosComponente from "./EjerciciosComponent";
import RutinaForm from "./RutinaForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const RutinasComponente = ({ clienteID }) => {
  const [rutinas, setRutinas] = useState([]);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const [mostrarEjercicios, setMostrarEjercicios] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchRutinas = async () => {
      try {
        const response = await axios.get(
          `https://coachifybackend-1.onrender.com/api/rutinas/cliente/${clienteID}`
        );
        setRutinas(response.data);
      } catch (error) {
        console.error("Error al cargar las rutinas:", error);
      }
    };

    fetchRutinas();
  }, [clienteID]);

  const handleSeleccionarRutina = (rutinaID) => {
    setRutinaSeleccionada(rutinaID);
    setMostrarEjercicios(true);
  };

  const handleToggleFormulario = (rutina) => {
    setRutinaSeleccionada(rutina);
    setMostrarFormulario(!mostrarFormulario);
    setMostrarEjercicios(false);
  };

  const handleModificar = (rutina) => {
    setRutinaSeleccionada(rutina);
    handleToggleFormulario(rutina);
  };

  const handleEliminar = async (rutina) => {
    try {
      if (!rutina) {
        console.error("No se ha seleccionado ninguna rutina para eliminar.");
        return;
      }

      await axios.delete(
        `https://coachifybackend-1.onrender.com/api/rutinas/${rutina.rutinaID}`
      );
      setRutinas((prevRutinas) =>
        prevRutinas.filter((item) => item.rutinaID !== rutina.rutinaID)
      );
    } catch (error) {
      console.error("Error al eliminar la rutina:", error);
    }
  };

  const actualizarRutinas = (nuevasRutinas) => {
    setRutinas(nuevasRutinas);
  };

  return (
    <div className="rutinas-container">
      {!mostrarEjercicios && (
        <>
          <h1 className="titulo">
            Rutina
            <button
              className="añadir-button"
              onClick={() => handleToggleFormulario(null)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </h1>
          {mostrarFormulario && (
            <RutinaForm
              clienteID={clienteID}
              onClose={() => setMostrarFormulario(false)}
              rutina={rutinaSeleccionada}
              actualizarRutinas={actualizarRutinas}
            />
          )}

          <div className="rutinas-lista">
            {rutinas.map((rutina) => (
              <div key={rutina.rutinaID} className="rutina-link">
                <div className="rutina-card">
                  <h2 className="rutina-nombre">{rutina.nombre}</h2>
                  <div className="botones-accion">
                    <button
                      className="boton-modificar"
                      onClick={() => handleSeleccionarRutina(rutina.rutinaID)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="boton-modificar"
                      onClick={() => handleModificar(rutina)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="boton-eliminar"
                      onClick={() => handleEliminar(rutina)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {mostrarEjercicios && (
        <EjerciciosComponente
          key={rutinaSeleccionada}
          rutinaID={rutinaSeleccionada}
          volverARutinas={() => setMostrarEjercicios(false)}
        />
      )}
    </div>
  );
};

export default RutinasComponente;
