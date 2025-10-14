const BASE_URL = "http://localhost:8080";

export const borrarAnotacion = async(token, id) =>{
    const respuesta = await fetch(`${BASE_URL}/anotacion/borrar/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if(!respuesta.ok) {
        throw new Error('Error al borrar la anotación');
    }
    
}