const ActividadTicket = ({ fechaCreacion, historiales }) => {

    return (
        <div className="flex-grow-1 overflow-auto border rounded p-4 mb-2 ticket-actividad">
            <h5 className="text-center mb-4" style={{ fontWeight: "bold", textDecoration: "underline" }}>Actividad del ticket</h5>
            <ul className="list-unstyled">
                <li className="mb-3">🟢 <strong>Ticket creado el {new Date(fechaCreacion).toLocaleDateString("es-ES")}</strong></li>

                {historiales
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

    )
};

export default ActividadTicket;