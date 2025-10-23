import { Container, Dialog, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";



const userInfoDialog = (props) => {
	const { user, open, close } = props;
	const [boxSize, setBoxSize] = useState(6);
	const [esSolicitante, setEsSolicitante] = useState(false);
	const [isReadOnly, setIsReadOnly] = useState(true);
	const [fullWidth, setFullWidth] = useState(true);

	const handleClose = () => {
		close();
	}

	useEffect(() => {
		if (user.perfil === 'SOLICITANTE') {
			setEsSolicitante(true);
			setBoxSize(4);
		}

	}, [user]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="md"
			fullWidth={fullWidth}
		>
			<DialogTitle>
				Información del Usuario
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
				<Grid item size={boxSize}>
					<TextField
						label="Nombre"
						variant="standard"
						value={user.nombre}
						slotProps={{
							readOnly: isReadOnly,
						}}
					/>
				</Grid>

				<Grid item size={boxSize}>
					<TextField
						label="Apellidos"
						variant="standard"
						value={user.apellidos}
						slotProps={{
							readOnly: isReadOnly,
						}}
					/>
				</Grid>

				<Grid item size={boxSize}>
					<TextField
						label="Email"
						variant="standard"
						value={user.email}
						slotProps={{
							readOnly: isReadOnly,
						}}
					/>
				</Grid>

				{!esSolicitante && (
					<Grid item size={boxSize}>
						<TextField
							label="Grupo"
							variant="standard"
							value={user.grupo}
							slotProps={{
								readOnly: isReadOnly,
							}}
						/>
					</Grid>
				)}
				

				{esSolicitante && (
					<Grid item size={boxSize}>
						<TextField
							label="Empresa"
							variant="standard"
							value={user.empresa}
							slotProps={{
								readOnly: isReadOnly,
							}}
						/>
					</Grid>
				)}

				{esSolicitante && (
					<Grid item size={boxSize}>
						<TextField
							label="Teléfono"
							variant="standard"
							value={user.telefono}
							slotProps={{
								readOnly: isReadOnly,
							}}
						/>
					</Grid>
				)}
				{esSolicitante && (
					<Grid item size={boxSize}>
						<TextField
							label="CIF"
							variant="standard"
							value={user.cif}
							slotProps={{
								readOnly: isReadOnly,
							}}
						/>
					</Grid>
				)}

			</Grid>
		</Dialog>
	)
}

export default userInfoDialog;