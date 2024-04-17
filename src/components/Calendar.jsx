// Importamos las dependencias necesarias
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendar.css';

// Configuramos el localizador para el calendario con moment
const localizer = momentLocalizer(moment);

// Definimos el componente CalendarComponent
const CalendarComponent = () => {
    // Definimos el estado para los eventos, los detalles del evento y el recordatorio
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [reminder, setReminder] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);

    // En el useEffect, solicitamos permiso para notificaciones y obtenemos los eventos iniciales
    useEffect(() => {
        // Solicitamos permiso para notificaciones
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                console.log("Notificaciones permitidas");
            } else {
                console.log("Notificaciones no permitidas");
            }
        });

        // Obtenemos los eventos desde la API
        axios.get('http://localhost:8080/api/calendario')
            .then(response => setEvents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleOpenDialog = (slotInfo) => {
        setStart(slotInfo.start);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // Definimos la función handleSubmit que se llama cuando se envía el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { title, start, end, reminder };
        // Enviamos una solicitud POST a la API para agregar el evento
        axios.post('http://localhost:8080/api/calendario', newEvent)
            .then(response => {
                // Actualizamos el estado con el nuevo evento
                setEvents([...events, response.data]);
                // Mostramos una notificación de que el evento ha sido agregado
                new Notification('Evento agregado', { body: `Se ha agregado el evento ${title}` });
                // Si se ha establecido un recordatorio, configuramos un temporizador para mostrar una notificación
                if (reminder) {
                    const reminderTime = new Date(reminder).getTime();
                    const now = new Date().getTime();
                    const delay = reminderTime - now;
                    if (delay > 0) {
                        setTimeout(() => {
                            new Notification('Recordatorio de evento', { body: `El evento ${title} está programado para comenzar pronto` });
                        }, delay);
                    }
                }
            })
            .catch(error => console.error(error));
    };

    // Definimos la función handleSelectEvent que se llama cuando se selecciona un evento
    const handleSelectEvent = (event) => {
        // Actualizamos el estado con los detalles del evento seleccionado
        setSelectedEvent(event);
        setTitle(event.title);
        setStart(event.start);
        setEnd(event.end);
        setReminder(event.reminder);
    };

    // Definimos la función handleUpdateEvent que se llama cuando se hace clic en el botón "Actualizar evento"
    const handleUpdateEvent = () => {
        // Actualizamos el evento seleccionado enviando una solicitud PUT a la API
        const updatedEvent = { title, start, end, reminder };
        axios.put(`http://localhost:8080/api/calendario/${selectedEvent.id}`, updatedEvent)
            .then(response => {
                // Actualizamos el estado con el evento actualizado
                const updatedEvents = events.map(event => 
                    event.id === selectedEvent.id ? response.data : event
                );
                setEvents(updatedEvents);
                // Mostramos una notificación de que el evento ha sido actualizado
                new Notification('Evento actualizado', { body: `Se ha actualizado el evento ${title}` });
            })
            .catch(error => console.error(error));
    };

    // Definimos la función handleDeleteEvent que se llama cuando se hace clic en el botón "Eliminar evento"
    const handleDeleteEvent = () => {
        // Eliminamos el evento seleccionado enviando una solicitud DELETE a la API
        axios.delete(`http://localhost:8080/api/calendario/${selectedEvent.id}`)
            .then(() => {
                // Actualizamos el estado para eliminar el evento
                setEvents(events.filter(event => event.id !== selectedEvent.id));
                // Mostramos una notificación de que el evento ha sido eliminado
                new Notification('Evento eliminado', { body: `Se ha eliminado el evento ${title}` });
            })
            .catch(error => console.error(error));
    };

    // Devolvemos el JSX para el componente
    return (
        <div className="calendar-container">
            <Dialog open={open} onClose={handleCloseDialog}>
                <form onSubmit={handleSubmit} className="calendar-form">
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título del evento" required />
                    <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required />
                    <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required />
                    <input type="datetime-local" value={reminder} onChange={e => setReminder(e.target.value)} placeholder="Tiempo del recordatorio" />
                    <button type="submit">Agregar evento</button>
                    {selectedEvent && (
                        <>
                            <button onClick={handleUpdateEvent}>Actualizar evento</button>
                            <button onClick={handleDeleteEvent}>Eliminar evento</button>
                        </>
                    )}
                </form>
            </Dialog>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleOpenDialog}
                style={{ height: 500 }}
            />
        </div>
    );
};

// Exportamos el componente
export default CalendarComponent;