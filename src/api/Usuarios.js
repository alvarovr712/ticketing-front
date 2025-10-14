const BASE_URL = "http://localhost:8080";

export const getUsuarios =  async (token) => {
	const response = await fetch(`${BASE_URL}/usuarios`, {
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