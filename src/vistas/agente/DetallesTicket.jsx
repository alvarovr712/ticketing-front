import { useEffect, useState } from "react"
import { obtenerTodosGrupos, obtenerUnTicket } from "../../api/Ticket";
import { useParams } from "react-router-dom";
import "../../estilos/Chat.css"

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



    useEffect(() => {

        const token = localStorage.getItem('token');

        obtenerUnTicket(token, id)
            .then(datos => {
                //Ordenar las anotaciones por fecha
                datos.anotaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                setTickets(datos);
                setUrgencia((datos.urgencia || "").toLowerCase());
                setImpacto((datos.impacto || "").toLowerCase());
                setPrioridad((datos.prioridad || "").toLowerCase());
            })
            .catch(error => setError(error.message));
    }, [id]);

    //OBTENER TODOS LOS GRUPOS

    useEffect(() => {
        const token = localStorage.getItem('token');
        obtenerTodosGrupos(token)
            .then(datos => setListagrupos(datos))
            .catch(error => setError(error.message));
    }, [])

    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (!ticket) return <p> Cargando ticket...</p>

    console.log("Urgencia actual:", urgencia);



    return (

        <div className="container mt-4">
            <div className="row">

                <div className="col-md-8 d-flex flex-column" style={{ height: "90vh" }}>
                    {/*Descripcion del ticket*/}
                    <div className="ticket-descripcion mb-2" style={{ height: "15vh" }}>
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
                        <div className="flex-grow-1 overflow-auto " style={{ backgroundColor: "#f8f9fa" }}>
                            <div className="flex-grow-1 overflow-auto  mb-2" style={{ backgroundColor: "#f8f9fa" }}>
                                {ticket.anotaciones.map((anotacion, index) => {
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
                                                {anotacion.descripcion}
                                            </div>
                                            {/* Botones para editar y borrar cada mensaje */}
                                            <div className="acciones-mensaje">
                                                <button className="btn-accion">Editar</button>
                                                <button className="btn-accion">Borrar</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    ) : (
                        <div className="flex-grow-1 overflow-auto border rounded p-4 mb-2 bg-white">
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

                    <div className="d-flex">
                        {/* Textarea */}
                        <textarea
                            className="form-control me-3"
                            rows="3"
                            placeholder="Escribe un mensaje..."
                            style={{ resize: "none" }}
                        ></textarea>

                        {/* Botones en columna */}
                        <div className="d-flex flex-column">
                            <button className="btn btn-primary mb-2">Enviar</button>
                            <button className="btn btn-danger">Privado</button>
                        </div>
                    </div>


                </div>

                {/*Columna derecha */}
                <div className="col-md-4 ticket-detalles">
                    <h2 style={{ textAlign: "center" }}>Detalles del ticket</h2>
                    <br />
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>
                            <strong>Asunto:</strong> <span className="fw-normal ms-2">{ticket.asunto}</span>
                        </h5>
                    </div>
                    <br />
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>
                            <strong>Fecha de creación:</strong><span className="fw-normal ms-2 ">{ticket.fechaCreacion}</span>
                        </h5>

                    </div>

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
                            <button className="btn btn-success">
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