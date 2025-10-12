import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TicketsUsuario = () => {
  const { usuarioId } = useParams();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/usuarios/${usuarioId}/tickets`);
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error al cargar tickets:", error);
      }
    };

    fetchTickets();
  }, [usuarioId]);

  return (
    <div>
      <h2>Tickets del usuario #{usuarioId}</h2>
      {tickets.length === 0 ? (
        <p>Este usuario no tiene tickets abiertos.</p>
      ) : (
        <ul className="list-group">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="list-group-item">
              <strong>{ticket.titulo}</strong>
              <p>{ticket.descripcion}</p>
              <small>Estado: {ticket.estado}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketsUsuario;