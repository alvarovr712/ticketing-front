import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada al backend para obtener usuarios con tickets abiertos
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/admin/usuarios-con-tickets");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const verTicketsUsuario = (usuarioId) => {
    navigate(`/administrador/usuarios/${usuarioId}`);
  };

  return (
    <div>
      <h2>Usuarios con tickets abiertos</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios con tickets abiertos.</p>
      ) : (
        <ul className="list-group">
          {usuarios.map((usuario) => (
            <li
              key={usuario.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => verTicketsUsuario(usuario.id)}
              style={{ cursor: "pointer" }}
            >
              <span>{usuario.nombre}</span>
              <span className="badge bg-primary rounded-pill">
                {usuario.ticketsAbiertos} tickets
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Usuarios;