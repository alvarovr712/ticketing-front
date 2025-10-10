import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from "../api/Login";

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

            if (perfil === 1) {
                setMensaje('✅ Login correcto');
                setTipoMensaje('ok');
                setMostrarMensaje(true);
                //Pasados los segundos que le digamos pasamos a la siguiente vista en este caso en 3 segundos
                setTimeout(() => {
                    navigate('/administrador');
                }, 3000);
            } else if (perfil === 2) {
                setMensaje('✅ Login correcto');
                setTipoMensaje('ok');
                setMostrarMensaje(true);
                setTimeout(() => {
                    navigate('/tecnico/tickets')
                }, 3000);
            } else if (perfil === 3) {
                setMensaje('✅ Login correcto');
                setTipoMensaje('ok');
                setMostrarMensaje(true);
                setTimeout(() => {
                    navigate('/agente/tickets')
                }, 3000)
            } else if (perfil === 4) {
                setMensaje('✅ Login correcto');
                setTipoMensaje('ok');
                setMostrarMensaje(true);
                setTimeout(() => {
                    navigate('/solicitante/tickets')
                }, 3000)
            }

        } catch {
            setMensaje('❌ Email o contraseña incorrectos');
            setTipoMensaje('error');
            setMostrarMensaje(true);

        }
    }

    return (



        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '1rem',
                boxShadow: '0 0 30px rgba(11, 235, 149, 0.1)',
                width: '30rem',

            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar sesión</h2>

                {/* El onChange captura el valor que el usuario escribe y lo guarda en el estado */}
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    style={{
                        width: '100%',
                        marginBottom: '1rem',
                        padding: '0.6rem',
                        fontSize: '1rem',
                        border: '1px solid black',
                        borderRadius: '0.5rem'
                    }}
                />

                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    style={{
                        width: '100%',
                        marginBottom: '1.5rem',
                        padding: '0.6rem',
                        fontSize: '1rem',
                        border: '1px solid black',
                        borderRadius: '0.5rem'
                    }}
                />

                {mostrarMensaje && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '1rem',
                            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                            textAlign: 'center',
                            maxWidth: '20rem',
                            fontSize: '1.1rem',
                            color: tipoMensaje === 'ok' ? '#155724' : '#721c24',
                            border: `2px solid ${tipoMensaje === 'ok' ? '#c3e6cb' : '#f5c6cb'}`,
                            background: tipoMensaje === 'ok' ? '#d4edda' : '#f8d7da'
                        }}>
                            <p>{mensaje}</p>

                            {tipoMensaje === 'error' && (
                                <button
                                    onClick={() => setMostrarMensaje(false)}
                                    style={{
                                        marginTop: '1rem',
                                        padding: '0.5rem 1.2rem',
                                        backgroundColor: '#721c24',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.4rem',
                                        fontSize: '1rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Aceptar
                                </button>
                            )}
                        </div>
                    </div>
                )}


                <button
                    onClick={iniciarSesion}
                    style={{
                        width: '100%',
                        padding: '0.6rem',
                        backgroundColor: 'purple',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '1.5rem',
                        display: 'block',

                    }}
                >
                    Iniciar
                </button>
                
            </div>
        </div>
    );
};

export default Login;