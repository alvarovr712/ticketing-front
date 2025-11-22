const BASE_URL = "http://localhost:8080";

export const getUsuarios = async (token) => {
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

export const getUsuario = async (token, id) =>
{
	const response = await fetch(`${BASE_URL}/usuario/${id}`, {
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

export const actualizarUsuario = async (token, id, usuario) => {
	const response = await fetch(`${BASE_URL}/usuario/${id}/editar`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(usuario)
	})	

	return response.ok;
}

export const nuevoUsuario = async (token, usuario) => {
	const response = await fetch(`${BASE_URL}/usuario/nuevo`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(usuario)
	})	

	return response.ok;
}
export const cambiarEstadoUsuario = async (token, id) => {
	const response = await fetch(`${BASE_URL}/usuario/${id}/estado`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})

	return response.ok;
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