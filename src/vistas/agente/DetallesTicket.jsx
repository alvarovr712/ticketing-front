import { use, useEffect, useState } from "react"
import { obtenerUnTicket } from "../../api/Ticket";
import { useParams } from "react-router-dom";

const DetallesTicket = () => {

    const { id } = useParams();
    const [ticket, setTickets] = useState(null);
    const [error, setError] = useState("");


    useEffect(() => {
        const token = localStorage.getItem('token');

        obtenerUnTicket(token, id)
            .then(datos => setTickets(datos))
            .catch(error => setError(error.message));
    }, [id]);

    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (!ticket) return <p> Cargando ticket...</p>

    return (

        <div className="detalle-ticket">
            <h2>Ticket #{ticket.id}</h2>
            <p><strong>Asunto:</strong> {ticket.asunto}</p>
            <p><strong>Estado:</strong> <span className={`estado-ticket estado-${ticket.estadoTicket.toLowerCase()}`}>{ticket.estadoTicket}</span></p>
            <p><strong>Urgencia:</strong> <span className={`urgencia-ticket urgencia-${ticket.urgencia.toLowerCase()}`}>{ticket.urgencia}</span></p>
            <p><strong>Prioridad:</strong> <span className={`prioridad-ticket prioridad-${ticket.prioridad.toLowerCase()}`}>{ticket.prioridad}</span></p>
            <p><strong>Descripción:</strong> {ticket.descripcion}</p>
            <p><strong>Fecha de creación:</strong> {new Date(ticket.fechaCreacion).toLocaleDateString()}</p>
        </div>

    );
}

export default DetallesTicket;