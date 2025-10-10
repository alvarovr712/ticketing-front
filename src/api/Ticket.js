const BASE_URL = "http://localhost:8080";

export const obtenerTodosLosTickets = async(token) => {
    const respuesta = await fetch(`${BASE_URL}/ticket`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if(!respuesta.ok) {
        throw new Error('Error al obtener los tickets');
    }
    return await respuesta.json();
}

