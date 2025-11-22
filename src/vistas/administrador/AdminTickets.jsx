import { useEffect, useState, useContext } from "react";
import { asignarTicket, desasignarTicket, obtenerTodosLosTickets } from "../../api/Ticket";
import Tabla from "../../componentes/Tabla";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const AdminTickets = () => {
	const [tickets, setTickets] = useState([]);
	const [error, setError] = useState("");



	useEffect(() => {
		const token = localStorage.getItem("token");
		const id_usuario = localStorage.getItem("id_usuario");

		const cargarTickets = () => {
			obtenerTodosLosTickets(token, id_usuario)
				.then(datos => {
					setTickets(datos);
					setError("");
				})
				.catch(error => {
					console.error("Error al obtener tickets:", error);
					setTickets([]);
					setError("No hay tickets disponibles o hubo un error al cargar.");
				});
		};

		cargarTickets();

		const intervalo = setInterval(cargarTickets, 10000);

		return () => clearInterval(intervalo);
	}, []);

	const columnas = [
		{ key: "id", label: "ID" },
		{
			key: "asunto",
			label: "Asunto",
			render: (_, { id, asunto }) => (
				<Link to={`/administrador/tickets/${id}`}>
					<Button variant="text">{asunto}</Button>
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

	const ticketsOrdenados = [...tickets].sort((a, b) => {
		const esUrgenteA = a.prioridad?.toLowerCase() === "urgente";
		const esUrgenteB = b.prioridad?.toLowerCase() === "urgente";

		if (esUrgenteA && !esUrgenteB) return -1;
		if (!esUrgenteA && esUrgenteB) return 1;

		return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
	});

	return (
		<div className="container my-4">
			<h2>Tickets</h2>

			{error && <p style={{ color: "red" }}>{error}</p>}

			{tickets.length === 0 && !error && (
				<p style={{ color: "#666" }}>No hay tickets disponibles en este momento.</p>
			)}

			<Tabla datos={ticketsOrdenados} columnas={columnas} mostrarDescripcion={true} />
		</div>
	);
};

export default AdminTickets;