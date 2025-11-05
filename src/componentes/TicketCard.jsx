import { Link } from "react-router-dom";


const TicketCard = ({ ticket, tipo, onDesasignar }) => {


    return (
        <div className="card mb-3 workspace-card" style={{ position: "relative" }}>
            <button
                className="btn-close"
                style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
                onClick={() => onDesasignar(ticket.id)}
                aria-label="Desasignar"
            ></button>
            <div className={`workspace-card-body ticket-${tipo} ${ticket.prioridad?.toLowerCase() === "urgente" ? "ticket-urgente" : ""}`}>
                <h5 className="card-title">
                    <Link
                        to={`/agente/tickets/${ticket.id}`}
                        className="text-decoration-none fw-bold"
                    >
                        {ticket.asunto}
                    </Link>

                </h5>
                <p className="card-text">
                    <strong>Estado:</strong> {ticket.estadoTicket}<br />
                    <strong>Urgencia:</strong> {ticket.urgencia}<br />
                    <strong>Prioridad:</strong> {ticket.prioridad}<br />
                    <strong>Fecha:</strong> {new Date(ticket.fechaCreacion).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default TicketCard;