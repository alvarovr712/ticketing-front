import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../../api/Usuarios";
import Tabla from "../../componentes/Tabla";

const Usuarios = () => {
	const [usuarios, setUsuarios] = useState([]);
	// const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');

		getUsuarios(token)
		.then(({ usuarios }) => {
			setUsuarios(usuarios);
			console.log(usuarios);
		})
		.catch(err => console.log(err)); 

	},[])

	const columns = 
	[
		{
			key: "nombre",
			label: "Nombre"
		},
		{
			key: "apellidos",
			label: "Apellidos"
		},
		{
			key: "email",
			label: "Email"
		},
		{
			key: "activo",
			label: "Activo",
			render: (valor) => valor ? 'Sí' : 'No'
		}
	]

	return (
		<Tabla datos={usuarios} columnas={columns} />
	)

};

export default Usuarios;