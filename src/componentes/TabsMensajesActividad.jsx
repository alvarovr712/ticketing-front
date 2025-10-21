const TabsMensajesActividad = ({vistaActiva, setVistaActiva}) => {

    return(
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
    )
};

export default TabsMensajesActividad;