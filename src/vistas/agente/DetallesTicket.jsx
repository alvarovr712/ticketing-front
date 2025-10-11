import { use, useEffect, useState } from "react"
import { obtenerUnTicket } from "../../api/Ticket";
import { useParams } from "react-router-dom";
import "../../estilos/Chat.css"

const DetallesTicket = () => {

    const { id } = useParams();
    const [ticket, setTickets] = useState(null);
    const [error, setError] = useState("");

    const [vistaActiva, setVistaActiva] = useState("mensaje")

    const [urgencia, setUrgencia] = useState("");
    const [impacto, setImpacto] = useState("");
    const [prioridad, setPrioridad] = useState("");


    useEffect(() => {
        const token = localStorage.getItem('token');

        obtenerUnTicket(token, id)
            .then(datos => {
                setTickets(datos);
                setUrgencia((datos.urgencia || "").toLowerCase());
                setImpacto((datos.impacto || "").toLowerCase());
                setPrioridad((datos.prioridad || "").toLowerCase());
            })
            .catch(error => setError(error.message));
    }, [id]);

    if (error) return <p style={{ color: "red" }}>{error}</p>
    if (!ticket) return <p> Cargando ticket...</p>

    console.log("Urgencia actual:", urgencia);

    return (

        <div className="container mt-4">
            <div className="row">

                <div className="col-md-8 d-flex flex-column" style={{ height: "90vh" }}>
                    {/*Descripcion del ticket*/}
                    <div className="mb-2 border rounded p-3 bg-white" style={{ height: "15vh" }}>
                        <h5>Descripción</h5>
                        <p>{ticket.descripcion}</p>
                    </div>
                    {/*tabs para cambiar entre mensaje y actividad*/}
                    <ul className="nav nav-tabs ">
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
                        <div className="flex-grow-1 overflow-auto border rounded p-5 mb-2" style={{ backgroundColor: "#f8f9fa" }}>
                            <div className="mensaje agente">
                                <div className="cabecera"><strong>Agente</strong> · 11 oct 2025 · 16:45</div>
                                <div className="contenido">Hola, ¿en qué puedo ayudarte?</div>
                            </div>
                            <div className="mensaje solicitante">
                                <div className="cabecera"><strong>Cliente</strong> · 11 oct 2025 · 16:46</div>
                                <div className="contenido">Tengo un problema con el acceso.</div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow-1 overflow-auto border rounded p-4 mb-2 bg-white">
                            <h5>Actividad del ticket</h5>
                            <ul className="list-unstyled">
                                <li>🟢 Ticket creado el {new Date(ticket.fechaCreacion).toLocaleDateString()}</li>
                                <li>✉️ Mensaje enviado por cliente</li>
                                <li>✉️ Respuesta del agente</li>
                                <li>🗑️ Mensaje eliminado por agente</li>
                                {/* Puedes añadir más eventos aquí */}
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
                <div className="col-md-4">
                    <h2 style={{ textAlign: "center" }}>Detalles del ticket</h2>
                    <br />
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>
                            Asunto: <span className="fw-normal ms-2">{ticket.asunto}</span>
                        </h5>
                    </div>
                    <br/>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>
                            Fecha de creación:<span className="fw-normal ms-2">{ticket.fechaCreacion}</span>
                        </h5>

                    </div>

                    <div className="mt-4">
                        {/* Urgencia */}
                        <div className="mb-3">
                            <label htmlFor="urgencia" className="form-label">Urgencia</label>
                            <select id="urgencia" className="form-select" value={urgencia} onChange={(e) => setUrgencia(e.target.value)}>
                                <option value="">Selecciona urgencia</option>
                                <option value="baja">BAJA</option>
                                <option value="media">MEDIA</option>
                                <option value="alta">ALTA</option>
                            </select>
                        </div>

                        {/* Impacto */}
                        <div className="mb-3">
                            <label htmlFor="impacto" className="form-label">Impacto</label>
                            <select id="impacto" className="form-select" value={impacto} onChange={(e) => setImpacto(e.target.value)}>
                                <option value="">Selecciona impacto</option>
                                <option value="bajo">BAJO</option>
                                <option value="medio">MEDIO</option>
                                <option value="alto">ALTO</option>
                            </select>
                        </div>

                        {/* Prioridad */}
                        <div className="mb-3">
                            <label htmlFor="prioridad" className="form-label">Prioridad</label>
                            <select id="prioridad" className="form-select" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                                <option value="">Selecciona prioridad</option>
                                <option value="baja">BAJA</option>
                                <option value="media">MEDIA</option>
                                <option value="alta">ALTA</option>
                            </select>
                        </div>
                    </div>


                </div>
            </div>

        </div>

    );
}

export default DetallesTicket;