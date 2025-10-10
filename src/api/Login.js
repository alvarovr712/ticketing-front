const BASE_URL = "http://localhost:8080";

export const loginUsuario = async (email, password) => {
    const respuesta = await fetch(`${BASE_URL}/usuario/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
    });

    if(!respuesta.ok) {
        throw new Error('Login incorrecto');
    }
    return await respuesta.json();
}