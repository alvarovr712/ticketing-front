import { useEffect, useState } from "react"
import { obtenerTicketsPorGrupoResueltos } from "../../api/Ticket";
import Tabla from "../../componentes/Tabla";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "../../estilos/ThemeToggleButton.css";

const TecnicoHistorialTickets = () => {

    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id_grupo = localStorage.getItem('id_grupo');

        obtenerTicketsPorGrupoResueltos(token, id_grupo)
            .then(datos => setTickets(datos))
            .catch(error => setError(error.message))
    }, [])

    const columnas = [
        { key: "id", label: "ID" },
        {
            key: "asunto", label: "Asunto",
            render: (valor, fila) => (
                <Link to={`/tecnico/tickets/${fila.id}`}  className="link-asunto" style={{ textDecoration: "none", fontWeight: "bold" }}>
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
        },
        {
            key: "fecha_resolucion",
            label: "Fecha Resolución",
            render: (valor) => new Date(valor).toLocaleDateString()
        }
    ];



    return (
        <div className={theme === "dark" ? "dark-container" : "light-container"}>
            <h2>Tickets</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Tabla datos={tickets} columnas={columnas} resaltarUrgentes={false}/>
        </div>
    )
}

export default TecnicoHistorialTickets;