import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from "../api/Login";
import "../estilos/Login.css"

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    const iniciarSesion = async () => {
        try {
            localStorage.clear();

            //Llamamos a la funcion de loginUsuario que se encuentra en la carpeta api
            const datos = await loginUsuario(email, password);
            const perfil = datos.id_perfil;

            //Guardamos los datos que queremos al logear en el localStorage para usarlos luego
            localStorage.setItem('token', datos.token);
            localStorage.setItem('nombre', datos.nombre);
            localStorage.setItem('perfil', datos.id_perfil);
            localStorage.setItem('email', datos.email);
            localStorage.setItem('id_grupo', datos.id_grupo)
            localStorage.setItem('id_usuario', datos.id_usuario)

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

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center fondo-login">
            <div className="bg-white p-5 rounded shadow login-card">
                <h1 className="text-center text-primary mb-3 fs-2">🎟️ Helpdesk</h1>
                <p className="text-center text-muted mb-4">
                    Accede a tu cuenta para gestionar tus tickets
                </p>

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

                <button onClick={iniciarSesion} className="btn btn-morado w-100">
                    Iniciar sesión
                </button>
            </div>
        </div>
    );

};

export default Login;