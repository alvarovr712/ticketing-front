import { Routes, Route } from "react-router-dom";
import Login from './vistas/Login';
import Administrador from './vistas/administrador/Administrador';
import Agente from './vistas/agente/Agente';
// ...
import Solicitante from './vistas/solicitante/Solicitante';
// Importa el componente de LISTA
import TicketSolicitante from "./vistas/solicitante/TicketSolicitante";
// Importa el componente de DETALLE
import DetallesTicketSolicitante from "./vistas/solicitante/DetallesTicketSolicitante";
// ...
import Tecnico from "./vistas/tecnico/Tecnico";
import AgenteTickets from "./vistas/agente/AgenteTickets";
import DetallesTicket from "./vistas/agente/DetallesTicket";
import Usuarios from "./vistas/administrador/Usuarios";
import TicketsUsuario from "./vistas/administrador/TicketUsuario"; 
import ThemeToggleButton from './componentes/ThemeToggleButton';
import AgenteHistorialTickets from "./vistas/agente/AgenteHistorialTickets";
import TecnicoTickets from "./vistas/tecnico/TecnicoTickets";
import TecnicoHistorialTickets from "./vistas/tecnico/TecnicoHistorialTickets";
import TecnicoDetallesTicket from "./vistas/tecnico/TecnicoDetallesTicket";
import AgenteWorkspace from "./vistas/agente/AgenteWorkspace";
import TecnicoWorkspace from "./vistas/tecnico/TecnicoWorkspace";

function App() {
  return (
    <div className="app-container">
      <ThemeToggleButton />
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ADMINISTRADOR */}
        <Route path="/administrador" element={<Administrador />}>
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/:usuarioId" element={<TicketsUsuario />} />
        </Route>

        {/* AGENTE */}
        <Route path="/agente" element={<Agente />}>
          <Route path="tickets" element={<AgenteTickets />} />
          <Route index element={<AgenteTickets />} />
          <Route path="tickets/:id" element={<DetallesTicket />} />
          <Route path="historial" element={<AgenteHistorialTickets/>}/>
          <Route path="workspace" element={<AgenteWorkspace/>}/>
        </Route>

        {/* SOLICITANTE */}
        <Route path="/solicitante" element={<Solicitante />}>
          <Route path="tickets" element={<TicketSolicitante />} />
          <Route path="tickets/:id" element={<DetallesTicketSolicitante />} />
        </Route>


        {/* TECNICO */}
        <Route path="/tecnico" element={<Tecnico />} >
          <Route path="tickets" element={<TecnicoTickets/>} />
          <Route path="historial" element={<TecnicoHistorialTickets/>}/>
          <Route path="tickets/:id" element={<TecnicoDetallesTicket/>}/>
          <Route path="workspace" element={<TecnicoWorkspace/>}/>
        
        </Route>

      </Routes>
    </div>
  );
}

export default App;