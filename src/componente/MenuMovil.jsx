import React from 'react';
import '../estilos/MenuMovil.css'; 

const MenuMovil = ({ titulo, contenidoMenu, onLogout }) => {
  const id = 'menuMovil'; 

  return (
    <>
      {/* Aqui estamos diciendole que cuando la pantalla sea menor que la md de bootstrap se pliegue el menu y al pulsar el boton Menú se despliegue */}
      <nav className="navbar bg-dark navbar-dark px-3 d-md-none navbar-sticky">
        <button
          className="btn btn-outline-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#menuMovil"
        >
           ☰ Menú
        </button>
        <span className="navbar-brand">{titulo}</span>
      </nav>

      {/* Aqui monto el menu que es el que se vera cuando se despliegue */}
      <div
        className="offcanvas offcanvas-start text-bg-dark"
        tabIndex="-1"
        id={id}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">{titulo}</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column gap-3">
          {contenidoMenu.map((item, index) => (
            <a key={index} className="btn btn-secondary" href={item.ruta}>
              {item.icono} {item.nombre}
            </a>
          ))}

          <button className="btn btn-danger mt-auto" onClick={onLogout}>
            🚪 Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuMovil;