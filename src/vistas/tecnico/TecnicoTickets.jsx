import { useEffect, useState } from "react"
import { asignarTicketTecnico, desasignarTicketTecnico, obtenerTicketPorGrupo } from "../../api/Ticket";
import Tabla from "../../componentes/Tabla";
import { Link } from "react-router-dom";


const TecnicoTickets = () => {

  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const token = localStorage.getItem('token');
    const id_grupo = localStorage.getItem('id_grupo');
    const id_usuario = localStorage.getItem('id_usuario');

    const cargarTickets = () => {
      obtenerTicketPorGrupo(token, id_grupo, id_usuario)
        .then(datos => setTickets(datos))
        .catch(error => setError(error.message));
    };

    cargarTickets();

    const intervalo = setInterval(cargarTickets, 10000);

    return () => clearInterval(intervalo);
  }, []);

  const columnas = [
    {
      key: "favorito",
      label: "★",
      render: (_, fila) => {
        const token = localStorage.getItem("token");
        const id_usuario = localStorage.getItem("id_usuario");
        const esResponsable = fila.responsable_tecnico === parseInt(id_usuario);

        const manejarClick = () => {
          const accion = esResponsable
            ? desasignarTicketTecnico(token, fila.id)
            : asignarTicketTecnico(token, fila.id, id_usuario);

          accion
            .then(ticketActualizado => {
              setTickets(prev =>
                prev.map(t => (t.id === ticketActualizado.id ? ticketActualizado : t))
              );
            })
            .catch(error => setError(error.message));
        };

        return (
          <button
            onClick={manejarClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              color: esResponsable ? "#f0ad4e" : "#ccc"
            }}
            title={esResponsable ? "Desasignar de mí" : "Asignar a mí"}
          >
            ★
          </button>
        );
      }
    },
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

      {tickets.length === 0 && !error && (
        <p style={{ color: "#666" }}>No hay tickets disponibles en este momento.</p>
      )}

      <Tabla datos={ticketsOrdenados} columnas={columnas} mostrarDescripcion={true} />
    </div>
  );

}

export default TecnicoTickets;