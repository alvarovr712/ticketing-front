import { Button, Dialog, DialogTitle, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { actualizarUsuario } from "../api/Usuarios";

const UserInfoDialog = ({ user, open, close }) => {
  const [userData, setUserData] = useState({ ...user });
  const [grupos, setGrupos] = useState(localStorage.getItem('grupos') ? JSON.parse(localStorage.getItem('grupos')) : []);
  const [boxSize, setBoxSize] = useState(6);
  const [esSolicitante, setEsSolicitante] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setUserData({ ...user });
    close();
  };

  const handleSaveUser = async () => {
    const perfiles = {
      "ADMIN": 1,
      "TECNICO": 2,
      "AGENTE": 3,
      "SOLICITANTE": 4,
    };

    userData.perfil = perfiles[userData.perfil];
    console.log("Guardando usuario...", userData);

    actualizarUsuario(localStorage.getItem('token'), userData.id, userData)
      .then((ok) => {
        if (ok) {
          console.log("Usuario actualizado correctamente.");
          setEditMode(false);
          handleClose();
        } else {
          console.log("Error al actualizar el usuario.");
        }
      })
      .catch((err) => {
        console.log("Error al actualizar el usuario:", err);
      });
  };

  const handleNoSave = () => {
    setUserData({ ...user });
    setEditMode(false);
  };

  const handleChosenGrupo = (event) => {
    setUserData({ ...userData, idGrupo: event.target.value });
  };

  useEffect(() => {
    if (user.perfil === 'SOLICITANTE') {
      setEsSolicitante(true);
      setBoxSize(4);
    } else {
      setEsSolicitante(false);
      setBoxSize(6);
    }
  }, [user]);

  useEffect(() => {
    if (!editMode) {
      setUserData({ ...user });
    }
  }, [editMode, user]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
      <DialogTitle>Información del Usuario</DialogTitle>

      <Grid container rowSpacing={2} columnSpacing={2} padding={2} alignItems="center" justifyContent="center">
        <Grid item size={2}>
          {!editMode && (
            <Button variant="contained" onClick={() => setEditMode(true)}>Editar</Button>
          )}
          {editMode && (
            <Button variant="contained" onClick={handleSaveUser}>Guardar</Button>
          )}
        </Grid>

        <Grid item size={2}>
          {editMode && (
            <Button variant="outlined" onClick={handleNoSave}>Cancelar</Button>
          )}
        </Grid>

        <Grid item size={6}></Grid>

        <Grid item size={2}>
          <Button variant="contained" onClick={handleClose}>Cerrar</Button>
        </Grid>

        <Grid item size={boxSize}>
          <TextField
            label="Nombre"
            variant="standard"
            value={userData.nombre || ""}
            onChange={({ target }) => setUserData({ ...userData, nombre: target.value })}
            InputProps={{ readOnly: !editMode }}
          />
        </Grid>

        <Grid item size={boxSize}>
          <TextField
            label="Apellidos"
            variant="standard"
            value={userData.apellidos || ""}
            onChange={({ target }) => setUserData({ ...userData, apellidos: target.value })}
            InputProps={{ readOnly: !editMode }}
          />
        </Grid>

        <Grid item size={boxSize}>
          <TextField
            label="Email"
            variant="standard"
            value={userData.email || ""}
            onChange={({ target }) => setUserData({ ...userData, email: target.value })}
            InputProps={{ readOnly: !editMode }}
          />
        </Grid>

        {!esSolicitante && (
          <Grid item size={boxSize}>
            <Select
              value={userData.idGrupo || 0}
              onChange={handleChosenGrupo}
              disabled={!editMode}
            >
              {grupos.map(({ id, nombre }) => (
                <MenuItem key={id} value={id}>{nombre}</MenuItem>
              ))}
            </Select>
          </Grid>
        )}

        {esSolicitante && (
          <>
            <Grid item size={boxSize}>
              <TextField
                label="Empresa"
                variant="standard"
                value={userData.empresa || ""}
                onChange={({ target }) => setUserData({ ...userData, empresa: target.value })}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>

            <Grid item size={boxSize}>
              <TextField
                label="Teléfono"
                variant="standard"
                value={userData.telefono || ""}
                onChange={({ target }) => setUserData({ ...userData, telefono: target.value })}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>

            <Grid item size={boxSize}>
              <TextField
                label="CIF"
                variant="standard"
                value={userData.cif || ""}
                onChange={({ target }) => setUserData({ ...userData, cif: target.value })}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
};

export default UserInfoDialog;
