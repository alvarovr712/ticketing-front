const BASE_URL = "http://localhost:8080";

export const getGrupos = async token => {
	const respuesta = await fetch(`${BASE_URL}/grupo/nombres`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});	

	return respuesta.ok
		? respuesta.json()
		: [];
}