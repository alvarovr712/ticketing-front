import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../estilos/DetallesTicket.css";
import { obtenerUnTicket } from "../../api/Ticket";
import { crearAnotacion } from "../../api/Anotacion";

const DetallesTicketSolicitante = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [vistaActiva, setVistaActiva] = useState("mensajes");
  const [descripcionMensaje, setDescripcionMensaje] = useState("");

 
  const cargarTicket = () => {
    const token = localStorage.getItem("token");
    obtenerUnTicket(token, id)
      .then((datos) => {
        datos.anotaciones.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setTicket(datos);
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    cargarTicket();
    const intervalo = setInterval(cargarTicket, 2000);
    return () => clearInterval(intervalo);
  }, [id]);


  const crearMensaje = async () => {
    if (!descripcionMensaje.trim()) return;
    const token = localStorage.getItem("token");
    try {
      await crearAnotacion(token, descripcionMensaje, 1, ticket.id); 
      setDescripcionMensaje("");
      cargarTicket();
    } catch (error) {
      console.error("Error al crear mensaje:", error);
      setError("Error al enviar el mensaje.");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!ticket) return <p>Cargando ticket...</p>;

  return (
    <div className="container mt-4">
      <div className="row d-flex">
        <div className="col-md-8 d-flex flex-column" style={{ height: "90vh" }}>
          {/* 🧾 Descripción del ticket */}
          <div className="ticket-descripcion mb-2">
            <div className="row mb-2">
              <div className="col-12 col-md-6">
                <h5>
                  <strong>Asunto:</strong>{" "}
                  <span className="fw-normal ms-2">{ticket.asunto}</span>
                </h5>
              </div>
              <div className="col-12 col-md-6">
                <h5>
                  <strong>Fecha de creación:</strong>{" "}
                  <span className="fw-normal ms-2">
                    {new Date(ticket.fechaCreacion).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    h
                  </span>
                </h5>
              </div>
            </div>

            <h5><strong>Descripción:</strong></h5>
            <p>{ticket.descripcion}</p>
          </div>

          {/*  Tabs */}
          <ul className="nav nav-tabs ticket-tabs">
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

          {/* Mensajes */}
          {vistaActiva === "mensajes" ? (
            <div className="flex-grow-1 overflow-auto contenedor-mensajes">
              {ticket.anotaciones && ticket.anotaciones.length > 0 ? (
                ticket.anotaciones
                  .filter((a) => a.visibilidadTicket === 1) // Solo mensajes públicos
                  .sort((a, b) => a.id - b.id)
                  .map((anotacion, index) => {
                    const nombre = `${anotacion.usuario.nombre} ${anotacion.usuario.apellidos}`;
                    const perfil = anotacion.usuario.perfil.nombre;
                    const fecha = new Date(anotacion.fecha).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    return (
                      <div key={index} className="mensaje publico">
                        <div className="cabecera">
                          <strong>{nombre}</strong> - {perfil} , {fecha}
                        </div>
                        <div className="contenido">
                          <p>{anotacion.descripcion}</p>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-muted">No hay mensajes aún.</p>
              )}
            </div>
          ) : (
            //  Actividad
            <div className="flex-grow-1 overflow-auto border rounded p-4 mb-2 ticket-actividad">
              <h5 className="text-center mb-4" style={{ fontWeight: "bold", textDecoration: "underline" }}>
                Actividad del ticket
              </h5>
              <ul className="list-unstyled">
                <li className="mb-3">
                  🟢 <strong>Ticket creado el {new Date(ticket.fechaCreacion).toLocaleDateString("es-ES")}</strong>
                </li>
                {ticket.historiales?.map((h, i) => {
                  const nombre = `${h.usuario.nombre} ${h.usuario.apellidos}`;
                  const perfil = h.usuario.perfil.nombre;
                  const fecha = new Date(h.fecha).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <li key={i} className="mb-3">
                      🎫 <strong>{nombre} ({perfil}) · {h.detalles} · {fecha}</strong>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Crear nuevo mensaje */}
          <div className="d-flex flex-column mt-3">
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Escribe un mensaje para el técnico..."
              style={{ resize: "none" }}
              value={descripcionMensaje}
              onChange={(e) => setDescripcionMensaje(e.target.value)}
            ></textarea>

            <div className="text-center">
              <button
                className="btn btn-success"
                style={{ maxWidth: "200px", width: "100%" }}
                onClick={crearMensaje}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        {/* Columna derecha (solo lectura) */}
        <div className="col-md-4 ticket-detalles">
          <h2 style={{ textAlign: "center" }}>Detalles del ticket</h2>
          <div className="mt-4">
            <p><strong>Urgencia:</strong> {ticket.urgencia || "No asignada"}</p>
            <p><strong>Impacto:</strong> {ticket.impacto || "No asignado"}</p>
            <p><strong>Prioridad:</strong> {ticket.prioridad || "No asignada"}</p>
            <p><strong>Técnico asignado:</strong> {ticket.grupo || "Sin asignar"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesTicketSolicitante;
