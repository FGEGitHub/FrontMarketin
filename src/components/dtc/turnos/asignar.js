import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioDtc from '../../../services/dtc';
import Ficha from '../usuario1/personapsic.js/ficha';
import Tooltip from '@material-ui/core/Tooltip';
import { Paper, CircularProgress, Typography, Card, CardActions } from '@mui/material';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  font-family: 'Montserrat', sans-serif;
`;

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [form, setForm] = useState({});
  const [nuevoUsuario, setNuevoUsuario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const handleSelection = async (event, value) => {
    console.log('Valor seleccionado:', value);
    setSelectedValue({ id_persona: value?.id });
  };

  const handleClickOpen = () => {
    setForm({ id: props.id });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    props.traer({ fecha: e.target.value });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBackendCall = async () => {
    if (selectedValue || nuevoUsuario) {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
      const usuario = JSON.parse(loggedUserJSON);
      
      const mergedJSON = {
        ...selectedValue,
        id: form.id,
        nuevoUsuario,
        nombre,
        apellido
      };
      
      console.log(mergedJSON);
      
      if (usuario.nivel == 40 || usuario.nivel == 41) {
        const ta = await servicioDtc.agendarturnocadia(mergedJSON);
        alert(ta);
      } else {
        const ta = await servicioDtc.agendarturno(mergedJSON);
        alert(ta);
      }

      props.traer({ fecha: form.fecha });
      handleClose();
    }
  };

  return (
    <Box
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <Tooltip title="Nueva Clase">
        <Button variant="contained" onClick={handleClickOpen}> Agendar </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3>{props.id} <b> Agendar Turno</b></h3>
          <FormControlLabel
            control={<Checkbox checked={nuevoUsuario} onChange={(e) => setNuevoUsuario(e.target.checked)} />}
            label="Usuario Nuevo"
          />
          {nuevoUsuario ? (
            <>
              <TextField label="Nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth />
              <TextField label="Apellido" variant="outlined" value={apellido} onChange={(e) => setApellido(e.target.value)} fullWidth />
            </>
          ) : (
            <Autocomplete 
              options={props.chicos}
              getOptionLabel={(option) => option.id_usuario == null ? option.nombre + " " + option.apellido : option.nombre + " " + option.apellido + "  Presente"}
              renderInput={(params) => (
                <TextField {...params} label="Selecciona una opción" variant="outlined" />
              )}
              onChange={handleSelection}
            />
          )}
          {selectedValue && !nuevoUsuario ? <Ficha id={selectedValue.id} /> : null}
          <DialogActions>
            <Button variant="outlined" color="success" onClick={handleBackendCall}>Asignar turno</Button>
            <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
