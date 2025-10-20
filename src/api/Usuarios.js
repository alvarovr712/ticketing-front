const BASE_URL = "http://localhost:8080";

export const getUsuarios =  async (token) => {
	const response = await fetch(`${BASE_URL}/usuario/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})

	return !response.ok
		? []
		: await response.json();
}

// OBTENER TODOS LOS USUARIOS DE UN GRUPO

export const obtenerUsuariosPorGrupo = async (token, id) => {
	const response = await fetch(`${BASE_URL}/agente/grupo/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
	if (!response.ok) {
		return [];
	}
	return await response.json();
}		