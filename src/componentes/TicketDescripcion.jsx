const TicketDescripcion = ({ asunto, fechaCreacion, descripcion }) => {

    const fechaFormateada = new Date(fechaCreacion).toLocaleString("es-ES", {

        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })

    return (
        <div className="ticket-descripcion mb-2">
            {/* Asunto y Fecha de creación */}
            <div className="row mb-2">
                <div className="col-12 col-md-6">
                    <h5>
                        <strong>Asunto:</strong> <span className="fw-normal ms-2">{asunto}</span>
                    </h5>
                </div>
                <div className="col-12 col-md-6">
                    <h5>
                        <strong>Fecha de creación:</strong> <span className="fw-normal ms-2">{new Date(fechaCreacion).toLocaleString("es-ES", {
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
            <p>{descripcion}</p>
        </div>

    )
}

export default TicketDescripcion;