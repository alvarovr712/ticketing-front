import { useEffect, useState } from "react"
import { obtenerTicketPorGrupo } from "../../api/Ticket";
import Tabla from "../../componentes/Tabla";
import { Link } from "react-router-dom";


const TecnicoTickets = () => {

    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id_grupo = localStorage.getItem('id_grupo');

        obtenerTicketPorGrupo(token, id_grupo)
            .then(datos => setTickets(datos))
            .catch(error => setError(error.message));
    }, [])

    const columnas = [
        { key: "id", label: "ID" },
        {
            key: "asunto", label: "Asunto",
            render: (valor, fila) => (
                <Link to={`${fila.id}`} style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
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
            key: "tecnico",
            label: "Responsable",
            render: (valor) => (
                <span style={{ fontWeight: "bold", color: "#007bff" }}>{valor}</span>
            )
        },
        {
            key: "fechaCreacion",
            label: "Fecha",
            render: (valor) => new Date(valor).toLocaleDateString()
        }
    ];

    const ticketsOrdenados = [...tickets].sort((a, b) => {
        const esUrgenteA = a.prioridad?.toLowerCase() === "urgente";
        const esUrgenteB = b.prioridad?.toLowerCase() === "urgente";

        if (esUrgenteA && !esUrgenteB) return -1;
        if (!esUrgenteA && esUrgenteB) return 1;

        return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
    });



    return (
        <div>
            <h2>Tickets</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Tabla datos={ticketsOrdenados} columnas={columnas} />
        </div>
    )
}

export default TecnicoTickets;