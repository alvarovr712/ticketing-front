import { useEffect, useState } from "react";
import { obtenerTicketsAsignados, dropearTicket } from "../../api/Ticket";
import "../../estilos/Workspace.css";
import TicketCard from "../../componentes/TicketCard";



const AgenteWorkspace = () => {
  const [tickets, setTickets] = useState([]);
  const tipoVista = "agente";

  useEffect(() => {
    const cargarTickets = async () => {
      const token = localStorage.getItem("token");
      const id_usuario = localStorage.getItem("id_usuario");

      if (!token || !id_usuario) return;

      try {
        const asignados = await obtenerTicketsAsignados(token, id_usuario);

        const ticketsConResponde = asignados.map(ticket => {
          const anotaciones = ticket.anotaciones || [];
          const anotacionFinal = anotaciones.length > 0 ? anotaciones[anotaciones.length - 1] : null;

          let responde = "agente";

          if (anotacionFinal?.usuario?.perfil?.nombre === "AGENTE") {
            const visibilidad = anotacionFinal.visibilidadTicket;
            responde = visibilidad === 0 ? "tecnico" : "solicitante";
          }

          return { ...ticket, responde, anotacionFinal };
        });

        setTickets(ticketsConResponde);
      } catch (error) {
        console.error("Error al obtener tickets asignados:", error);
      }
    };

    cargarTickets();
    const intervalo = setInterval(cargarTickets, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const dropearUnTicket = async (ticketId) => {
    const token = localStorage.getItem("token");
    try {
      await dropearTicket(token, ticketId);
      setTickets(prev => prev.filter(t => t.id !== ticketId));
    } catch (error) {
      console.error("Error al desasignar ticket:", error);
    }
  };

  const ticketsAgente = tickets.filter(t => t.responde === "agente");
  const ticketsSolicitante = tickets.filter(t => t.responde === "solicitante");
  const ticketsTecnico = tickets.filter(t => t.responde === "tecnico");

  const renderColumn = (titulo, tickets) => (
    <div  className="col-md-4 workspace-column">
      <h4 className="text-center mb-3">{titulo}</h4>
      {tickets.length === 0 ? (
        <div className="alert alert-secondary">Sin tickets</div>
      ) : (
        tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} tipo={tipoVista} onDesasignar={dropearUnTicket} />
        ))
      )}
    </div>
  );

 return (
  <div className="workspace-container">
    <h2 className="mb-4 text-center">Workspace</h2>
    <div className="workspace-scroll-area">
      <div className="row mt-3">
        {renderColumn("Responde Agente", ticketsAgente, "agente")}
        {renderColumn("Responde Solicitante", ticketsSolicitante, "solicitante")}
        {renderColumn("Responde Técnico", ticketsTecnico, "tecnico")}
      </div>
    </div>
  </div>
);

};

export default AgenteWorkspace;
