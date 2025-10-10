
import { Routes, Route } from "react-router-dom";
import Login from './vistas/Login';
import Administrador from './vistas/administrador/Administrador';
import Agente from './vistas/agente/Agente';
import Solicitante from './vistas/solicitante/Solicitante';
import Tecnico from "./vistas/tecnico/Tecnico";
import AgenteTickets from "./vistas/agente/AgenteTickets";



function App() {


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/administrador" element={<Administrador />} />
      <Route path="/agente" element={<Agente />}>
        <Route path="tickets" element={<AgenteTickets />} />
        <Route index element={<AgenteTickets />} /> {/* opcional: carga tabla al entrar en /agente */}
      </Route>
      <Route path='/solicitante/tickets' element={<Solicitante />} />
      <Route path='/tecnico/tickets' element={<Tecnico />} />
    </Routes>
  )
}

export default App
