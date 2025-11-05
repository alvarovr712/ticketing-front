const EstadosTicket = ({
    urgencia,
    impacto,
    prioridad,
    grupo,
    usuarioSeleccionado,
    estadoTicket,
    listagrupos,
    usuariosGrupo,
    setUrgencia,
    setImpacto,
    setPrioridad,
    setGrupo,
    setUsuarioSeleccionado,
    setEstadoTicket,
    verUsuariosGrupo,
    ModificarTicket,
    setModificado,
    mensaje
}) => {
    return (
        <>
            <h2 style={{ textAlign: "center" }}>Detalles del ticket</h2>
            <br />
            {mensaje && (
                <div className="alert alert-success text-center" role="alert">
                    {mensaje}
                </div>
            )}
            <div className="mt-4">
                {/* Urgencia */}
                <div className="mb-3">
                    <label htmlFor="urgencia" className="form-label"><strong>Urgencia</strong></label>
                    <select id="urgencia" className="form-select" value={urgencia} onChange={(e) => {
                        setModificado(true);
                        setUrgencia(e.target.value);
                    }}>
                        <option value="">Selecciona urgencia</option>
                        <option value="baja">BAJA</option>
                        <option value="media">MEDIA</option>
                        <option value="alta">ALTA</option>
                    </select>
                </div>

                {/* Impacto */}
                <div className="mb-3">
                    <label htmlFor="impacto" className="form-label"><strong>Impacto</strong></label>
                    <select id="impacto" className="form-select" value={impacto} onChange={(e) => {
                        setModificado(true);
                        setImpacto(e.target.value);
                    }}>
                        <option value="">Selecciona impacto</option>
                        <option value="bajo">BAJO</option>
                        <option value="medio">MEDIO</option>
                        <option value="alto">ALTO</option>
                    </select>
                </div>

                {/* Prioridad */}
                <div className="mb-3">
                    <label htmlFor="prioridad" className="form-label"><strong>Prioridad</strong></label>
                    <select id="prioridad" className="form-select" value={prioridad} onChange={(e) => {
                        setModificado(true);
                        setPrioridad(e.target.value);
                    }}>
                        <option value="">Selecciona prioridad</option>
                        <option value="baja">BAJA</option>
                        <option value="media">MEDIA</option>
                        <option value="alta">ALTA</option>
                        <option value="urgente">URGENTE</option>
                    </select>
                </div>

                {/* Grupo técnico */}
                <div className="mb-3">
                    <label htmlFor="grupo" className="form-label"><strong>Asignar Grupo Técnico</strong></label>
                    <select
                        id="grupo"
                        className="form-select"
                        value={grupo}
                        onChange={(e) => {
                            setModificado(true);
                            setGrupo(e.target.value); 
                            verUsuariosGrupo(e);
                        }}
                    >
                        <option value="">Selecciona un grupo</option>
                        {listagrupos.map((item) => (
                            <option key={item.id} value={item.id.toString()}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Responsable */}
                <div className="mb-3">
                    <label htmlFor="usuario" className="form-label"><strong>Responsable</strong></label>
                    <select
                        id="usuario"
                        className="form-select"
                        value={usuarioSeleccionado}
                        onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                    >
                        <option value="">Selecciona un responsable</option>
                        {usuariosGrupo.map((usuario) => (
                            <option key={usuario.id} value={usuario.id.toString()}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Estado del ticket */}
                <div className="mb-3">
                    <label htmlFor="estadoTicket" className="form-label"><strong>Estado del Ticket</strong></label>
                    <select
                        id="estadoTicket"
                        className="form-select"
                        value={estadoTicket}
                        onChange={(e) => {
                            setModificado(true);
                            setEstadoTicket(e.target.value);
                        }}
                    >
                        <option value="">Selecciona estado</option>
                        <option value="PENDIENTE">PENDIENTE</option>
                        <option value="RESUELTO">RESUELTO</option>
                    </select>
                </div>

                {/* Botón guardar */}
                <div className="d-grid mt-5">
                    <button className="btn btn-success" onClick={ModificarTicket}>
                        Guardar cambios
                    </button>
                </div>
            </div>
        </>
    );
};

export default EstadosTicket;

