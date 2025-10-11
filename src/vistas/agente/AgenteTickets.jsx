import { useEffect, useState } from "react"
import { obtenerTodosLosTickets } from "../../api/Ticket";
import Tabla from "../../componentes/Tabla";
import { Link } from "react-router-dom";

const AgenteTickets = () => {

    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem('token');

        obtenerTodosLosTickets(token)
            .then(datos => setTickets(datos))
            .catch(error => setError(error.message));


    }, []);

    const columnas = [
        { key: "id", label: "ID" },
        { key: "asunto", label: "Asunto",
            render: (valor,fila) =>(
                <Link to={`${fila.id}`} style = {{color:"black", textDecoration:"none", fontWeight:"bold"}}>
                    {valor}
                </Link>
            )
         },
        {
            key: "estadoTicket",
            label: "Estado",
            render: (valor) => {
                const clase = `estado-ticket estado-${valor.toLowerCase()}`;
                return <span className={clase}>{valor}</span>;
            }
        },
        {
            key: "urgencia",
            label: "Urgencia",
            render: (valor) => {
                const clase = `urgencia-ticket urgencia-${valor.toLowerCase()}`;
                return <span className={clase}>{valor}</span>;
            }
        },
        {
            key: "prioridad",
            label: "Prioridad",
            render: (valor) => {
                const clase = `prioridad-ticket prioridad-${valor.trim().toLowerCase()}`;
                return <span className={clase}>{valor}</span>;
            }
        },
        {
            key: "fechaCreacion",
            label: "Fecha",
            render: (valor) => new Date(valor).toLocaleDateString()
        }
    ];

    return (
        <div>
            <h2>Tickets</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Tabla datos={tickets} columnas={columnas} />
        </div>
    )

};

export default AgenteTickets;
