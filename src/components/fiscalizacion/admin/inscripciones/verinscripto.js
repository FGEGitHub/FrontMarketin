import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import servicioFide from '../../../../services/fiscalizacion'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import NativeSelect from '@mui/material/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import React, { useEffect, useState, Fragment } from "react";
import DialogActions from '@mui/material/DialogActions';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
const currencies = [
  {
    value: 'CBU',
    label: 'CBU N°1',
  },
  {
    value: 'CBU',
    label: 'CBU N°2',
  },


  
];

export default function SelectTextFields(props) {
  const [open, setOpen] = React.useState(false);
  //const usuario  = useUser().userContext
  let params = useParams()
  let id_curso = params.id
  const [usuarioo, setUsuarioo] = useState()
  const [cargandomesas, setCargandomesas] = useState(false)
  const [turnos, setTurnos] = useState()
  const [mesas, setMesas] = useState()
  const [activo, setActivo] = useState(false)




  const traer = async () => {
    setUsuarioo()
  
   
   const turnos = await servicioFide.traerescuelas()
   setTurnos(turnos)
setActivo(true)
  

  }

  const [inscripcion, setInscripcion] = useState({


})
  const traermesas = async (e) => {

    setCargandomesas(false)
   
   const mes = await servicioFide.traermesas(e)
   setMesas(mes)

   setCargandomesas(true)
   console.log('dps')
  

  }


  const handleClickOpen = async () => {
    await traer()
    setOpen(true);
    setInscripcion(({

      dni: props.dni,

      id_inscripcion:props.id_inscripcion,
     
  
  
    }))
  }

  const handleClose = () => {
    setActivo(false)
    setOpen(false);
  };

  
  const handleChange = (e) => {
    console.log(inscripcion)
    setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })
}
const handleChange2 = (e) => {
  
  setInscripcion({ ...inscripcion, [e.target.name]: e.target.value })

  traermesas(e.target.value)
}


  ////
  const handleDeterminar = async (event) => {

    try {

      await servicioFide.inscribir(
        inscripcion


      )
      props.getClients()

    } catch (error) {
      console.error(error);
      console.log('Error algo sucedio')

    }
    setActivo(false)
    setOpen(false);
  };/////
  const [currency, setCurrency] = React.useState('EUR');

  /*   const handleChange = (event) => {
      setCurrency(event.target.value);
    }; */


  return (


    
    
    <Box

      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       < Tooltip title="Ver inscripcion">
      <BorderColorIcon variant="outlined" onClick={handleClickOpen}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>

      {activo ? <>
        <DialogContent>


       { props.id_inscripcion}
             <h3>Asignaciona escuela {props.nombre}{props.apellido} </h3>
             
             {props.fecha_carga}
          DNI:  { props.dni}<br/>
   
           <br/>
            <p   onClick={() => window.open('https://wa.me/'+props.telefono)}   > <b>Telefono: {props.telefono}</b> <br/>Click aca apra enviar whatsap<WhatsAppIcon/> </p> <br/>
            <p   onClick={() => window.open('https://wa.me/'+props.telefono2)}   > <b>Telefono 2: {props.telefono2}</b> <br/>Click aca apra enviar whatsap<WhatsAppIcon/> </p> <br/>
         <b> Agregar detalles en caso q este inscripto de donde</b> 
            <br/>
     
          

   
   
                 <br />
                 <label>Escuela prioridad 1</label>
                 
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Escuela
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange2}
                                inputProps={{
                                    name: 'id_escuela',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  
                             <option value={'1'}> Elegir</option>
                             {turnos.map((row) => (
                                       
                              <option value={row.id}> {row.nombre}</option>

                    ))}

                            </NativeSelect>
                            <label>Escuela prioridad 2</label>
                 
                 <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Escuela
                 </InputLabel>
                 <NativeSelect
                     defaultValue={30}
                     onChange={handleChange2}
                     inputProps={{
                         name: 'id_escuela2',
                         id: 'uncontrolled-native',

                     }}
                 
                 >  
                  <option value={'1'}> Elegir</option>
                  {turnos.map((row) => (
                            
                   <option value={row.id}> {row.nombre}</option>

         ))}

                 </NativeSelect>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                               Mesa
                            </InputLabel>
                            <NativeSelect
                                defaultValue={30}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'mesa',
                                    id: 'uncontrolled-native',

                                }}
                            
                            >  

                            {cargandomesas ? <>
                             <option value={'1'}> Elegir</option>
                          
                             {mesas.map((row) => (
                                       
                                       <option value={row.id}> {row.numero}</option>
         
                             ))}
                                  </>:<>Cargando</>}
                            </NativeSelect>

             
                 <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Domicilio"
                    name="domicilio"
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                />
                <br/>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   ¿ Fuiste fiscal antes?
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'fiscal_antes',
                        id: 'uncontrolled-native',

                    }}
                >   <option value={'Sin determinar'}>Sin determinar</option>
                    <option value={'Si'}>Si</option>
                    <option value={'No'}>No</option>

                </NativeSelect>

                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   ¿ Dispones de movilidad ?
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'movilidad',
                        id: 'uncontrolled-native',

                    }}
                >   <option value={'Sin determinar'}>Sin determinar</option>
                    <option value={'Si'}>Si</option>
                    <option value={'No'}>No</option>

                </NativeSelect>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                   ¿ Sos Vegano?
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    onChange={handleChange}
                    inputProps={{
                        name: 'vegano',
                        id: 'uncontrolled-native',

                    }}
                >   <option value={'Sin determinar'}>Sin determinar</option>
                    <option value={'Si'}>Si</option>
                    <option value={'No'}>No</option>

                </NativeSelect>
    
               

                 <DialogActions>
                 {inscripcion.fiscal_antes && inscripcion.movilidad && inscripcion.vegano && inscripcion.domicilio && inscripcion.id_escuela && inscripcion.id_escuela2 ? <>         <Button variant="contained" color="primary"   onClick={handleDeterminar} >Inscribir</Button></>:<><p style={{ color: 'crimson' }} >COMPLETAR TODOS LOS DATOS</p></>  }


          <Button  variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>
         
        </DialogActions>
           
         
        </DialogContent>
        </>: <>Cargando</>}
      </Dialog>
    </Box >

   
  );
}
