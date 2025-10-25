import '../estilos/Tabla.css'; 

//Con datalabel lo que consigo hacer la tabla responsive para moviles y queda en forma de card.
//Con render consigo insertar en la tabla el valor o componente que quiera y que se visuali

const Tabla = ({ datos, columnas }) => {
    return (
        <table className="tabla">
            <thead>
                <tr>
                    {columnas.map(col => <th key={col.key}>{col.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {datos.map((fila, index) => (
                   <tr key={fila.id || index} className="tr-tooltip" data-tooltip={fila.descripcion || "Sin descripción"}
    >
                        {columnas.map(col => (
                            <td key={col.key} data-label={col.label}>
                                {col.render ? col.render(fila[col.key], fila) : fila[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
};

export default Tabla;
