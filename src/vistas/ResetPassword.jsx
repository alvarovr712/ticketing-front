import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { resetPassword } from '../api/Login';

export default function ResetPassword() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const [token] = useState(searchParams.get('token') || null);
	const [email] = useState(searchParams.get('email') || null);
	const [validRequest, setValidRequest] = useState(token && email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const changePassword = () => {
		if (!token || !email) {
			alert('Solicitud de restablecimiento de contraseña no válida. El token ha expirado o no es válido');
			return;
		}

		if (password !== confirmPassword) {
			alert('Las contraseñas no coinciden');
			return;
		}

		if (resetPassword(password, email, token)) {
			alert('Contraseña restablecida con éxito');

			navigate("/");
		} else {
			alert('No es posible restablecer la contraseña. Token expirado o no válido');
		}
	}



	return (
		<div className="vh-100 d-flex justify-content-center align-items-center">
			<h1 className="text-center text-primary mb-3 fs-2">Restablece su contraseña</h1>

			<Grid
				container
				rowSpacing={2}
				columnSpacing={2}
				padding={2}
				alignItems="center"
				alignContent={"center"}
				justifyContent={"center"}
			>
				<Grid size={12}>
					<TextField
						type="password"
						label="Nueva Contraseña"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Grid>

				<Grid size={12}>
					<TextField
						type="password"
						label="Confirmar Nueva Contraseña"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Grid>
			</Grid>

			<Grid size={12}>
				<Button variant="contained" onClick={() => changePassword()}>Aceptar</Button>
			</Grid>


		</div>
	)
}