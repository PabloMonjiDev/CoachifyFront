import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from "react-modal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/Calendario.css";

const localizer = momentLocalizer(moment);

export const messages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango',
  showMore: total => `+ Ver más (${total})`
};

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
        const res = await axios.get("https://coachifybackend-1.onrender.com/api/calendario");
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

  const handleSelectSlot = ({ start, end }) => {
    setFechaInicio(start);
    setFechaFin(end);
    setNombreCita("");
    setDescripcion("");
    setHoraInicio(new Date(start));
    setHoraFin(new Date(end));
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setEditingEvent(event);
    setNombreCita(event.title);
    setDescripcion(event.descripcion);
    setFechaInicio(new Date(event.start));
    setFechaFin(new Date(event.end));
    setHoraInicio(new Date(event.start));
    setHoraFin(new Date(event.end));
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
        horaInicio: moment(horaInicio).format("HH:mm:ss"),
        horaFin: moment(horaFin).format("HH:mm:ss"),
      };

      if (editingEvent && editingEvent.id) {
        await axios.put(
          `https://coachifybackend-1.onrender.com/api/calendario/${editingEvent.id}`,
          event
        );
        const updatedEvents = eventos.map((ev) =>
          ev.id === editingEvent.id ? { ...ev, ...event } : ev
        );
        setEventos(updatedEvents);
      } else {
        const res = await axios.post("https://coachifybackend-1.onrender.com/api/calendario", event);
        setEventos([...eventos, res.data]);
      }
      handleCloseModal();
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
    if (editingEvent && editingEvent.id) {
      try {
        await axios.delete(`https://coachifybackend-1.onrender.com/api/calendario/${editingEvent.id}`);
        const updatedEvents = eventos.filter((ev) => ev.id !== editingEvent.id);
        setEventos(updatedEvents);
        handleCloseModal();
      } catch (error) {
        setError("Error al eliminar el evento.");
      }
    }
  };

  return (
    <div style={{ height: "85%" }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        messages={messages}
      />

      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: "1000",
          },
        }}
        className="custom-modal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingEvent ? "Actualizar evento" : "Nuevo evento"}
              </h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}>
                &times;
              </button>
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
                onChange={(e) => setHoraFin(moment(e.target.value, "HH:mm").toDate())}
              />
            </div>
            <div className="modal-footer">
              {editingEvent && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger"
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
