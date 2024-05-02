import * as React from 'react';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import servicioDtc from '../../../services/dtc'
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles'
import MobileScreenShareTwoToneIcon from '@mui/icons-material/MobileScreenShareTwoTone';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box } from '@mui/material';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '@mui/material/Alert';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
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
    backgroundColor: "#1de9b6",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    
  },
}));

const ResponsiveTable = styled(Table)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTableCell-root': {
    whiteSpace: 'nowrap',
    padding: '8px 16px',
    textAlign: 'left',
  },
  '& .MuiTableBody-root .MuiTableCell-root': {
    borderBottom: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTableCell-root': {
      display: 'block',
      position: 'relative',
      paddingLeft: '40%',
      '&::before': {
        content: 'attr(data-label)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '40%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
      },
    },
    '& .MuiTableHead-root': {
      display: 'none',
    },
  },
}));



export default function Ingresos(props) {

  const navigate = useNavigate();

  const [inscrip, setInscrip] = useState([]);
  const[usu, setUsu] = useState();
  const [vista, setVista] = useState(true);
  const [cantidad, setCantidad] = useState([]);
  const [supl, setPubl] = useState([]);
  const [nuevos, setNuevos] = useState([]);
  const [currentColor, setCurrentColor] = useState('blue');
  const [currentDate, setCurrentDate] = useState('');
  const [datos, setDatos] = useState();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    traer()
    const colors = ['blue', 'green', 'red'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % colors.length;
      setCurrentColor(colors[currentIndex]);
    }, 1000); // Cambia de color cada 2 segundos

    return () => clearInterval(interval)
  }, [])
  const traer = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
   
        const user = JSON.parse(loggedUserJSON)
       
      
      const today = new Date();
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  
      props.fecha == undefined ? setCurrentDate(formattedDate):setCurrentDate(props.fecha)
      
      const  historial = await servicioDtc.traerpresentes(props.fecha == undefined ? {fecha:formattedDate,id:props.idt == undefined ? user.id:props.idt}:{fecha:props.fecha,id:props.idt == undefined ? user.id:props.idt})
     console.log(historial)
      setInscrip(historial[0])
    
    }
    
   

    // 

  };
  const checkede = async (id) => {
    console.log(id)
     const rta= await servicioDtc.restar1(id)
     console.log(rta)
    traer()
  };
  const checkedemas= async (id) => {
    console.log(id)
    const rta=  await servicioDtc.sumar1(id)
    console.log(rta)
    traer()
  };
  const revisto = async (id) => {
    console.log(id)
    const rta=  await servicioDtc.revisto(usu.id)
     alert(rta)
    traer()
 
  };
 

  function CutomButtonsRenderercapa (dataIndex, rowIndex, data, onClick) {
    return (
      <>
   {inscrip[dataIndex].capacitado === 'No' ? <><p style={{ color: 'warning' }} >No Capacitado</p></>:<><p style={{ color: 'green' }} >Capacitado<SchoolTwoToneIcon/></p></>}

      </>

    );
  }
  function CutomButtonsRenderercapa (dataIndex, rowIndex, data, onClick) {
    return (
      <>
   {inscrip[dataIndex].capacitado === 'Si'  ? <><p style={{ color: 'green' }} >Capacitado<SchoolTwoToneIcon/></p> </>:<><p style={{ color: 'warning' }} >No Capacitado</p></>}

      </>

    );
  }
  
  
  function CutomButtonsRenderer2(dataIndex, rowIndex, data, onClick) {
    return (
      <>

        <Button onClick={() => navigate('/fiscalizacion/usuarioescuela/persona/' + inscrip[dataIndex].idpersona)} >Ver persona</Button>

      </>

    );
  }

  const cambiarvista = () => {
    setVista(!vista);
  };


  function CutomButtonsRenderer2contactado(dataIndex, rowIndex, data, onClick) {
    return (
      <>

{inscrip[dataIndex].checkk == null  || inscrip[dataIndex].checkk == 'No'? <>  No contactado <Checkbox   onClick={() => checkede(inscrip[dataIndex].id)}  {...label} /> </>:<> Ya contactado <Checkbox onClick={() => checkede(inscrip[dataIndex].id)}  {...label}  /></>}

      </>

    );
  }

  const columns = [
    {
      name: "numero",
      label: "numero mesa",

    },
    {
      name: "dni",
      label: "dni",
    },
    {
      name: "apellido",
      label: "apellido",

    },

    {
      name: "nombre",
      label: "nombre",
    },


    {
      name: "nombreescuela",
      label: "escuela",

    },
 

    {
      name: "telefono",
      label: "telefono",

    },

    {
      name: "VER PERSONA",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRenderer2(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },
        {
      name: "Capacitado",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRenderercapa(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },
    
  /*   {
      name: "Contactado",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
        CutomButtonsRenderer2contactado(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },
    {
      name: "Acciones/llamado",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRenderer(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    }, */

  ];


  const CustomTable = ({ inscrip }) => {
    return (
      <Box sx={{ overflowX: 'auto' }}>
        <ResponsiveTable aria-label="customized table">
          <TableBody>
            {inscrip.map((row) => (
              <StyledTableRow key={row.name}>
               
                <StyledTableCell align="left" data-label="Apellido">
                  {row.apellido}
                </StyledTableCell>
                <StyledTableCell align="left" data-label="Nombre">
                  {row.nombre}
                </StyledTableCell>
                <StyledTableCell align="left" data-label="Presente">

                  Restar<RemoveCircleRoundedIcon onClick={() => checkede(row.id)}  {...label}  /> ({row.racion}) Añadir<AddCircleRoundedIcon   onClick={() => checkedemas(row.id)}  {...label} />
                 
                </StyledTableCell>
                <StyledTableCell align="left" data-label="telefono">
                  {row.kid}
                </StyledTableCell>
           {/*      <StyledTableCell align="left" data-label="telefono alternativo">
                  {row.telefono2}
                </StyledTableCell> */}
             
              
             
                {/* <StyledTableCell align="left" data-label="Contactado">
                {row.dato1 == null  || row.dato1 == 'No'? <>  Ausente/Sin determinar <Checkbox   onClick={() => checkede(row.id)}  {...label} /> </>:<> Presente <Checkbox onClick={() => checkede(row.id)}  {...label} defaultChecked /></>}
            
               

                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </ResponsiveTable>
      </Box>
    );
  };

  return (
    <div>
      {nuevos>0 ? <>    <Alert variant="filled" severity="success">
      
       

<Button  onClick={revisto}  variant='contained'>Ya revisè</Button>
      </Alert></>:<></>}
   
      {inscrip[0] ? <>
        
      </> : <></>}


      {vista ? <>
        {inscrip.length > 0 ? <>
          <CustomTable inscrip={inscrip} />  </> : <><br /> <h3>No hay asignados</h3></>}
      </> : <>

        <Paper
          sx={{
            cursor: 'pointer',
            background: '#eeeeee',
            color: '#eeeeee',
            border: '1px dashed #ccc',
            '&:hover': { border: '1px solid #ccc' },
          }}
        >


          <MUIDataTable

            title={"Lista de Incripciones"}
            data={inscrip}
            columns={columns}
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              }
            ]}



          />



        </Paper>
      </>}

    </div>
  );
}