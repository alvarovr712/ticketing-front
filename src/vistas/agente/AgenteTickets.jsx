import { useEffect, useState, useContext } from "react";
import { asignarTicket, desasignarTicket, obtenerTodosLosTickets } from "../../api/Ticket";
import Tabla from "../../componentes/Tabla";
import { Link } from "react-router-dom";


const AgenteTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");



  useEffect(() => {
    const token = localStorage.getItem("token");
    const id_usuario = localStorage.getItem("id_usuario")

    obtenerTodosLosTickets(token, id_usuario)
      .then(datos => setTickets(datos))
      .catch(error => setError(error.message));
  }, []);

  const columnas = [
    {
      key: "favorito",
      label: "★",
      render: (_, fila) => {
        const token = localStorage.getItem("token");
        const id_usuario = localStorage.getItem("id_usuario");
        const esResponsable = fila.responsable === parseInt(id_usuario);

        const manejarClick = () => {
          const accion = esResponsable
            ? desasignarTicket(token, fila.id)
            : asignarTicket(token, fila.id, id_usuario);

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
      key: "asunto",
      label: "Asunto",
      render: (valor, fila) => (
        <Link
          to={`${fila.id}`}
          style={{
            color: "black",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          {valor}
        </Link>
      )
    },
    {
      key: "estadoTicket",
      label: "Estado",
      render: valor => {
        const clase = `estado-ticket estado-${valor.toLowerCase()}`;
        return <span className={clase}>{valor}</span>;
      }
    },
    {
      key: "urgencia",
      label: "Urgencia",
      render: valor => {
        const clase = `urgencia-ticket urgencia-${valor.toLowerCase()}`;
        return <span className={clase}>{valor}</span>;
      }
    },
    {
      key: "prioridad",
      label: "Prioridad",
      render: valor => {
        const clase = `prioridad-ticket prioridad-${valor.trim().toLowerCase()}`;
        return <span className={clase}>{valor}</span>;
      }
    },
    {
      key: "fechaCreacion",
      label: "Fecha",
      render: valor => new Date(valor).toLocaleDateString()
    }
  ];

  return (
    <div className="container my-4">
      <h2>Tickets</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Tabla datos={tickets} columnas={columnas} />
    </div>
  );
};

export default AgenteTickets;

