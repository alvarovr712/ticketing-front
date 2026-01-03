import { useEffect, useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";


const TicketHistorial = () => {

	const [tickets, setTickets] = useState([]);

	const [error, setError] = useState("");



	// Estados para los filtros

	const [filtroEstado, setFiltroEstado] = useState("todos"); // Filtro por dropdown (estado)

	const [filtroBusqueda, setFiltroBusqueda] = useState(""); // Filtro por input (texto)


	const navigate = useNavigate();


	const cargarTickets = async () => {

		try {

			const token = localStorage.getItem("token");

			const response = await fetch("http://localhost:8080/api/solicitante/tickets", {

				headers: { Authorization: `Bearer ${token}` },

			});


			if (!response.ok) throw new Error("Error al obtener tickets");


			const data = await response.json();

			setTickets(data);

		} catch (err) {

			setError(err.message);

		}

	};


	useEffect(() => {

		cargarTickets();

	}, []);


	// Función para asignar color según el estado

	const estadoColor = (estado) => {

		if (!estado) return "badge bg-light text-dark";


		switch (estado.toLowerCase()) {

			case "abierto":

				return "badge bg-primary";

			case "en proceso":

				return "badge bg-warning text-dark";

			case "resuelto":

				return "badge bg-success";

			case "cerrado":

				return "badge bg-secondary";

			default:

				return "badge bg-light text-dark";

		}

	};


	// Hook para aplicar los filtros de forma eficiente

	const ticketsFiltrados = useMemo(() => {

		const busquedaLower = filtroBusqueda.toLowerCase();


		return tickets.filter(ticket => {

			// 1. Filtrar por Estado

			const coincideEstado =

				filtroEstado === "todos" ||

				(ticket.estadoTicket && ticket.estadoTicket.toLowerCase() === filtroEstado);


			// 2. Filtrar por Búsqueda (en Asunto o Descripción)

			const coincideBusqueda =

				(ticket.asunto && ticket.asunto.toLowerCase().includes(busquedaLower)) ||

				(ticket.descripcion && ticket.descripcion.toLowerCase().includes(busquedaLower));


			return coincideEstado && coincideBusqueda;

		});

	}, [tickets, filtroEstado, filtroBusqueda]);


	// Lista de estados para el Dropdown

	const estadosDisponibles = ["Todos", "Abierto", "Pendiente", "Resuelto", "Cerrado"];



	return (

		<div className="container mt-5">

			<h2 className="mb-4 text-center">Historial de Tickets</h2>


			{/* --- CONTROLES DE FILTRO --- */}

			<div className="row mb-4">

				{/* Filtro por Estado (Dropdown) */}

				<div className="col-md-4 mb-3">

					<label htmlFor="filtroEstado" className="form-label">Filtrar por Estado:</label>

					<select

						id="filtroEstado"

						className="form-select"

						value={filtroEstado}

						onChange={(e) => setFiltroEstado(e.target.value)}

					>

						{estadosDisponibles.map(estado => (

							<option key={estado} value={estado.toLowerCase()}>

								{estado}

							</option>

						))}

					</select>

				</div>


				{/* Filtro por Búsqueda de Texto (Input) */}

				<div className="col-md-8 mb-3">

					<label htmlFor="filtroBusqueda" className="form-label">Buscar (Asunto o Descripción):</label>

					<input

						type="text"

						id="filtroBusqueda"

						className="form-control"

						placeholder="Buscar tickets por asunto o descripción..."

						value={filtroBusqueda}

						onChange={(e) => setFiltroBusqueda(e.target.value)}

					/>

				</div>

			</div>




			{error && <p className="text-danger">{error}</p>}


			{ticketsFiltrados.length === 0 ? (

				<p className="text-center text-muted">

					{filtroEstado !== "todos" || filtroBusqueda ? "No se encontraron tickets con esos filtros." : "No has creado ningún ticket todavía."}

				</p>

			) : (

				<div className="row">

					{ticketsFiltrados.map((ticket) => (

						<div

							key={ticket.id}

							className="col-md-6 col-lg-4 mb-4"

						>

							<div

								className="card shadow-sm h-100 cursor-pointer"

								style={{ cursor: "pointer", transition: "transform 0.2s" }}

								onClick={() => navigate(`/solicitante/tickets/${ticket.id}`)}

								onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}

								onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}

							>

								<div className="card-body d-flex flex-column">

									<h5 className="card-title">{ticket.asunto}</h5>

									<p className="card-text text-truncate" style={{ maxHeight: "4.5em", overflow: "hidden" }}>

										{ticket.descripcion}

									</p>

									<div className="mt-auto d-flex justify-content-between align-items-center">

										<span className={estadoColor(ticket.estado)}>{ticket.estado}</span>

										<small className="text-muted">

											{new Date(ticket.fechaCreacion).toLocaleDateString("es-ES", {

												day: "2-digit",

												month: "short",

												year: "numeric",

											})}

										</small>

									</div>

								</div>

							</div>

						</div>

					))}

				</div>

			)}

		</div>

	);

};


export default TicketHistorial;
