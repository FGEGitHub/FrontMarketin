import { useState, useEffect } from "react";
import servicioInscipciones from '../../../services/inscripciones'
import MUIDataTable from "mui-datatables";
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import CargaDeTabla from "../../CargaDeTabla"
import ModalInscribirauto from "./ModalInscribirauto"
import ModalDesInscribirauto from "./ModalDesinscribir"

import { useNavigate } from "react-router-dom";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
//import overbookingData from "./overbooking";
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
////

import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

//import overbookingData from "./overbooking";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




const Lotes = () => {
  //configuracion de Hooks
  const [priori1, setPriori1] = useState([]);
  const [priori2, setPriori2] = useState([]);
  const [priori3, setPriori3] = useState([]);
    const [cantidadpeniente, setCantidadpendiente] = useState([]);
    const [noparticipo, setNoparticipo] = useState([]);
    const [listadef1, setListadef1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState(true);
  const navigate = useNavigate();




  const cambiarVista = () => {

    setVista(!vista)
  }



  

  const designarturnos = async () => {

    const rta = await servicioInscipciones.designarturnos()
    alert(rta)
    
  
    
  }    
  const getClients = async () => {

    const clients = await servicioInscipciones.lista({

    })
    console.log(clients)
    setPriori1(clients[0])
    setPriori2(clients[1])
    setPriori3(clients[2])
    setCantidadpendiente(clients[3])
  
    setLoading(false);
  }

  useEffect(() => {
    getClients()
  }, [])

  ///
  //opcionde click en el nombre



  // renderiza la data table
  return (
    <>
      {loading ? (<CargaDeTabla />)
        : (
          <div>
            <Stack spacing={2} sx={{ width: '100%' }}>

              <Alert severity="info">Cantidad de alumnas sin curso: {cantidadpeniente}<a onClick={() => navigate('/administracion/personas')}>   <u><b>   Ir a Alumnas</b></u> </a></Alert>
              
            </Stack>
            <br />
            <Button variant='contained' onClick={designarturnos} > Designar cursos </Button>
            <ModalInscribirauto/>
            <ModalDesInscribirauto/>
            <br/>  <br/>
            <Button variant='contained' onClick={cambiarVista} > Ocultar / Ver Resumen de inscriptos <RemoveRedEyeIcon /></Button>

            {vista ? <>
              <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#eeeeee',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  width: "90%",
                  '&:hover': { border: '1px solid #ccc' },
                  border: "1px solid black",
                  margin: '75px',
                  display: 'flex'

                }}
              >
         <p>* Incriptas: esten aceptadas o no.<br/>
                *Cursando: asignadas a un curso
         </p>
              </Paper>
              <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#eeeeee',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  width: "90%",
                  '&:hover': { border: '1px solid #ccc' },
                  border: "1px solid black",
                  margin: '75px',
                  display: 'flex'

                }}
              >

                <TableContainer >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Detalles prioridad 1</b></TableCell>
                        <TableCell><b>Inscriptas</b></TableCell>
                   
                        <TableCell><b>Cursando</b></TableCell>
                        <TableCell><b>cupo</b></TableCell>
                        <TableCell><b>Cantidad Prioridad 1</b></TableCell>
                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {priori1.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left">{row.nombre}</TableCell>
                          <TableCell align="center">{row.cantidad }</TableCell>
                           <TableCell align="center">{row.cursando }</TableCell>
                          <TableCell align="left">{row.cupo }</TableCell>
                          <StyledTableCell align="center">  
              <div   onClick={() =>  navigate('/administracion/detallecurso/'+row.id)} >
                Ver detalles </div  ></StyledTableCell>
                         
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#eeeeee',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  width: "90%",
                  '&:hover': { border: '1px solid #ccc' },
                  border: "1px solid black",
                  margin: '75px',
                  display: 'flex'

                }}
              >

                <TableContainer >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Detalles prioridad 2</b></TableCell>
                        <TableCell><b>Inscriptas</b></TableCell>
                   
                        <TableCell><b>Cursando</b></TableCell>
                        <TableCell><b>cupo</b></TableCell>
                        <TableCell><b>Cantidad Prioridad 2</b></TableCell>
                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {priori2.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="left">{row.nombre}</TableCell>
                          <TableCell align="center">{row.cantidad }</TableCell>
                           <TableCell align="center">{row.cursando }</TableCell>
                          <TableCell align="left">{row.cupo }</TableCell>
                          <StyledTableCell align="center">  
              <div   onClick={() =>  navigate('/administracion/detallecurso/'+row.id)} >
                Ver detalles </div  ></StyledTableCell>
                         
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <Paper
                sx={{
                  cursor: 'pointer',
                  background: '#eeeeee',
                  color: '#bdbdbd',
                  border: '1px dashed #ccc',
                  width: "90%",
                  '&:hover': { border: '1px solid #ccc' },
                  border: "1px solid black",
                  margin: '75px',
                  display: 'flex'

                }}
              >

               
               
              </Paper>
            
            </> : <>


              <>
                <br /><br /><br />


              </>


            </>}
          </div>
        )}





    </>


  )
}

export default Lotes;