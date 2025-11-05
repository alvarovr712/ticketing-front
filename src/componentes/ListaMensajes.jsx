const ListaMensajes = ({

    anotaciones,
    id_anotacion,
    descripcion,
    setDescripcion,
    activarEdicion,
    cancelarEdicion,
    guardarEdicion,
    EliminarMensaje
}) => {
    const id_perfil = parseInt(localStorage.getItem('perfil'));

    return (
        <div className="flex-grow-1 overflow-auto contenedor-mensajes">

            {[...anotaciones]
                .sort((a, b) => b.id - a.id)
                .map((anotacion, index) => {
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

                                {id_anotacion === anotacion.id ? (
                                    <div className="edicion-mensaje">
                                        <textarea
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            rows={3}
                                            className="textarea-edicion"
                                        />
                                        <div className="acciones-edicion">
                                            <button className="btn-accion" onClick={() => guardarEdicion(anotacion)}>Guardar</button>
                                            <button className="btn-accion" onClick={cancelarEdicion}>Cancelar</button>
                                        </div>
                                    </div>
                                ) : (
                                    <p>{anotacion.descripcion}</p>
                                )}

                            </div>
                            {/* Botones para editar y borrar cada mensaje */}
                            {id_perfil !== 2 &&(
                            <div className="acciones-mensaje">
                                <button className="btn-accion" onClick={() => activarEdicion(anotacion)}>Editar</button>
                                <button className="btn-accion" onClick={() => EliminarMensaje(anotacion.id)}>Borrar</button>
                            </div>
                            )}
                        </div>
                    );
                })}
        </div>


    )
};

export default ListaMensajes;