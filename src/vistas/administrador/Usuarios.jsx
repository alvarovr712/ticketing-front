import { useEffect, useState } from "react";
import UserInfoDialog from "../../componentes/UserInfoDialog";
import NewUserDialog from "../../componentes/NewUserDialog";
import { cambiarEstadoUsuario, getUsuario, getUsuarios } from "../../api/Usuarios";
import Tabla from "../../componentes/Tabla";
import { Button, Chip } from "@mui/material";
import { getGrupos } from "../../api/Grupos";

const Usuarios = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
	const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
	const [user, setUser] = useState({});

	const getGroups = () => {
		return getGrupos(localStorage.getItem('token'))
	}

	useEffect(() => {
		const token = localStorage.getItem('token');

		getUsuarios(token)
		.then(usuarios  =>  setUsuarios(usuarios))
		.catch(err => console.log(err)); 

		getGroups()
		.then(grupos => {
			const g = [{id:0, nombre: "Indicar Grupo Soporte"} ,...grupos]; 

			localStorage.setItem('grupos', JSON.stringify(g));
		})
	},[])

	const handleOpenDialog = (id) => { 
		getUsuario(localStorage.getItem('token'), id)
		.then((usuario) => {
			setUser(usuario);

			console.log("Usuario seleccionado:", usuario);
			setOpenUserInfoDialog(true);
		})
		.catch(err => console.log(err));
	}

	const handleCloseUserInfoDialog = () => {
		setOpenUserInfoDialog(false);

		const token = localStorage.getItem('token');

		getUsuarios(token)
		.then(usuarios  =>  setUsuarios(usuarios))
		.catch(err => console.log(err));
	}

	const handleCloseNewUserDialog = () => {
		setOpenNewUserDialog(false);

		const token = localStorage.getItem('token');

		getUsuarios(token)
		.then(usuarios  =>  setUsuarios(usuarios))
		.catch(err => console.log(err));
	}

	const changeUserState = async id => {
		console.log("Cambiando estado del usuario con id:", id);

		cambiarEstadoUsuario(localStorage.getItem('token'), id)
		.then(ok => {
			if (ok) {
				console.log("Estado del usuario cambiado correctamente.");	
				const token = localStorage.getItem('token');

				getUsuarios(token)
				.then(usuarios  =>  setUsuarios(usuarios))
				.catch(err => console.log(err));
			} else {
				console.log("Error al cambiar el estado del usuario.");
			}
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
			render: (valor, {id}) => 
				(valor 
				? <Chip label="Activo" color="success" onClick={() => changeUserState(id)} /> 
				: <Chip label="Desactivado" color="error" onClick={() => changeUserState(id)} />)
		}
	]

	return (
		<div>
			<Button 
				variant="contained" 
				onClick={() => setOpenNewUserDialog(true)}
			>
				Nuevo usuario
			</Button>
			<Tabla datos={usuarios} columnas={columns} />

			<UserInfoDialog 
				open={openUserInfoDialog} 
				close={() => handleCloseUserInfoDialog(false)} 
				user={user}
			/>

			<NewUserDialog 
				open={openNewUserDialog} 
				close={() => handleCloseNewUserDialog()}
			/>
		</div>
		
	)

};

export default Usuarios;