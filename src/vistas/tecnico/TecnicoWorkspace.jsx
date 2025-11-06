import { useEffect, useState } from "react";
import { dropearTicketTecnico, obtenerTicketsAsignadosTecnico } from "../../api/Ticket";
import TicketCard from "../../componentes/TicketCard";
import "../../estilos/Workspace.css";

const TecnicoWorkspace = () => {
    const [tickets, setTickets] = useState([]);
    const tipoVista = "tecnico";

    useEffect(() => {
        const cargarTickets = async () => {
            const token = localStorage.getItem("token");
            const id_usuario = localStorage.getItem("id_usuario");

            console.log("Token:", token);
            console.log("ID Usuario:", id_usuario);

            if (!token || !id_usuario) return;

            try {
                const asignados = await obtenerTicketsAsignadosTecnico(token, id_usuario);

                const ticketsConRespuesta = asignados.map(ticket => {
                    const anotaciones = ticket.anotaciones || [];
                    const anotacionFinal = anotaciones.length > 0 ? anotaciones[anotaciones.length - 1] : null;

                    let respuestaFinal = "tecnico";

                    if (anotacionFinal?.usuario?.perfil?.nombre === "TECNICO") {
                        respuestaFinal = "agente";
                    }

                    return { ...ticket, respuestaFinal, anotacionFinal }
                });

                setTickets(ticketsConRespuesta);

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
        try{
            await dropearTicketTecnico(token, ticketId);
            setTickets(prev => prev.filter(t => t.id !== ticketId));

        }catch (error) {
            console.error("Error al desasignar ticket:", error);
        }
    }

    const ticketsAgente = tickets.filter(t => t.respuestaFinal === "agente");
    const ticketsTecnico = tickets.filter(t => t.respuestaFinal === "tecnico");

    const renderColumn = (titulo, tickets) => (
          <div className="col-md-6 workspace-column">
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
                    {renderColumn("Responde Técnico", ticketsTecnico, "tecnico")}
                    {renderColumn("Responde Agente", ticketsAgente, "agente" )}
                    
                </div>
            </div>
        </div>
    );
}
export default TecnicoWorkspace;