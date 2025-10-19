import { useEffect, useState } from "react"
import { editarTicket, obtenerTodosGrupos, obtenerUnTicket } from "../../api/Ticket";
import { useParams } from "react-router-dom";
import "../../estilos/DetallesTicket.css"
import { borrarAnotacion, crearAnotacion, editarAnotacion } from "../../api/Anotacion";

const DetallesTicket = () => {

    const { id } = useParams();
    const [ticket, setTickets] = useState(null);
    const [error, setError] = useState("");

    const [vistaActiva, setVistaActiva] = useState("mensajes")

    const [urgencia, setUrgencia] = useState("");
    const [impacto, setImpacto] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [grupo, setGrupo] = useState("");
    const [listagrupos, setListagrupos] = useState([])

    //UseState usado para hacer tab el box para escribir mensajes y poder cambiar entre publico y privado

    const [tipoMensaje, setTipoMensaje] = useState("publico");
    //UseState usados para editar mensajes
    const [id_anotacion, setId_anotacion] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    //UseState usados para crear mensajes
    const [visibilidadTicket, setVisibilidadTicket] = useState(1);
    const [descripcionMensaje, setDescripcionMensaje] = useState("");






    const cargarTicket = () => {
        const token = localStorage.getItem('token');
        obtenerUnTicket(token, id)
            .then(datos => {
                datos.anotaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                setTickets(datos);
                setUrgencia((datos.urgencia || "").toLowerCase());
                setImpacto((datos.impacto || "").toLowerCase());
                setPrioridad((datos.prioridad || "").toLowerCase());
                setGrupo(datos.grupo || "");
            })
            .catch(error => setError(error.message));
    };

    useEffect(() => {
        cargarTicket();
        const intervalo = setInterval(cargarTicket, 2000);
        return () => clearInterval(intervalo);
    }, [id]);



    //OBTENER TODOS LOS GRUPOS

    useEffect(() => {
        const token = localStorage.getItem('token');
        obtenerTodosGrupos(token)
            .then(datos => setListagrupos(datos))
            .catch(error => setError(error.message));
    }, [])




    //EDITAR UN TICKET

    const ModificarTicket = async () => {
        const token = localStorage.getItem('token');

        const datosTicket = {
            grupo: { nombre: grupo },
            urgencia: urgencia.toUpperCase(),
            impacto: impacto.toUpperCase(),
            prioridad: prioridad.toUpperCase()
        };

        try {
            const resultado = await editarTicket(token, id, datosTicket);
            console.log("Ticket modificado:", resultado);

        } catch (error) {
            console.error("Error al modificar el ticket:", error);
            setError("Error al modificar el ticket");
        }
    }


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

    //CREAR MENSAJE VISIBLE
    const crearMensaje = async (descripcion, visibilidadTicket, id_ticket) => {
        const token = localStorage.getItem('token');
        try {
            await crearAnotacion(token, descripcion, visibilidadTicket, id_ticket);
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
                    <div className="ticket-descripcion mb-2">
                        {/* Asunto y Fecha de creación */}
                        <div className="row mb-2">
                            <div className="col-12 col-md-6">
                                <h5>
                                    <strong>Asunto:</strong> <span className="fw-normal ms-2">{ticket.asunto}</span>
                                </h5>
                            </div>
                            <div className="col-12 col-md-6">
                                <h5>
                                    <strong>Fecha de creación:</strong> <span className="fw-normal ms-2">{new Date(ticket.fechaCreacion).toLocaleString("es-ES", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}h</span>
                                </h5>
                            </div>
                        </div>

                        {/* Descripción */}
                        <h5><strong>Descripción:</strong></h5>
                        <p>{ticket.descripcion}</p>
                    </div>


                    {/*tabs para cambiar entre mensaje y actividad*/}
                    <ul className="nav nav-tabs ticket-tabs ">
                        <li className="nav-item">
                            <span
                                className={`nav-link ${vistaActiva === "mensajes" ? "active" : ""}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setVistaActiva("mensajes")}
                            >
                                Mensajes
                            </span>
                        </li>
                        <li className="nav-item">
                            <span
                                className={`nav-link ${vistaActiva === "actividad" ? "active" : ""}`}
                                style={{ cursor: "pointer" }}
                                onClick={() => setVistaActiva("actividad")}
                            >
                                Actividad
                            </span>
                        </li>
                    </ul>
                    {/*Mensaje y actividad (tabs)*/}
                    {vistaActiva === "mensajes" ? (
                        <div className="flex-grow-1 overflow-auto contenedor-mensajes">

                            {[...ticket.anotaciones]
                                .sort((a, b) => a.id - b.id)
                                .map((anotacion, index) => {
                                    const perfil = anotacion.usuario.perfil.nombre
                                    const nombre = `${anotacion.usuario.nombre} ${anotacion.usuario.apellidos}`;
                                    const clase = anotacion.visibilidadTicket === 0 ? "privado" : "publico";
                                    const fecha = new Date(anotacion.fecha).toLocaleString("es-ES", {
                                        day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                                    });

                                    return (
                                        <div key={index} className={`mensaje ${clase}`}>
                                            <div className="cabecera">
                                                <strong>{nombre}</strong> - {perfil} , {fecha}
                                            </div>
                                            <div className="contenido">

                                                {id_anotacion === anotacion.id ? (
                                                    <div className="edicion-mensaje">
                                                        <textarea
                                                            value={descripcion}
                                                            onChange={(e) => setDescripcion(e.target.value)}
                                                            rows={3}
                                                            className="textarea-edicion"
                                                        />
                                                        <div className="acciones-edicion">
                                                            <button className="btn-accion" onClick={() => guardarEdicion(anotacion)}>Guardar</button>
                                                            <button className="btn-accion" onClick={cancelarEdicion}>Cancelar</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p>{anotacion.descripcion}</p>
                                                )}

                                            </div>
                                            {/* Botones para editar y borrar cada mensaje */}
                                            <div className="acciones-mensaje">
                                                <button className="btn-accion" onClick={() => activarEdicion(anotacion)}>Editar</button>
                                                <button className="btn-accion" onClick={() => EliminarMensaje(anotacion.id)}>Borrar</button>
                                            </div>
                                        </div>
                                    );
                                })}


                        </div>
                    ) : (
                      <div className="flex-grow-1 overflow-auto border rounded p-4 mb-2 ticket-actividad">
                            <h5 className="text-center mb-4" style={{ fontWeight: "bold", textDecoration: "underline" }}>Actividad del ticket</h5>
                            <ul className="list-unstyled">
                                <li className="mb-3">🟢 <strong>Ticket creado el {new Date(ticket.fechaCreacion).toLocaleDateString("es-ES")}</strong></li>

                                {ticket.historiales
                                    .map((historial, index) => {
                                        const nombre = `${historial.usuario.nombre} ${historial.usuario.apellidos}`;
                                        const perfil = historial.usuario.perfil.nombre;
                                        const fecha = new Date(historial.fecha).toLocaleString("es-ES", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        });

                                        return (
                                            <li key={index} className="mb-3">
                                                🎫 <strong>{nombre} ({perfil}) · {historial.detalles} · {fecha}</strong>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    )}

                    <div className="d-flex flex-column ">
                        {/* Tabs para mensajes publicos o privados */}
                        <ul className="nav nav-tabs mb-2">
                            <li className="nav-item">
                                <span className="nav-link active"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setVisibilidadTicket(1)}>
                                    Público
                                </span>
                            </li>
                            <li className="nav-item">
                                <span className={`nav-link ${visibilidadTicket === 0 ? "active" : ""} ${!ticket.grupo ? "disabled text-muted" : ""}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setVisibilidadTicket(0)}>
                                    Privado
                                </span>
                            </li>
                        </ul>

                        {/* Textarea */}
                        <textarea
                            className="form-control mb-2"
                            rows="3"
                            placeholder="Escribe un mensaje..."
                            style={{ resize: "none" }}
                            value={descripcionMensaje}
                            onChange={(e) => setDescripcionMensaje(e.target.value)}
                        ></textarea>

                        <div className="text-center">
                            <button
                                className="btn btn-success"
                                style={{ maxWidth: "200px", width: "100%" }}
                                onClick={() => crearMensaje(descripcionMensaje, visibilidadTicket, ticket.id,)}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>

                {/*Columna derecha */}
                <div className="col-md-4 ticket-detalles">
                    <h2 style={{ textAlign: "center" }}>Detalles del ticket</h2>
                    <br />
                    <div className="mt-4">
                        {/* Urgencia */}
                        <div className="mb-3">
                            <label htmlFor="urgencia" className="form-label"><strong>Urgencia</strong></label>
                            <select id="urgencia" className="form-select" value={urgencia} onChange={(e) => setUrgencia(e.target.value)}>
                                <option value="">Selecciona urgencia</option>
                                <option value="baja">BAJA</option>
                                <option value="media">MEDIA</option>
                                <option value="alta">ALTA</option>
                            </select>
                        </div>

                        {/* Impacto */}
                        <div className="mb-3">
                            <label htmlFor="impacto" className="form-label"><strong>Impacto</strong></label>
                            <select id="impacto" className="form-select" value={impacto} onChange={(e) => setImpacto(e.target.value)}>
                                <option value="">Selecciona impacto</option>
                                <option value="bajo">BAJO</option>
                                <option value="medio">MEDIO</option>
                                <option value="alto">ALTO</option>
                            </select>
                        </div>

                        {/* Prioridad */}
                        <div className="mb-3">
                            <label htmlFor="prioridad" className="form-label"><strong>Prioridad</strong></label>
                            <select id="prioridad" className="form-select" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                                <option value="">Selecciona prioridad</option>
                                <option value="baja">BAJA</option>
                                <option value="media">MEDIA</option>
                                <option value="alta">ALTA</option>
                            </select>
                        </div>
                        {/*Mostrar grupo*/}
                        <div className="mb-3">
                            <label htmlFor="grupo" className="form-label"><strong>Asignar Tecnico</strong></label>
                            <select id="grupo" className="form-select" value={grupo} onChange={(e) => setGrupo(e.target.value)}
                            >

                                <option value="">Asigna un tecnico</option>
                                {listagrupos.map((nombre, index) => (
                                    <option key={index} value={nombre}>{nombre}</option>
                                ))}

                            </select>
                        </div>

                        {/*Boton para guardar los cambios*/}
                        <div className="d-grid mt-5">
                            <button className="btn btn-success" onClick={ModificarTicket}>
                                Guardar cambios
                            </button>
                        </div>

                    </div>


                </div>
            </div>

        </div>

    );
}

export default DetallesTicket;