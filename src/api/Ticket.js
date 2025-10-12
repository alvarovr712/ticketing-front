const BASE_URL = "http://localhost:8080";

// -------OBTENER TODOS LOS TICKETS -------
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

// -------OBTENER UN TICKET POR ID -------
export const obtenerUnTicket = async(token,id) => {
    const respuesta = await fetch(`${BASE_URL}/ticket/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!respuesta.ok) {
        throw new Error('Error al obtener el ticket');
    }   
    return await respuesta.json();
}

//--------OBTENER TODOS LOS GRUPOS QUE HAY -------
export const obtenerTodosGrupos = async(token) => {
    const respuesta = await fetch(`${BASE_URL}/grupo/nombres`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }); 
    if(!respuesta.ok) {
        throw new Error('Error al obtener los grupos');
    }
    return await respuesta.json();
}

