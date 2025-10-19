import { useEffect, useState } from "react";
import "../../estilos/DetallesTicket.css"; // Puedes reutilizar estilos

const TicketSolicitante = () => {
  const [tickets, setTickets] = useState([]);
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar todos los tickets del solicitante
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

  // Crear un nuevo ticket
  const crearTicket = async () => {
    if (!asunto.trim() || !descripcion.trim()) {
      setError("Debe completar asunto y descripción.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/solicitante/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          asunto,
          descripcion,
        }),
      });

      if (!response.ok) throw new Error("Error al crear el ticket");

      setAsunto("");
      setDescripcion("");
      setMensaje("✅ Ticket creado con éxito");
      setError("");
      cargarTickets();
    } catch (err) {
      setError("❌ No se pudo crear el ticket");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Mis Tickets</h2>

      {/* FORMULARIO PARA CREAR TICKET */}
      <div className="card p-4 mb-4 sombra-suave">
        <h4>Crear nuevo ticket</h4>

        {error && <p className="text-danger">{error}</p>}
        {mensaje && <p className="text-success">{mensaje}</p>}

        <div className="mb-3">
          <label className="form-label"><strong>Asunto</strong></label>
          <input
            type="text"
            className="form-control"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            placeholder="Ej: Problema con el acceso al sistema"
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Descripción</strong></label>
          <textarea
            className="form-control"
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe el problema con detalle..."
          ></textarea>
        </div>

        <button className="btn btn-success" onClick={crearTicket}>
          Enviar Ticket
        </button>
      </div>

      {/* LISTADO DE TICKETS */}
      <h4 className="mb-3">Mis tickets enviados</h4>
      {tickets.length === 0 ? (
        <p>No has creado ningún ticket todavía.</p>
      ) : (
        <ul className="list-group">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="list-group-item">
              <h5>{ticket.asunto}</h5>
              <p>{ticket.descripcion}</p>
              <small>
                Estado: <strong>{ticket.estado}</strong> · Creado el{" "}
                {new Date(ticket.fechaCreacion).toLocaleString("es-ES")}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketSolicitante;
