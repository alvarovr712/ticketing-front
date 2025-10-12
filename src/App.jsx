import { Routes, Route } from "react-router-dom";
import Login from './vistas/Login';
import Administrador from './vistas/administrador/Administrador';
import Agente from './vistas/agente/Agente';
import Solicitante from './vistas/solicitante/Solicitante';
import Tecnico from "./vistas/tecnico/Tecnico";
import AgenteTickets from "./vistas/agente/AgenteTickets";
import DetallesTicket from "./vistas/agente/DetallesTicket";
import Usuarios from "./vistas/administrador/Usuarios";
import TicketsUsuario from "./vistas/administrador/TicketUsuario"; 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Rutas administrador */}
      <Route path="/administrador" element={<Administrador />}>
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="usuarios/:usuarioId" element={<TicketsUsuario />} />
        {/* otras rutas hijas como tickets, historial, etc */}
      </Route>

      {/* Rutas agente */}
      <Route path="/agente" element={<Agente />}>
        <Route path="tickets" element={<AgenteTickets />} />
        <Route index element={<AgenteTickets />} />
        <Route path="tickets/:id" element={<DetallesTicket />} />
      </Route>

      <Route path='/solicitante/tickets' element={<Solicitante />} />
      <Route path='/tecnico/tickets' element={<Tecnico />} />
    </Routes>
  );
}

export default App;
