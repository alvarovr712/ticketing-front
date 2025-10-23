import EstadosTicket from "./EstadosTicket"


const EscribirMensaje = ({
    descripcionMensaje,
    setDescripcionMensaje,
    visibilidadTicket,
    setVisibilidadTicket,
    grupo,
    ticketId,
    crearMensaje,
    //Con esto conseguire que al reutilizar este componente en otra vista si quiero que no se vean los tabs los pondre a false
    mostrarTabs = true
}) => {

    return (
        
        <div className="d-flex flex-column">
            {mostrarTabs && (
                <ul className="nav nav-tabs mb-2">
                    <li className="nav-item">
                        <span
                            className={`nav-link ${visibilidadTicket === 1 ? "active" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setVisibilidadTicket(1)}
                        >
                            Público
                        </span>
                    </li>
                    <li className="nav-item">
                        <span
                            className={`nav-link ${visibilidadTicket === 0 ? "active" : ""} ${!grupo ? "disabled text-muted" : ""}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => grupo && setVisibilidadTicket(0)}
                        >
                            Privado
                        </span>
                    </li>
                </ul>
            )}

            <textarea
                className="form-control mb-2"
                rows="3"
                placeholder="Escribe un mensaje..."
                style={{ resize: "none" }}
                value={descripcionMensaje}
                onChange={(e) => setDescripcionMensaje(e.target.value)}
                //Con esto consigo que al pulsar enter se envie el mensaje tambien y el salto de linea con shift + enter.
                onKeyDown={(e) => {
                    if(e.key === "Enter" && !e.shiftKey){
                        e.preventDefault();
                        if(descripcionMensaje.trim()){
                            crearMensaje(descripcionMensaje, visibilidadTicket,ticketId)
                        }
                    }
                }}
            ></textarea>

            <div className="text-center">
                <button
                    className="btn btn-success"
                    style={{ maxWidth: "200px", width: "100%" }}
                    disabled={!descripcionMensaje.trim()}
                    onClick={() => crearMensaje(descripcionMensaje, visibilidadTicket, ticketId)}
                >
                    Enviar
                </button>
            </div>
        </div>
    )
};

export default EscribirMensaje;