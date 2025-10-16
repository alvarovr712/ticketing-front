const BASE_URL = "http://localhost:8080";

export const borrarAnotacion = async (token, id) => {
    const respuesta = await fetch(`${BASE_URL}/anotacion/borrar/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!respuesta.ok) {
        throw new Error('Error al borrar la anotación');
    }
}

export const editarAnotacion = async (token, id, descripcion) => {
    const respuesta = await fetch(`${BASE_URL}/anotacion/editar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${token}`
        },
        body: descripcion
    });
    console.log("Código de respuesta:", respuesta.status);
    if (!respuesta.ok) {
        throw new Error('Error al editar la anotación');
    }

}

export const crearAnotacion = async (token, descripcion, visibilidadTicket,id_ticket) =>{
    const anotacion = {
        descripcion,
        visibilidadTicket,
        ticket: {
            id: id_ticket
        }
    }
    const respuesta = await fetch(`${BASE_URL}/anotacion/crear`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(anotacion)
    });
    if (!respuesta.ok) {
        throw new Error('Error al crear la anotación');

    }
    
}