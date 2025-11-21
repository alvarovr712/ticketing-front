import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketHistorial = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const cargarTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/solicitante/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener tickets");

      const data = await response.json();
      setTickets(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

// Función para asignar color según el estado (segura ante estados indefinidos)
const estadoColor = (estado) => {
  if (!estado) return "badge bg-light text-dark"; // fallback

  switch (estado.toLowerCase()) {
    case "abierto":
      return "badge bg-primary";
    case "en proceso":
      return "badge bg-warning text-dark";
    case "resuelto":
      return "badge bg-success";
    case "cerrado":
      return "badge bg-secondary";
    default:
      return "badge bg-light text-dark";
  }
};


  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Historial de Tickets</h2>

      {error && <p className="text-danger">{error}</p>}

      {tickets.length === 0 ? (
        <p className="text-center text-muted">No has creado ningún ticket todavía.</p>
      ) : (
        <div className="row">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="col-md-6 col-lg-4 mb-4"
            >
              <div
                className="card shadow-sm h-100 cursor-pointer"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => navigate(`/solicitante/tickets/${ticket.id}`)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ticket.asunto}</h5>
                  <p className="card-text text-truncate" style={{ maxHeight: "4.5em", overflow: "hidden" }}>
                    {ticket.descripcion}
                  </p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className={estadoColor(ticket.estado)}>{ticket.estado}</span>
                    <small className="text-muted">
                      {new Date(ticket.fechaCreacion).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketHistorial;
