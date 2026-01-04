import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Button, TextField, Box, Card, CardContent, Typography, Snackbar, Alert } from "@mui/material";
import { resetPassword } from '../api/Login';

export default function ResetPassword() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const [token] = useState(searchParams.get('token') || null);
	const [email] = useState(searchParams.get('email') || null);
	const [validRequest, setValidRequest] = useState(token && email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('success');

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackbar(false);
	};

	const showFeedback = (message, severity) => {
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setOpenSnackbar(true);
	};

	const changePassword = async () => {
		if (!token || !email) {
			showFeedback('Solicitud de restablecimiento no válida. Token expirado o inválido', 'error');
			return;
		}

		if (password !== confirmPassword) {
			showFeedback('Las contraseñas no coinciden', 'warning');
			return;
		}

		try {
			await resetPassword(password, email, token);
			showFeedback('Contraseña restablecida con éxito', 'success');
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} catch (error) {
			console.error(error);
			showFeedback('No es posible restablecer la contraseña. Token expirado o no válido', 'error');
		}
	}



	return (
		<div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f4f6f8" }}>
			<Card sx={{ maxWidth: 350, width: "100%", boxShadow: 3, borderRadius: 2, m: 2 }}>
				<CardContent sx={{ p: 3 }}>
					<Typography variant="h6" component="h1" align="center" gutterBottom sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}>
						Restablecer Contraseña
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<TextField
							type="password"
							label="Nueva Contraseña"
							fullWidth
							variant="outlined"
							size="small"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputLabelProps={{ style: { fontSize: '0.9rem' } }}
							sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
						/>
						<TextField
							type="password"
							label="Confirmar Nueva Contraseña"
							fullWidth
							variant="outlined"
							size="small"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							InputLabelProps={{ style: { fontSize: '0.9rem' } }}
							sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
						/>
						<Button
							variant="contained"
							size="small"
							fullWidth
							sx={{ mt: 1, fontWeight: "bold", borderRadius: 2, paddingY: 1 }}
							onClick={() => changePassword()}
						>
							Aceptar
						</Button>
					</Box>
				</CardContent>
			</Card>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	)
}