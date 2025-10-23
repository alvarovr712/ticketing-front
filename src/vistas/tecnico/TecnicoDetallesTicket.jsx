import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { obtenerUnTicket } from "../../api/Ticket";
import "../../estilos/DetallesTicket.css"
import TicketDescripcion from "../../componentes/TicketDescripcion";
import ListaMensajes from "../../componentes/ListaMensajes";
import { crearAnotacion } from "../../api/Anotacion";
import EscribirMensaje from "../../componentes/EscribirMensaje";
import EstadosTicketLectura from "../../componentes/EstadosTicketLectura";


const TecnicoDetallesTicket = () => {

    const { id } = useParams();
    const [ticket, setTickets] = useState(null);
    const [error, setError] = useState("");
    const [estadoConfirmado, setEstadoConfirmado] = useState("");

    const [visibilidadTicket, setVisibilidadTicket] = useState(0);
    const [descripcionMensaje, setDescripcionMensaje] = useState("");
    const token = localStorage.getItem('token');


    const cargarTicket = () => {

        obtenerUnTicket(token, id)
            .then(datos => {
                setTickets(datos);
                setEstadoConfirmado(datos.estadoTicket);
            })

            .catch(error => setError(error.message))
    }

    useEffect(() => {
        cargarTicket();
        const intervalo = setInterval(cargarTicket, 2000);
        return () => clearInterval(intervalo);
    }, [id])

    //CREAR ANOTACION (MENSAJE)
    const crearMensaje = async (descripcion, visibilidadTicket, id_ticket) => {
        try {
            await crearAnotacion(token, descripcion, visibilidadTicket, id_ticket)
            setDescripcionMensaje("");

        } catch (error) {
            console.error("Error real al crear mensaje visible:", error);
            setError("Error al crear la anotación");
        }
    }

    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (!ticket) return <p> Cargando ticket...</p>

    return (
        <div className="container mt-4">
            <div className="row d-flex">
                <div className="col-md-8 d-flex flex-column" style={{ height: "90vh" }}>

                    <TicketDescripcion
                        asunto={ticket.asunto}
                        fechaCreacion={ticket.fechaCreacion}
                        descripcion={ticket.descripcion}
                    />
                    <ListaMensajes
                        anotaciones={ticket.anotaciones}
                    />
                    {ticket.estadoTicket !== "RESUELTO" && ticket.estadoTicket !== "CERRADO" && (
                        <div className="d-flex flex-column ">

                            <EscribirMensaje
                                descripcionMensaje={descripcionMensaje}
                                setDescripcionMensaje={setDescripcionMensaje}
                                visibilidadTicket={visibilidadTicket}
                                setVisibilidadTicket={setVisibilidadTicket}
                                grupo={ticket.grupo}
                                ticketId={ticket.id}
                                crearMensaje={crearMensaje}
                                mostrarTabs={false}
                            />
                        </div>
                    )}
                </div>

                {/*Columna derecha*/}
                {estadoConfirmado !== "CERRADO" && (
                    <div className="col-md-4 ticket-detalles">

                        <EstadosTicketLectura
                            urgencia={ticket.urgencia}
                            impacto={ticket.impacto}
                            prioridad={ticket.prioridad}
                            estado={ticket.estadoTicket}
                            grupo={ticket.grupo}
                            responsable={ticket.tecnico}
                        />
                    </div>
                )}


            </div>

        </div>



    );

}

export default TecnicoDetallesTicket;