import { useEffect, useState } from "react";
import { obtenerTicketsResueltos, filtrarTicketsPorAsunto, filtrarTicketsPorFechas } from "../../api/Ticket";
import Tabla from "../../componentes/Tabla";
import { Link } from "react-router-dom";

const AgenteHistorialTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

 
  const [asunto, setAsunto] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    obtenerTicketsResueltos(token)
      .then((datos) => setTickets(datos))
      .catch((error) => setError(error.message));
  }, []);

  // Handlers de filtros
  const handleFiltrarPorAsunto = async () => {
    try {
      const token = localStorage.getItem("token");
      const datos = await filtrarTicketsPorAsunto(token, asunto);
      setTickets(datos);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFiltrarPorFechas = async () => {
    try {
      const token = localStorage.getItem("token");
      const datos = await filtrarTicketsPorFechas(token, fechaInicio, fechaFin);
      setTickets(datos);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReset = async () => {
    try {
      const token = localStorage.getItem("token");
      const datos = await obtenerTicketsResueltos(token);
      setTickets(datos);
      setAsunto("");
      setFechaInicio("");
      setFechaFin("");
    } catch (error) {
      setError(error.message);
    }
  };

  const columnas = [
    { key: "id", label: "ID" },
    {
      key: "asunto",
      label: "Asunto",
      render: (valor, fila) => (
        <Link
          to={`/agente/tickets/${fila.id}`}
          style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}
        >
          {valor}
        </Link>
      ),
    },
    {
      key: "estadoTicket",
      label: "Estado",
      render: (valor) => {
        const clase = `estado-ticket estado-${valor.toLowerCase()}`;
        return <span className={clase}>{valor}</span>;
      },
    },
    {
  key: "urgencia",
  label: "Urgencia",
  render: (valor) => <span>{valor}</span>
},

    {
      key: "prioridad",
      label: "Prioridad",
      render: (valor) => {
        const clase = `prioridad-ticket prioridad-${valor.trim().toLowerCase()}`;
        return <span className={clase}>{valor}</span>;
      },
    },
    {
      key: "fechaCreacion",
      label: "Fecha",
      render: (valor) => new Date(valor).toLocaleDateString(),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Tickets Resueltos</h2>
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      
      <div className="d-flex align-items-center mb-3 gap-4 flex-wrap">
        
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control form-control-sm w-auto"
            placeholder="Asunto..."
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />
          <button className="btn btn-primary btn-sm py-0 px-2" onClick={handleFiltrarPorAsunto}>
            Buscar
          </button>
        </div>

        
        <div className="d-flex align-items-center gap-2">
          <input
            type="date"
            className="form-control form-control-sm w-auto"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            className="form-control form-control-sm w-auto"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <button className="btn btn-success btn-sm py-0 px-2" onClick={handleFiltrarPorFechas}>
            Buscar
          </button>
        </div>

        
        <button className="btn btn-secondary btn-sm py-0 px-2" onClick={handleReset} title="Actualizar">
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>

     
      <Tabla datos={tickets} columnas={columnas} resaltarUrgentes={false} />
    </div>
  );
};

export default AgenteHistorialTickets;

