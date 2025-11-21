import { Dialog, DialogTitle, RadioGroup, Grid, Select, Radio, FormControlLabel, TextField, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { nuevoUsuario } from "../api/Usuarios";

const NewUserDialog = ({ open, close }) => {
	const [newUser, setNewUser] = useState({
		nombre: '',
		apellidos: '',
		email: '',
		perfil: 1,
		grupo: 0,
		telefono: "",
		cif: "",
		empresa: ""
	});
	const [esSolicitante, setEsSolicitante] = useState(false);
	const [grupos, setGrupos] = useState(localStorage.getItem('grupos') ? JSON.parse(localStorage.getItem('grupos')) : []);

	const handleSaving = async () => {
		console.log(newUser);

		nuevoUsuario(localStorage.getItem('token'), newUser)
		.then( ok => {
			if (ok) {
				console.log("Usuario creado correctamente.");
				handleClose();
			} else {
				console.log("Error al crear el usuario.");
			}
		}).catch( err => {
			console.log("Error al crear el usuario:", err);
		});
	}

	const handleClose = (event, reason) => {
		if (reason && reason === 'backdropClick') return;

		setNewUser({
			nombre: '',
			apellidos: '',
			email: '',
			perfil: 1,
			grupo: 0,
			telefono: "",
			cif: "",
			empresa: ""
		})

		close();
	}

	useEffect(() => {
		if (newUser.perfil == 4) {
			setEsSolicitante(true);
		} else {
			setEsSolicitante(false);
		}
	}, [newUser.perfil]);

	return (
		<Dialog
			open={open}
			onClose={close}
			maxWidth="lg"
			fullWidth={true}
		>
			<DialogTitle>
				Nuevo usuario
			</DialogTitle>

			<Grid
				container
				rowSpacing={2}
				columnSpacing={2}
				padding={2}
				alignItems="center"
				alignContent={"center"}
				justifyContent={"center"}
			>
				<Grid
					size={2}
					alignItems="center"
					alignContent={"center"}
					justifyContent={"center"}
				>
					<Button variant="contained" onClick={() => handleSaving()}>Guardar</Button>
				</Grid>

				<Grid size={8}></Grid>

				<Grid size={2}
					alignItems="center"
					alignContent={"center"}
					justifyContent={"center"}>
					<Button variant="contained" onClick={() => handleClose()}>Cerrar</Button>
				</Grid>

				{/* BEGIN 1ST ROW*/}
				<Grid size={3}></Grid>

				<Grid
					size={6}
					alignItems="center"
					alignContent={"center"}
					justifyContent={"center"}
				>
					<RadioGroup
						row
						defaultChecked={4}
						onChange={(e) => setNewUser({ ...newUser, perfil: parseInt(e.target.value) })}
					>
						<FormControlLabel value={1} control={<Radio />} label="Administrador" />
						<FormControlLabel value={2} control={<Radio />} label="Agente" />
						<FormControlLabel value={3} control={<Radio />} label="Técnico" />
						<FormControlLabel value={4} control={<Radio />} label="Solicitante" />
					</RadioGroup>
				</Grid>

				<Grid size={3}></Grid>
				{/* END 1ST ROW*/}

				{/* BEGIN 2ND ROW*/}
				<Grid size={2}></Grid>

				<Grid
					size={4}
					alignItems="center"
					alignContent={"center"}
					justifyContent={"center"}
				>
					<TextField
						label="Nombre"
						variant="standard"
						onChange={({ target }) => setNewUser({ ...newUser, nombre: target.value })}
					/>
				</Grid>

				<Grid
					size={4}
					alignItems="center"
					alignContent={"center"}
					justifyContent={"center"}
				>
					<TextField
						label="Apellidos"
						variant="standard"
						onChange={({ target }) => setNewUser({ ...newUser, apellidos: target.value })}
					/>
				</Grid>

				<Grid size={2}></Grid>
				{/* END 2ND ROW*/}

				{/* BEGIN 3RD ROW*/}
				<Grid size={2}></Grid>

				<Grid
					size={4}
					alignItems="center"
					alignContent={"center"}
					justifyContent={"center"}
				>
					<TextField
						label="Email"
						variant="standard"
						onChange={({ target }) => setNewUser({ ...newUser, email: target.value })}
					/>
				</Grid>

				<Grid
					size={4}
					alignItems="center"
					alignContent={"center"}
					justifyContent={"center"}
				>
					{!esSolicitante && (
						<>
							<Select
								defaultChecked={0}
								variant="standard"
								placeholder="Grupo Soporte"
								onChange={(e) => setNewUser({ ...newUser, grupo: e.target.value })}
							>
								{grupos.map(({ id, nombre }) => (
									<MenuItem key={id} value={id}>{nombre}</MenuItem>
								))}
							</Select>
						</>
					)}
				</Grid>

				<Grid size={2}></Grid>
				{/* END 3RD ROW*/}

				{esSolicitante && (
					<>
						{/* BEGIN 3RD ROW*/}
						<Grid
							size={4}
							alignItems="center"
							alignContent={"center"}
							justifyContent={"center"}
						>
							<TextField
								label="Nombre Empresa"
								variant="standard"
								onChange={({ target }) => setNewUser({ ...newUser, empresa: target.value })}
							/>
						</Grid>
						<Grid
							size={4}
							alignItems="center"
							alignContent={"center"}
							justifyContent={"center"}
						>
							<TextField
								label="CIF"
								variant="standard"
								onChange={({ target }) => setNewUser({ ...newUser, cif: target.value })}
							/>
						</Grid>
						<Grid
							size={4}
							alignItems="center"
							alignContent={"center"}
							justifyContent={"center"}
						>
							<TextField
								label="Teléfono"
								variant="standard"
								onChange={({ target }) => setNewUser({ ...newUser, telefono: target.value })}
							/>
						</Grid>
						{/* END 3RD ROW*/}
					</>
				)}
			</Grid>
		</Dialog>
	)
}

export default NewUserDialog;