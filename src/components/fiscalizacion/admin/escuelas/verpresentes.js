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


export default function ClienteNuevo(props) {
  let params = useParams()
  const [activo, setActivo] = useState(false)
    const [turnos, setTurnos] = useState()
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({})
  const [cargandomesas, setCargandomesas] = useState(false)
  const [noreg, setNoreg] = useState()
  const handleChange = (e) =>{
    setForm({  ...form, [e.target.name]: e.target.value }) 
    traermesas(e.target.value)
 }


 const traer = async () => {
   

    const datos = await servicioFisca.cargarpresentes()
    console.log(datos)
    setTurnos(datos)
    setNoreg(datos[1])
   setActivo(true)
  

  }

  
  const traermesas = async (e) => {

    setCargandomesas(false)
   
  
    
  

   setCargandomesas(true)

  

  }
  
  const handleClickOpen = () => {
    setOpen(true);
     traer()
  };



  const handleDeterminar = async (event) => {
    event.preventDefault();
    try {

      await servicioFisca.crearmesa(form)
 
     
     } catch (error) {
       console.error(error);
       console.log('Error algo sucedio')
   
     
     }
     props.getClients()
   
    setOpen(false);
  };
  
  const handleClose = () => {
    setOpen(false);
   
  };

  return (
    <div>


      <Button variant="outlined" onClick={handleClickOpen}>
      Ver Presentes<TableRestaurantIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
     
        <DialogTitle>Resumen final </DialogTitle>
       
        <DialogContent>
          <DialogContentText>
        Datos de la mesa
          </DialogContentText>
    
      
           
          { turnos ? <>
                 Cantidad de presentes: {turnos[0]} <br/>
                 Cantidad de ausentes: {turnos[1]}<br/>
                 Cantidad de sin marcar: {turnos[2]}<br/>
                     </>: <>Cargando</>}
       
                 
               
                     
               
                    
      
          <DialogActions>
          {form.id_escuela && form.numero ? <><Button variant="contained" color="primary"  type="submit">Crear</Button></> : <><h6  style={{color: "red"}} >Completar todos los campos</h6></> } 
          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
          
         

        </DialogContent>
      
        
        
      </Dialog>
      
    </div>
  );
}
