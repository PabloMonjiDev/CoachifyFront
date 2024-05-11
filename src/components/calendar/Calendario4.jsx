import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nombreCita, setNombreCita] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFin, setHoraFin] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/calendario");
        const eventosFormateados = res.data.map((evento) => ({
          ...evento,
          start: new Date(evento.fechaInicio),
          end: new Date(evento.fechaFin),
          title: evento.nombreCita,
          id: evento.id,
        }));
        setEventos(eventosFormateados);
      } catch (error) {
        setError("Error al cargar los eventos.");
      }
    };

    fetchEventos();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    const { start, end } = slotInfo;
    setFechaInicio(start);
    setFechaFin(end);
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setEditingEvent(event);
    setNombreCita(event.nombreCita);
    setDescripcion(event.descripcion);
    setFechaInicio(new Date(event.fechaInicio));
    setFechaFin(new Date(event.fechaFin));
    setHoraInicio(moment(event.horaInicio, "HH:mm:ss").toDate());
    setHoraFin(moment(event.horaFin, "HH:mm:ss").toDate());
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      const event = {
        nombreCita,
        descripcion,
        fechaInicio: moment(fechaInicio).format("YYYY-MM-DD"),
        fechaFin: moment(fechaFin).format("YYYY-MM-DD"),
        horaInicio: moment(horaInicio, "HH:mm").format("HH:mm:ss"),
        horaFin: moment(horaFin, "HH:mm").format("HH:mm:ss"),
      };

      if (editingEvent && editingEvent.eventoID) {
        await axios.put(
          `http://localhost:8080/api/calendario/${editingEvent.eventoID}`,
          event
        );
        const updatedEvents = eventos.map((ev) =>
          ev.eventoID === editingEvent.eventoID ? { ...ev, ...event } : ev
        );
        setEventos(updatedEvents);
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/calendario",
          event
        );
        setEventos([...eventos, res.data]);
      }
      handleCloseModal();

      // Después de una inserción o actualización exitosa, volver a obtener la lista de eventos para actualizar el calendario
      const res = await axios.get("http://localhost:8080/api/calendario");
      const eventosFormateados = res.data.map((evento) => ({
        ...evento,
        start: new Date(evento.fechaInicio),
        end: new Date(evento.fechaFin),
        title: evento.nombreCita,
        id: evento.id,
      }));
      setEventos(eventosFormateados);
    } catch (error) {
      setError("Error al enviar el formulario.");
    }
  };

  const resetForm = () => {
    setNombreCita("");
    setDescripcion("");
    setFechaInicio(new Date());
    setFechaFin(new Date());
    setHoraInicio(new Date());
    setHoraFin(new Date());
    setEditingEvent(null);
  };

  const handleDelete = async () => {
    if (editingEvent && editingEvent.eventoID) {
      try {
        await axios.delete(
          `http://localhost:8080/api/calendario/${editingEvent.eventoID}`
        );
        const updatedEvents = eventos.filter(
          (ev) => ev.eventoID !== editingEvent.eventoID
        );
        setEventos(updatedEvents);
        handleCloseModal();
      } catch (error) {
        setError("Error al eliminar el evento.");
      }
    }
  };

  return (
    <div style={{ height: "75%" }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: "1000",
          },
          content: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "transparent",
            padding: "10px",
            border: "none",
            width: "25%",
            height: "86%",
            maxWidth: "90%",
            maxHeight: "90%",
            overflowY: "auto",
            transition: "all 0.3s ease",
          },
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: "15px" }}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editingEvent ? "Actualizar evento" : "Nuevo evento"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <label>Nombre de la cita: </label>
              <input
                type="text"
                className="form-control"
                value={nombreCita}
                onChange={(e) => setNombreCita(e.target.value)}
              />
              <label>Descripción: </label>
              <input
                type="text"
                className="form-control"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <label>Fecha de inicio: </label>
              <input
                type="date"
                className="form-control"
                value={moment(fechaInicio).format("YYYY-MM-DD")}
                onChange={(e) => setFechaInicio(new Date(e.target.value))}
              />
              <label>Fecha de fin: </label>
              <input
                type="date"
                className="form-control"
                value={moment(fechaFin).format("YYYY-MM-DD")}
                onChange={(e) => setFechaFin(new Date(e.target.value))}
              />
              <label>Hora de inicio: </label>
              <input
                type="time"
                className="form-control"
                value={moment(horaInicio).format("HH:mm")}
                onChange={(e) =>
                  setHoraInicio(moment(e.target.value, "HH:mm").toDate())
                }
              />
              <label>Hora de fin: </label>
              <input
                type="time"
                className="form-control"
                value={moment(horaFin).format("HH:mm")}
                onChange={(e) =>
                  setHoraFin(moment(e.target.value, "HH:mm").toDate())
                }
              />
            </div>
            <div className="modal-footer">
              {editingEvent && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger"
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "auto",
                    color: "red",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              )}
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                {editingEvent ? "Actualizar evento" : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Calendario;
