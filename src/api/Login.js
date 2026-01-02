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

export const requestPasswordReset = async email => {
	const respuesta = await fetch(`${BASE_URL}/usuario/request-reset/${email}`, {
		method: "GET",
		headers: {'Content-Type': 'application/json'},
	})

	if(!respuesta.ok) {
		throw new Error('Fallo al enviar la solicitud de restablecimiento de contraseña');
	}

	return true;
}

export const resetPassword = async (newPassword, email, token) => {
	const respuesta = await fetch(`${BASE_URL}/usuario/reset-password`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({newPassword, email, token})
	})

	if(!respuesta.ok) {
		throw new Error('Error al resetear la contraseña');
	}   

	return true;
}