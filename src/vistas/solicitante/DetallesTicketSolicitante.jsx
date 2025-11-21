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
        // Aseguramos que existan arrays aunque el ticket venga vacío
        datos.anotaciones = datos.anotaciones || [];
        datos.historiales = datos.historiales || [];

        // Ordenar anotaciones por fecha
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
      await crearAnotacion(token, descripcionMensaje, 1, ticket.id); // 1 = mensaje público
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

          {/* ENCABEZADO */}
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
                    {new Date(ticket.fechaCreacion).toLocaleString("es-ES")}
                  </span>
                </h5>
              </div>
            </div>

            <h5><strong>Descripción:</strong></h5>
            <p>{ticket.descripcion}</p>
          </div>

          {/* TABS */}
          <ul className="nav nav-tabs ticket-tabs">
            <li className="nav-item">
              <span
                className={`nav-link ${vistaActiva === "mensajes" ? "active" : ""}`}
                onClick={() => setVistaActiva("mensajes")}
                style={{ cursor: "pointer" }}
              >
                Mensajes
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`nav-link ${vistaActiva === "actividad" ? "active" : ""}`}
                onClick={() => setVistaActiva("actividad")}
                style={{ cursor: "pointer" }}
              >
                Actividad
              </span>
            </li>
          </ul>

          {/* --- MENSAJES --- */}
          {vistaActiva === "mensajes" ? (
            <div className="flex-grow-1 overflow-auto contenedor-mensajes">
              {ticket.anotaciones
                .filter((a) => a.visibilidadTicket === 1)
                .map((anotacion) => {
                  const usuario = anotacion.usuario || {};
                  const nombre = `${usuario.nombre || ""} ${usuario.apellidos || ""}`;
                  const perfil = usuario.perfil?.nombre || "";
                  const fecha = new Date(anotacion.fecha).toLocaleString("es-ES");

                  return (
                    <div key={anotacion.id} className="mensaje publico">
                      <div className="cabecera">
                        <strong>{nombre}</strong> - {perfil} , {fecha}
                      </div>
                      <div className="contenido">
                        <p>{anotacion.descripcion}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            /* --- ACTIVIDAD --- */
            <div className="flex-grow-1 overflow-auto border rounded p-4 mb-2 ticket-actividad">
              <h5 className="text-center mb-4" style={{ textDecoration: "underline" }}>
                Actividad del ticket
              </h5>

              <ul className="list-unstyled">
                <li className="mb-3">
                  🟢 <strong>Ticket creado el {new Date(ticket.fechaCreacion).toLocaleString("es-ES")}</strong>
                </li>

                {ticket.historiales.map((h) => {
                  const usuario = h.usuario || {};
                  const nombre = `${usuario.nombre || ""} ${usuario.apellidos || ""}`;
                  const perfil = usuario.perfil?.nombre || "";
                  const fecha = new Date(h.fecha).toLocaleString("es-ES");

                  return (
                    <li key={h.id} className="mb-3">
                      🎫 <strong>{nombre} ({perfil}) · {h.detalles} · {fecha}</strong>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* ESCRIBIR MENSAJE */}
          <div className="d-flex flex-column mt-3">
            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Escribe un mensaje para el técnico..."
              value={descripcionMensaje}
              onChange={(e) => setDescripcionMensaje(e.target.value)}
              style={{ resize: "none" }}
            />

            <div className="text-center">
              <button
                className="btn btn-success"
                style={{ width: "180px" }}
                onClick={crearMensaje}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* DERECHA: SOLO LECTURA */}
        <div className="col-md-4 ticket-detalles">
          <h2 className="text-center">Detalles del ticket</h2>

          <div className="mt-4">
            <p><strong>Urgencia:</strong> {ticket.urgencia || "No asignada"}</p>
            <p><strong>Impacto:</strong> {ticket.impacto || "No asignado"}</p>
            <p><strong>Prioridad:</strong> {ticket.prioridad || "No asignada"}</p>
            <p><strong>Grupo:</strong> {ticket.grupo?.nombre || "Sin asignar"}</p>
            <p><strong>Técnico asignado:</strong> {ticket.tecnico?.nombre || "Sin asignar"}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetallesTicketSolicitante;

