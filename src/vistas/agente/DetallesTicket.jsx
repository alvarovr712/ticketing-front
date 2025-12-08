import { useEffect, useState } from "react"
import { editarTicket, obtenerTodosGrupos, obtenerUnTicket } from "../../api/Ticket";
import { useParams } from "react-router-dom";
import "../../estilos/DetallesTicket.css"
import { borrarAnotacion, crearAnotacion, editarAnotacion } from "../../api/Anotacion";
import { obtenerUsuariosPorGrupo } from "../../api/Usuarios";
import TicketDescripcion from "../../componentes/TicketDescripcion";
import TabsMensajesActividad from "../../componentes/TabsMensajesActividad";
import ListaMensajes from "../../componentes/ListaMensajes";
import ActividadTicket from "../../componentes/ActividadTicket";
import EscribirMensaje from "../../componentes/EscribirMensaje";
import EstadosTicket from "../../componentes/EstadosTicket";

const DetallesTicket = () => {

    const { id } = useParams();
    const [ticket, setTickets] = useState(null);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [vistaActiva, setVistaActiva] = useState("mensajes")

    const [urgencia, setUrgencia] = useState("");
    const [impacto, setImpacto] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [grupo, setGrupo] = useState("");
    const [estadoTicket, setEstadoTicket] = useState("");
    const [listagrupos, setListagrupos] = useState([])


    //UseState usados para editar mensajes
    const [id_anotacion, setId_anotacion] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    //UseState usados para crear mensajes
    const [visibilidadTicket, setVisibilidadTicket] = useState(1);
    const [descripcionMensaje, setDescripcionMensaje] = useState("");
    //UseState usado para ve todos los usuarios de un grupo en el select
    const [usuariosGrupo, setUsuariosGrupo] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

    //Estado para indicar si algun estado del ticket ha sido modificado o no y asi  actulizarlo o no en el useEffect()
    const [modificado, setModificado] = useState(false);
    //UseState usado para tener el estado del ticket una vez cambiado asi no lo mezclo con el del select y me quita los cambios antes de guardar en la base de datos
    const [estadoConfirmado, setEstadoConfirmado] = useState("");



    const cargarTicket = () => {
        const token = localStorage.getItem('token');

        obtenerUnTicket(token, id)
            .then(datos => {
                // Actualiza el estado del ticket completo
                setTickets({
                    id: datos.id,
                    asunto: datos.asunto,
                    descripcion: datos.descripcion,
                    fechaCreacion: datos.fechaCreacion,
                    anotaciones: datos.anotaciones,
                    historiales: datos.historiales
                });

                setEstadoTicket(datos.estadoTicket);
                setEstadoConfirmado(datos.estadoTicket);

                // Los select solo se actualizaran cuando se cambie un estado sino, no se precargaran.
                if (!modificado) {
                    setUrgencia((datos.urgencia || "").toLowerCase());
                    setImpacto((datos.impacto || "").toLowerCase());
                    setPrioridad((datos.prioridad || "").toLowerCase());


                    if (datos.id_grupo) {
                        setGrupo(datos.id_grupo.toString());

                        obtenerUsuariosPorGrupo(token, datos.id_grupo)
                            .then(setUsuariosGrupo)
                            .catch(error => setError(error.message));
                    }


                    if (datos.id_tecnico) {
                        setUsuarioSeleccionado(datos.id_tecnico.toString());
                    }
                }
            })
            .catch(error => setError(error.message));
    };


    useEffect(() => {
        cargarTicket();
        if (modificado) return;
        const intervalo = setInterval(cargarTicket, 2000);
        return () => clearInterval(intervalo);
    }, [id, modificado, listagrupos]);





    //OBTENER TODOS LOS GRUPOS

    useEffect(() => {
        const token = localStorage.getItem('token');
        obtenerTodosGrupos(token)
            .then(datos => setListagrupos(datos))
            .catch(error => setError(error.message));
    }, [])

    //VER USUARIOS DE UN GRUPO
    const verUsuariosGrupo = async (e) => {
        const token = localStorage.getItem('token');
        const idGrupoSeleccionado = e.target.value;

        try {
            const usuarios = await obtenerUsuariosPorGrupo(token, idGrupoSeleccionado);
            setUsuariosGrupo(usuarios);
            setUsuarioSeleccionado("");
            setModificado(true)
        } catch (error) {
            setError("Error al cargar los usuarios del grupo");
        }
    };



    //EDITAR UN TICKET

    const ModificarTicket = async () => {
        const token = localStorage.getItem('token');

        const grupoSeleccionado = listagrupos.find(g => g.id.toString() === grupo);

        const datosTicket = {
            grupo: grupoSeleccionado ? { nombre: grupoSeleccionado.nombre } : null,
            agente: usuarioSeleccionado ? { id: parseInt(usuarioSeleccionado) } : null,
            urgencia: urgencia.toUpperCase(),
            impacto: impacto.toUpperCase(),
            prioridad: prioridad.toUpperCase(),
            estadoTicket: estadoTicket
        };

        try {
            await editarTicket(token, id, datosTicket);
            setModificado(false);
            setMensaje("🎫 Ticket actualizado con éxito");
            setTimeout(() => setMensaje(""), 3000);
        } catch (error) {
            console.error("Error al modificar el ticket:", error.response?.data || error.message);
            
        }
    };




    //ELIMINAR MENSAJE

    const EliminarMensaje = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await borrarAnotacion(token, id);

        } catch (error) {
            setError("Error al borrar la anotación");
        }
    }


    // FUNCIONES PARA EDITAR MENSAJE ActivarEdicion , cancelarEdicion y guardarEdicion

    const activarEdicion = (anotacion) => {
        setId_anotacion(anotacion.id);
        setDescripcion(anotacion.descripcion);
    };

    const cancelarEdicion = () => {
        setId_anotacion(null);
        setDescripcion("");
    };
    const guardarEdicion = async (anotacion) => {
        const token = localStorage.getItem('token');
        try {
            await editarAnotacion(token, anotacion.id, descripcion);
            cargarTicket();
            cancelarEdicion();
        } catch (error) {
            console.error("Error real al editar:", error);
            setError("Error al editar la anotación");
        }
    };

    //CREAR ANOTACION (MENSAJE)
    const crearMensaje = async (descripcion, visibilidadTicket, id_ticket) => {
        const token = localStorage.getItem('token');
        try {
            await crearAnotacion(token, descripcion, visibilidadTicket, id_ticket);
            setDescripcionMensaje("");
            cargarTicket();
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

                    {/*Descripcion del ticket*/}
                    <TicketDescripcion
                        asunto={ticket.asunto}
                        fechaCreacion={ticket.fechaCreacion}
                        descripcion={ticket.descripcion}
                    />

                    {/*tabs para cambiar entre mensaje y actividad*/}
                    <TabsMensajesActividad
                        vistaActiva={vistaActiva}
                        setVistaActiva={setVistaActiva}
                    />

                    {/*Mensaje y actividad (tabs)*/}
                    {vistaActiva === "mensajes" ? (
                        <ListaMensajes
                            anotaciones={ticket.anotaciones}
                            id_anotacion={id_anotacion}
                            descripcion={descripcion}
                            setDescripcion={setDescripcion}
                            activarEdicion={activarEdicion}
                            cancelarEdicion={cancelarEdicion}
                            guardarEdicion={guardarEdicion}
                            EliminarMensaje={EliminarMensaje}

                        />
                    ) : (
                        <ActividadTicket
                            fechaCreacion={ticket.fechaCreacion}
                            historiales={ticket.historiales}
                        />
                    )}
                    {estadoConfirmado !== "RESUELTO" && estadoConfirmado !== "CERRADO" && (
                        <div className="d-flex flex-column ">
                            {/* Tabs para mensajes publicos o privados y escribir anotacion(mensaje) */}
                            <EscribirMensaje
                                descripcionMensaje={descripcionMensaje}
                                setDescripcionMensaje={setDescripcionMensaje}
                                visibilidadTicket={visibilidadTicket}
                                setVisibilidadTicket={setVisibilidadTicket}
                                grupo={grupo}
                                ticketId={ticket.id}
                                crearMensaje={crearMensaje}
                            />
                        </div>
                    )}
                </div>


                {/*Columna derecha */}
                {estadoConfirmado !== "CERRADO" && (
                <div className="col-md-4 ticket-detalles">
                    
                        <EstadosTicket
                            urgencia={urgencia}
                            impacto={impacto}
                            prioridad={prioridad}
                            grupo={grupo}
                            usuarioSeleccionado={usuarioSeleccionado}
                            estadoTicket={estadoTicket}
                            listagrupos={listagrupos}
                            usuariosGrupo={usuariosGrupo}
                            setUrgencia={setUrgencia}
                            setImpacto={setImpacto}
                            setPrioridad={setPrioridad}
                            setGrupo={setGrupo}
                            setUsuarioSeleccionado={setUsuarioSeleccionado}
                            setEstadoTicket={setEstadoTicket}
                            verUsuariosGrupo={verUsuariosGrupo}
                            ModificarTicket={ModificarTicket}
                            setModificado={setModificado}
                            mensaje={mensaje}

                        />
                </div>
                )}
            </div>
        </div>
    );
}

export default DetallesTicket;