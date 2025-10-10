import { Link } from 'react-router-dom';
const MenuEscritorio = ({nombre,contenidoMenu,onLogout}) => {
    return (
        <aside
            className="d-none d-md-flex flex-column bg-dark text-white p-3"
            style={{ width: '16rem', minHeight: '100vh' }}
        >
            <h5 className="text-center mb-4">{nombre}</h5>

            {contenidoMenu.map((item, index) => (
                <Link
                    key={index}
                    className="btn btn-secondary mb-2"
                    to={item.ruta}
                >
                    {item.icono} {item.nombre}
                </Link>
            ))}

            <button className="btn btn-danger mt-auto" onClick={onLogout}>
                🚪 Cerrar sesión
            </button>
        </aside>
    );
};

export default MenuEscritorio;