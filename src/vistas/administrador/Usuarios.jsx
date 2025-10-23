import { useEffect, useState } from "react";
import UserInfoDialog from "../../componentes/UserInfoDialog";
import { getUsuario, getUsuarios } from "../../api/Usuarios";
import Tabla from "../../componentes/Tabla";
import { Button, Chip } from "@mui/material";

const Usuarios = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [user, setUser] = useState({});
	// const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');

		getUsuarios(token)
		.then((usuarios) => {
			setUsuarios(usuarios);
		})
		.catch(err => console.log(err)); 

	},[])

	const handleOpenDialog = (id) => { 
		console.log("Abriendo dialogo para el usuario con id: ", id);

		getUsuario(localStorage.getItem('token'), id)
		.then((usuario) => {
			setUser(usuario);
			setOpenDialog(true);
		})
		.catch(err => console.log(err));
	}


	const columns = 
	[
		{
			key: "fullNombre",
			label: "Nombre completo",
			render: (valor, { id, nombre, apellidos }) => <Button variant="text" onClick={() => handleOpenDialog(id)}>{nombre} {apellidos}</Button>
		},
		{
			key: "email",
			label: "Email"
		},
		{
			key: "activo",
			label: "Activo",
			render: (valor) => {
				valor 
				? <Chip label="Activo" color="success" /> 
				: <Chip label="Desactivado" color="error" /> 
			}
		}
	]

	return (
		<div>
			<Tabla datos={usuarios} columnas={columns} />
			<UserInfoDialog 
				open={openDialog} 
				close={() => setOpenDialog(false)} 
				user={user}/>
		</div>
		
	)

};

export default Usuarios;