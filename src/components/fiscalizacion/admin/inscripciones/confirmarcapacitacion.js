import * as React from 'react';
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import servicioInscripciones from '../../../../services/fiscalizacion'
import Tooltip from '@material-ui/core/Tooltip';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';

import { Paper } from '@mui/material';

import Box from '@mui/material/Box';

export default function Clasenueva(props) {


    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState()
    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleClickOpen = () => {
        setOpen(true);
        setForm({id:props.id_inscripcion})
    };
    const handleDeterminar = async (event) => {
  
   

         const respuesta=  await servicioInscripciones.Confirmarcapa(props.id)
         alert(respuesta)


    
        props.traer()

        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>


< Tooltip title="Confirmar Capacitacion">
             <Button   onClick={handleClickOpen }>Confirmar Capa< SchoolTwoToneIcon/></Button> 
        </Tooltip>
            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Confirmar Capacitado</DialogTitle>
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
                          ¿El fiscal realizo la capacitacion con exito? 
                        </DialogContentText>
                        {props.id_inscripcion}

                            <DialogActions>
                       <Button variant="contained" color="primary" onClick={handleDeterminar}>Si</Button>
                                <Button variant="outlined" color="error" style={{ marginLeft: "auto" }} onClick={handleClose}>Cancelar</Button>

                            </DialogActions>
                      


                    </DialogContent>

                </Paper>

            </Dialog>

        </div>
    );
}