
import { useNavigate } from "react-router-dom"
import MenuEscritorio from '../../componentes/MenuEscritorio';
import MenuMovil from '../../componentes/MenuMovil';
import { Outlet } from 'react-router-dom';

const Administrador = () => {
    const navigate = useNavigate();

    const contenidoMenu = [

        { nombre: 'Inicio', ruta: '/administrador', icono: '🏠' },
        { nombre: 'Usuarios', ruta: '/administrador/usuarios', icono: '👥' },
        { nombre: 'Tickets', ruta: '/administrador/tickets', icono: '🎫' },
        {nombre: 'Historial Tickets', ruta: '/administrador/historial', icono: '🕜'}

    ];

    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (

        <div className="d-flex flex-column flex-md-row" style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>

           
            <MenuEscritorio
                nombre='Admin'
                contenidoMenu={contenidoMenu}
                onLogout={logout} />

            <MenuMovil
                titulo='Admin'
                contenidoMenu={contenidoMenu}
                onLogout={logout} />

            
            <main className="flex-grow-1 p-4">
                <Outlet />
            </main>
        </div>

    );
}

export default Administrador;