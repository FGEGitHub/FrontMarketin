import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  useState } from "react";
import servicioFisca from '../../../../services/fiscalizacion'
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Paper } from '@mui/material';
import TableRestaurantTwoToneIcon from '@mui/icons-material/TableRestaurantTwoTone';

export default function ClienteNuevo(props) {
  let params = useParams()
  const [activo, setActivo] = useState(false)
    const [turnos, setTurnos] = useState()
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({})
  const handleChange = (e) =>{
    setForm({  ...form, [e.target.name]: e.target.value }) 
 }


 const traer = async () => {

   setTurnos(turnos)
   setForm({id:props.id_mesa})
   setActivo(true)
  

  }

  

  
  const handleClickOpen = () => {
    setOpen(true);
     traer()
  };



  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

      await servicioFisca.modificarmesa(form)
 
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }
     props.traer()
   
    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
   
  };

  return (
    <div>


      <Button variant="outlined" onClick={handleClickOpen}>
      <TableRestaurantTwoToneIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle>Mesa Nueva </DialogTitle>
        <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
        <DialogContent>
          <DialogContentText>
        Definir cantidad de votantes
          </DialogContentText>
          <form  onSubmit={handleDeterminar}> 
      
         
                    <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="cantidad de votantes"
                                name="cantidad"
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                type='number'
                            />
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Numero de referencia
                            </InputLabel>
      
          <DialogActions>
          {form.cantidad ? <><Button variant="contained" color="primary"  type="submit">Enviar</Button></> : <><h6  style={{color: "red"}} >Completar todos los campos</h6></> } 
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           </form>
         

        </DialogContent>
      
        </Paper>
        
      </Dialog>
      
    </div>
  );
}
