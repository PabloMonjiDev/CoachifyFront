import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/ClienteInfoComponent.css";

const ClienteInfoComponent = () => {
  const [clienteInfo, setClienteInfo] = useState({
    infoBasica: {},
    composicionCorporal: {},
    historialMedico: {},
    objetivos: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoBasicaResponse = await axios.get(
          "https://coachifybackend-1.onrender.com/api/infoBasica"
        );
        const composicionCorporalResponse = await axios.get(
          "https://coachifybackend-1.onrender.com/api/composicionCorporal"
        );
        const historialMedicoResponse = await axios.get(
          "https://coachifybackend-1.onrender.com/api/historialMedico"
        );
        const objetivosResponse = await axios.get(
          "https://coachifybackend-1.onrender.com/api/objetivos"
        );

        setClienteInfo({
          infoBasica: infoBasicaResponse.data,
          composicionCorporal: composicionCorporalResponse.data,
          historialMedico: historialMedicoResponse.data,
          objetivos: objetivosResponse.data,
        });
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cliente-info-container">
      <h2 className="section-title">Información del Cliente</h2>
      <div className="info-section">
        <h3>Información Básica</h3>
        <p>Nombre: {clienteInfo.infoBasica.nombreCompleto}</p>
        <p>Género: {clienteInfo.infoBasica.genero}</p>
        <p>Fecha de Nacimiento: {clienteInfo.infoBasica.fechaNacimiento}</p>
        <p>Dirección: {clienteInfo.infoBasica.direccion}</p>
        <p>Correo Electrónico: {clienteInfo.infoBasica.mail}</p>
        <p>Teléfono: {clienteInfo.infoBasica.telefono}</p>
      </div>
      <div className="info-section">
        <h3>Composición Corporal</h3>
        <p>Altura: {clienteInfo.composicionCorporal.altura}</p>
        <p>
          Circunferencia de Cadera: {clienteInfo.composicionCorporal.cirCadera}
        </p>
        <p>
          Circunferencia de Cintura:{" "}
          {clienteInfo.composicionCorporal.cirCintura}
        </p>
        <p>IMC: {clienteInfo.composicionCorporal.imc}</p>
        <p>Peso: {clienteInfo.composicionCorporal.peso}</p>
        <p>
          Porcentaje de Grasa Corporal:{" "}
          {clienteInfo.composicionCorporal.porcentajeGrasaCorporal}
        </p>
      </div>
      <div className="info-section">
        <h3>Historial Médico</h3>
        <p>Alergias: {clienteInfo.historialMedico.alergias}</p>
        <p>Condiciones: {clienteInfo.historialMedico.condiciones}</p>
        <p>Enfermedades: {clienteInfo.historialMedico.enfermedades}</p>
        <p>Informes Médicos: {clienteInfo.historialMedico.informesMedicos}</p>
        <p>Restricciones: {clienteInfo.historialMedico.restricciones}</p>
      </div>
      <div className="info-section">
        <h3>Objetivos</h3>
        <p>Nivel Inicial: {clienteInfo.objetivos.nivelInicial}</p>
        <p>Objetivo a Corto Plazo: {clienteInfo.objetivos.objCortoPlazo}</p>
        <p>Objetivo General: {clienteInfo.objetivos.objGeneral}</p>
        <p>Objetivo a Largo Plazo: {clienteInfo.objetivos.objLargoPlazo}</p>
        <p>Observaciones: {clienteInfo.objetivos.observaciones}</p>
        <p>Preferencias: {clienteInfo.objetivos.preferencias}</p>
      </div>
    </div>
  );
};

export default ClienteInfoComponent;
