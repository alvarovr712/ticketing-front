const EstadosTicketLectura = ({ urgencia, impacto, prioridad, estado, grupo, responsable }) => {
  return (
    <div className="col-md-4 ticket-detalles">
      <h2 style={{ textAlign: "center" }}>Detalles del ticket</h2>
      <br />

      <div className="mt-4">
        {/* Urgencia */}
        <div className="mb-3">
          <label className="form-label"><strong>Urgencia</strong></label>
          <div className="form-control bg-light">{urgencia?.toUpperCase() || "No especificada"}</div>
        </div>

        {/* Impacto */}
        <div className="mb-3">
          <label className="form-label"><strong>Impacto</strong></label>
          <div className="form-control bg-light">{impacto?.toUpperCase() || "No especificado"}</div>
        </div>

        {/* Prioridad */}
        <div className="mb-3">
          <label className="form-label"><strong>Prioridad</strong></label>
          <div className="form-control bg-light">{prioridad?.toUpperCase() || "No especificada"}</div>
        </div>

        {/* Grupo técnico */}
        <div className="mb-3">
          <label className="form-label"><strong>Asignar Grupo Técnico</strong></label>
          <div className="form-control bg-light">{grupo || "Sin grupo asignado"}</div>
        </div>

        {/* Responsable */}
        <div className="mb-3">
          <label className="form-label"><strong>Responsable</strong></label>
          <div className="form-control bg-light">{responsable || "Sin responsable"}</div>
        </div>

        {/* Estado del ticket */}
        <div className="mb-3">
          <label className="form-label"><strong>Estado del Ticket</strong></label>
          <div className="form-control bg-light">{estado || "No definido"}</div>
        </div>
      </div>
    </div>
  );
};

export default EstadosTicketLectura;
