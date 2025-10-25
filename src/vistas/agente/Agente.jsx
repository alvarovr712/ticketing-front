import { Outlet, useNavigate } from "react-router-dom"
import MenuEscritorio from "../../componentes/MenuEscritorio";
import MenuMovil from "../../componentes/MenuMovil";
import { liberarTickets } from "../../api/Ticket";


const Agente = () => {

    const navigate = useNavigate();

    const nombreUsuario = localStorage.getItem('nombre');

    const contenidoMenu = [
        { nombre: 'Tickets', ruta: '/agente/tickets', icono: '🎫' },
        { nombre: 'Historial Tickets', ruta: '/agente/historial', icono: '🕝' },
        { nombre: 'WorkSpace', ruta: '/agente/workspace', icono: '💼' }
    ]

    const logout = async () => {
        try {
            const token = localStorage.getItem("token");
            const id_usuario = localStorage.getItem("id_usuario");

            if (token && id_usuario) {
                await liberarTickets(token, id_usuario);
            }
        } catch (error) {
            console.error("Error al liberar tickets al cerrar sesión:", error);
        }

        localStorage.clear();
        navigate('/');
    };


    return (
        
            <div className="d-flex flex-column flex-md-row" style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>

                {/* Menú lateral fijo (visible solo en escritorio) 
        Este menu solo se muestra en pantallas medianas o superiores*/}
                <MenuEscritorio
                    nombre={nombreUsuario}
                    contenidoMenu={contenidoMenu}
                    onLogout={logout} />

                <MenuMovil
                    titulo={nombreUsuario}
                    contenidoMenu={contenidoMenu}
                    onLogout={logout} />

                {/* Contenido principal  con outlet lo que consigo es que este contenido es el que se va a cargar o va a cambiar el menu seguira estando */}
                <main className="flex-grow-1 p-4">
                    <Outlet />
                </main>
            </div>
        

    );
}
export default Agente;