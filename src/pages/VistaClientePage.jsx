import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import "../assets/styles/VistaClientePage.css";
import RutinasComponente from "../components/routines/RutinasComponente";
import "../assets/styles/ClienteInfoComponent.css";
import GraficoComponente from "../components/GraficoComponente";
import Sidebar from "../components/common/Sidebar";

// Configura el elemento raíz de la aplicación para el Modal
Modal.setAppElement("#root");

const VistaClientePage = () => {
  const { clienteID } = useParams();
  const [clienteInfo, setClienteInfo] = useState({
    infoBasica: {},
    composicioncorporal: {},
    historialMedico: {},
    objetivos: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoBasicaPromise = axios.get(
          `https://coachifybackend-1.onrender.com/api/clientes/${clienteID}`
        );
        const composicionCorporalPromise = axios.get(
          `https://coachifybackend-1.onrender.com/api/composicioncorporal/cliente/${clienteID}`
        );
        const historialMedicoPromise = axios.get(
          `https://coachifybackend-1.onrender.com/api/historialMedico/cliente/${clienteID}`
        );
        const objetivosPromise = axios.get(
          `https://coachifybackend-1.onrender.com/api/objetivos/cliente/${clienteID}`
        );

        // Espera a que todas las promesas se resuelvan
        const [
          infoBasicaResponse,
          composicionCorporalResponse,
          historialMedicoResponse,
          objetivosResponse,
        ] = await Promise.all([
          infoBasicaPromise,
          composicionCorporalPromise,
          historialMedicoPromise,
          objetivosPromise,
        ]);

        // Actualiza el estado con la información
        setClienteInfo({
          infoBasica: infoBasicaResponse.data,
          composicioncorporal: composicionCorporalResponse.data,
          historialMedico: historialMedicoResponse.data,
          objetivos: objetivosResponse.data,
        });
      } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
      }
    };

    fetchData();
  }, [clienteID]);

  const [modalOpen, setModalOpen] = useState(false);
  const [nuevoPeso, setNuevoPeso] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [pesosData, setPesosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://coachifybackend-1.onrender.com/api/pesos/cliente/${clienteID}`
        );
        // Actualiza el estado con los pesos obtenidos
        setPesosData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de los pesos:", error);
      }
    };

    fetchData();
  }, [clienteID]);

  const handleAñadirPeso = async () => {
    try {
      const response = await axios.post("https://coachifybackend-1.onrender.com/api/pesos", {
        clienteID: { clienteID: clienteID },
        peso: nuevoPeso,
        fecha: nuevaFecha,
      });
      // Actualiza el estado con el nuevo peso añadido
      setPesosData([...pesosData, response.data]);
    } catch (error) {
      console.error("Error al añadir el peso:", error);
    }

    setModalOpen(false);
  };

  const [activeTab, setActiveTab] = useState("progreso");

  return (
    <div className="contenedor">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="contenedor-pagina">
        {/* COMPONENTE INFORMACION */}
        <div className="arriba">
          <div className="informacion-seccion-basica">
            <div className="info-cliente">
              <div className="info-detalle">
                <div className="img-container">
                  <img
                    className="img-profile"
                    src={clienteInfo.infoBasica.img}
                    alt={clienteInfo.infoBasica.nombreCompleto}
                  />
                </div>
                <div className="info-detalle-right">
                  <p>
                    <strong>Género:</strong> {clienteInfo.infoBasica.genero}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {new Date(
                      clienteInfo.infoBasica.fechaNacimiento
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="info-detalle-left">
                <p>
                  <strong>Nombre:</strong>{" "}
                  {clienteInfo.infoBasica.nombreCompleto}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong>{" "}
                  {clienteInfo.infoBasica.mail}
                </p>
                <p>
                  <strong>Dirección:</strong> {clienteInfo.infoBasica.direccion}
                </p>
                <p>
                  <strong>Teléfono:</strong> {clienteInfo.infoBasica.telefono}
                </p>
              </div>
            </div>
          </div>
          <div className="informacion-seccion-historial">
            <h2 className="seccion-titulo">Historial Médico</h2>
            <div className="info-historial">
              <p>
                <strong>Alergias:</strong>{" "}
                {clienteInfo.historialMedico.alergias}
              </p>
              <p>
                <strong>Condiciones:</strong>{" "}
                {clienteInfo.historialMedico.condiciones}
              </p>
              <p>
                <strong>Enfermedades:</strong>{" "}
                {clienteInfo.historialMedico.enfermedades}
              </p>
              <p>
                <strong>Informes Médicos:</strong>{" "}
                {clienteInfo.historialMedico.informesMedicos}
              </p>
              <p>
                <strong>Restricciones:</strong>{" "}
                {clienteInfo.historialMedico.restricciones}
              </p>
            </div>
          </div>
          <div className="informacion-seccion-objetivos">
            <h2 className="seccion-titulo">Objetivos</h2>
            <div className="info-objetivos">
              <p>
                <strong>Nivel Inicial:</strong>{" "}
                {clienteInfo.objetivos.nivelInicial}
              </p>
              <p>
                <strong>Objetivo a Corto Plazo:</strong>{" "}
                {clienteInfo.objetivos.objCortoPlazo}
              </p>
              <p>
                <strong>Objetivo General:</strong>{" "}
                {clienteInfo.objetivos.objGeneral}
              </p>
              <p>
                <strong>Objetivo a Largo Plazo:</strong>{" "}
                {clienteInfo.objetivos.objLargoPlazo}
              </p>
              <p>
                <strong>Observaciones:</strong>{" "}
                {clienteInfo.objetivos.observaciones}
              </p>
              <p>
                <strong>Preferencias:</strong>{" "}
                {clienteInfo.objetivos.preferencias}
              </p>
            </div>
          </div>
        </div>

        {/* COMPONENTE PROGRESO */}
        <div className="abajo">
          <div className="tab-container">
            <div
              className={`tab ${activeTab === "progreso" ? "active" : ""}`}
              onClick={() => setActiveTab("progreso")}
            >
              Progreso
            </div>
            <div
              className={`tab ${activeTab === "rutinas" ? "active" : ""}`}
              onClick={() => setActiveTab("rutinas")}
            >
              Rutinas
            </div>
          </div>
          <div className="content-container">
            {activeTab === "progreso" && (
              <div
              className={`progreso-container ${
                activeTab === "progreso" ? "active" : ""
              }`}
            >
              <div className="grafico-composicion-wrapper">
                <div className="grafico-container">
                  <GraficoComponente pesosData={pesosData} clienteID={clienteID} />
                  <div className="acciones-container">
                    <button onClick={() => setModalOpen(true)}>Añadir Peso</button>
                  </div>
                </div>
                <div className="composicion-container">
                  <h3>Composición Corporal</h3>
                  <p>Altura: {clienteInfo.composicioncorporal.altura}</p>
                  <p>Circunferencia de Cadera: {clienteInfo.composicioncorporal.cirCadera}</p>
                  <p>Circunferencia de Cintura: {clienteInfo.composicioncorporal.cirCintura}</p>
                  <p>IMC: {clienteInfo.composicioncorporal.imc}</p>
                  <p>Peso: {clienteInfo.composicioncorporal.peso}</p>
                  <p>Porcentaje de Grasa Corporal: {clienteInfo.composicioncorporal.porcentajeGrasaCorporal}</p>
                </div>
              </div>
            </div>
            )}
            {activeTab === "rutinas" && (
              <div
                className={`rutinas-container ${
                  activeTab === "rutinas" ? "active" : ""
                }`}
              >
                <RutinasComponente clienteID={clienteID} />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal para añadir peso */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Añadir Peso"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#333",
            border: "none",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "300px",
            width: "90%",
            color: "white",
          },
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Añadir Peso
        </h2>
        <form onSubmit={handleAñadirPeso}>
          <label
            htmlFor="peso"
            style={{ marginBottom: "10px", display: "block" }}
          >
            Peso:
          </label>
          <input
            type="text"
            id="peso"
            value={nuevoPeso}
            onChange={(e) => setNuevoPeso(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
            }}
          />
          <label
            htmlFor="fecha"
            style={{ marginBottom: "10px", display: "block" }}
          >
            Fecha:
          </label>
          <input
            type="date"
            id="fecha"
            value={nuevaFecha}
            onChange={(e) => setNuevaFecha(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ced4da",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#ffd700",
              color: "white",
              padding: "10px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
            className="btn-guardar"
          >
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default VistaClientePage;
