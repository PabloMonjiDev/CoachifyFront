import React, { useState, useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import "../assets/styles/Clientes.css";
import "../assets/styles/HomePage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import InfoBasicaForm from "./FormPages/InfoBasicaForm";
import ComposicionCorporalForm from "./FormPages/ComposicionCorporalForm";
import HistorialMedicoForm from "./FormPages/HistorialMedicoForm";
import ObjetivosForm from "./FormPages/ObjetivosForm";

Modal.setAppElement("#root");

const ClientsPage = () => {
  const [clients, setClients] = useState([]); // Estado para almacenar la lista de clientes
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar la apertura y cierre del modal
  const [clientToDelete, setClientToDelete] = useState(null); // Estado para almacenar el ID del cliente a eliminar
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false); // Estado para controlar la apertura y cierre del diálogo de añadir cliente
  const [currentForm, setCurrentForm] = useState("InfoBasicaForm"); // Estado para controlar el formulario actual en el diálogo de añadir cliente
  const [currentClientID, setCurrentClientID] = useState(null); // Estado para almacenar el ID del cliente actual

  useEffect(() => {
    fetchClients(); // Carga los clientes al inciar la página
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/clientes");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleViewClient = (clienteID) => {
    
  };

  const openModal = (clienteID) => {
    console.log("Opening modal for client ID:", clienteID);
    setClientToDelete(clienteID);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setModalIsOpen(false);
    setClientToDelete(null);
  };

  const handleDeleteClient = async () => {
    console.log("Deleting client with ID:", clientToDelete);
    try {
      if (clientToDelete) {
        await axios.delete(
          `http://localhost:8080/api/clientes/${clientToDelete}`
        );
        console.log("Client deleted successfully");
        // Actualiza la lista de clientes después de eliminar
        fetchClients();
        setModalIsOpen(false);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const openAddClientDialog = () => {
    setAddClientDialogOpen(true);
  };

  const closeAddClientDialog = (newClientID) => {
    setAddClientDialogOpen(false);
    fetchClients();
  };

  return (
    <div className="clients-page">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="clients-content">
        <div className="header">
          <h1>Clientes</h1>
          <button className="btnAñadir" onClick={openAddClientDialog}>
            Añadir
          </button>
        </div>
        <hr />
        <br />
        <div className="clients-list">
          {clients.map((client) => (
            <div key={client.clienteID} className="client-card">
              <img
                src={client.img || "https://via.placeholder.com/150"}
                alt={client.nombreCompleto}
                className="client-image"
              />
              <div className="client-details">
                <h2>{client.nombreCompleto}</h2>
                <p>Correo: {client.mail}</p>
                <p>Teléfono: {client.telefono}</p>
              </div>
              <div className="buttons">
                <button
                  onClick={() => handleViewClient(client.clienteID)}
                  className="btnver"
                >
                  <Link to={`/clientes/${client.clienteID}`} className="btnver">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </button>
                <button
                  onClick={() => openModal(client.clienteID)}
                  className="btnEliminar"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmación de eliminación"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "15px",
            width: "25%",
            height: "25%",
            maxWidth: "90%",
            maxHeight: "90%",
            overflowY: "auto",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            textAlign: "center",
          },
        }}
      >
        <p style={{ fontSize: "20px", marginTop: "18px", color: "black" }}>
          ¿Estás seguro de que quieres eliminar este cliente?
        </p>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
          onClick={handleDeleteClient}
        >
          Eliminar
        </button>
        <button
          style={{
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
          onClick={closeModal}
        >
          Cancelar
        </button>
      </Modal>

      <Modal
        isOpen={addClientDialogOpen}
        onRequestClose={closeAddClientDialog}
        contentLabel="Añadir Cliente"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "transparent",
            border: "none",
            borderRadius: "8px",
            width: "45%",
            height: "90%",
            minWidth: "30%",
            overflowY: "auto",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          },
        }}
      >
        {currentForm === "InfoBasicaForm" && (
          <InfoBasicaForm
            onNext={(newClientID) => {
              console.log("New client ID:", newClientID);
              setCurrentClientID(newClientID);
              setCurrentForm("ComposicionCorporalForm");
            }}
            setCurrentClientID={setCurrentClientID}
          />
        )}
        {currentForm === "ComposicionCorporalForm" && (
          <ComposicionCorporalForm
            onNext={() => setCurrentForm("HistorialMedicoForm")}
            clienteID={currentClientID}
          />
        )}
        {currentForm === "HistorialMedicoForm" && (
          <HistorialMedicoForm
            onNext={() => setCurrentForm("ObjetivosForm")}
            clienteID={currentClientID}
          />
        )}
        {currentForm === "ObjetivosForm" && (
          <ObjetivosForm
            onFinish={(newClientID) => closeAddClientDialog(newClientID)}
            clienteID={currentClientID}
          />
        )}
      </Modal>
    </div>
  );
};

export default ClientsPage;
