import { Outlet, useNavigate } from "react-router-dom";
import MenuMovil from "../../componentes/MenuMovil";
import MenuEscritorio from "../../componentes/MenuEscritorio";

const Solicitante = () => {
    const nombreUsuario = localStorage.getItem('nombre');
    const navigate = useNavigate();

    const contenidoMenu = [

        {nombre:'Tickets', ruta:'/solicitante/tickets', icono:'🎫'},
        {nombre:'Tickets Enviados', ruta:'/solicitante/historial', icono:'🕝'}

    ];

    const logout = () =>{
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="d-flex flex-column flex-md-row" style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>

            <MenuEscritorio
                nombre={nombreUsuario}
                contenidoMenu={contenidoMenu}
                onLogout={logout} />

            <MenuMovil
                titulo={nombreUsuario}
                contenidoMenu={contenidoMenu}
                onLogout={logout} />

            <main className="flex-grow-1 p-4">
                <Outlet />
            </main>
        </div>

    );

};

export default Solicitante;



