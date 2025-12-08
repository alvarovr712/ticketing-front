import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from "../api/Login";
import { useAuth } from "../context/AuthContext";
import "../estilos/Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [mostrarModalRecuperar, setMostrarModalRecuperar] = useState(false);
    const [emailRecuperacion, setEmailRecuperacion] = useState("");

    const iniciarSesion = async () => {
        try {
            localStorage.clear();


            const datos = await loginUsuario(email, password);
            const perfil = datos.id_perfil;

            localStorage.setItem('token', datos.token);
            localStorage.setItem('nombre', datos.nombre);
            localStorage.setItem('perfil', datos.id_perfil);
            localStorage.setItem('email', datos.email);
            localStorage.setItem('id_grupo', datos.id_grupo)
            localStorage.setItem('id_usuario', datos.id_usuario)



            login({
                token: datos.token,
                user: {
                    nombre: datos.nombre,
                    role: perfil === 1 ? "admin"
                        : perfil === 2 ? "tecnico"
                            : perfil === 3 ? "agente"
                                : "solicitante",
                    email: datos.email,
                    id_grupo: datos.id_grupo,
                    id_usuario: datos.id_usuario
                }
            });

            setMensaje('✅ Login correcto');
            setTipoMensaje('ok');
            setMostrarMensaje(true);

            setTimeout(() => {
                if (perfil === 1) navigate('/administrador');
                else if (perfil === 2) navigate('/tecnico/tickets');
                else if (perfil === 3) navigate('/agente/tickets');
                else if (perfil === 4) navigate('/solicitante/tickets');
            }, 2000);
        } catch {
            setMensaje('❌ Email o contraseña incorrectos');
            setTipoMensaje('error');
            setMostrarMensaje(true);
        }
    };
    const enviarRecuperacion = () => {
        console.log("Email para recuperar contraseña:", emailRecuperacion);
        // Aqui va la logica de recuperacion de contraseña
        setMostrarModalRecuperar(false);
        setEmailRecuperacion("");
    };

    return (
  <div className="vh-100 d-flex justify-content-center align-items-center fondo-login">
    <div className="bg-white p-5 rounded shadow login-card">
      <h1 className="text-center text-primary mb-3 fs-2">🎟️ Helpdesk</h1>
      <p className="text-center text-muted mb-4">
        Accede a tu cuenta para gestionar tus tickets
      </p>

      <form onSubmit={(e) => { e.preventDefault(); iniciarSesion(); }}>
        <input
          type="email"
          className="form-control mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          className="form-control mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
        />

        {mostrarMensaje && (
          <div className="modal-backdrop d-flex justify-content-center align-items-center">
            <div className={`alert ${tipoMensaje === 'ok' ? 'alert-success' : 'alert-danger'} text-center p-4 rounded`}>
              <p>{mensaje}</p>
              {tipoMensaje === 'error' && (
                <button className="btn btn-danger mt-3" onClick={() => setMostrarMensaje(false)}>
                  Aceptar
                </button>
              )}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-morado w-100">
          Iniciar sesión
        </button>
      </form>

      <p
        className="text-center mt-3 text-primary"
        style={{ cursor: "pointer" }}
        onClick={() => setMostrarModalRecuperar(true)}
      >
        ¿Has olvidado la contraseña?
      </p>
    </div>
    {mostrarModalRecuperar && (
      <div className="modal-backdrop d-flex justify-content-center align-items-center">
        <div className="bg-white p-4 rounded shadow" style={{ width: "300px" }}>
          <h5 className="text-center mb-3">Recuperar contraseña</h5>
          <input
            type="email"
            className="form-control mb-3"
            value={emailRecuperacion}
            onChange={e => setEmailRecuperacion(e.target.value)}
            placeholder="Introduce tu email"
          />
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => setMostrarModalRecuperar(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={enviarRecuperacion}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default Login;
