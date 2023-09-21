import servicioCursos from '../../../services/Cursos'
import React, { useEffect, useState, Fragment } from "react";
import { Paper } from '@mui/material';
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import TomarAsis from './tomarasis';
import { useParams } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Alert, AlertTitle } from '@mui/material';
import { Box } from '@mui/material';
import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
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
    backgroundColor: "#35baf6",
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



/////////  



const TablaNotificaciones = (props) => {
  const [alumnos, setAlumnos] = useState([''])
  const [clase, setClase] = useState([''])
  const [usuario, setUsuario] = useState([''])
  const [estadisticas, setEstadisticas] = useState([''])
  const [vista, setVista] = useState(true)
  const [currentColor, setCurrentColor] = useState('blue');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [showAlert, setShowAlert] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();
  let params = useParams()
  let id = params.id
  useEffect(() => {
    traer()



  }, [])

  const checkede = async (ida) => {
    console.log(ida)

    await servicioCursos.presente({
      id_alumno: ida,
      id_clase: id
    })
    traer()
  };
  const checkedeno = async (ida) => {
    console.log(ida)

    await servicioCursos.ausente({
      id_alumno: ida,
      id_clase: id
    })
    traer()
  };



  const traer = async () => {
    try {



      setUsuario(usuario)
      const alumn = await servicioCursos.asistencia(id)
      console.log(alumn[1])
      setClase(alumn[0][0])
      setAlumnos(alumn[1])
      setEstadisticas(alumn[2])





    } catch (error) {

    }


  }

  const timer = setTimeout(() => {
    setShowAlert(false);
  }, 5000)


  const determinarausente = async (id_usuario) => {
    try {

      const alumn = await servicioCursos.ausente({ id, id_usuario })

    } catch (error) {

    }






  }
  function CutomButtonsRenderer(dataIndex, rowIndex, data, onClick) {
    return (
      <>
        <div >

          <TomarAsis
            id_alumno={alumnos[dataIndex]['id_alumno']}
            id_clase={alumnos[dataIndex]['id_clase']}
            traer={async () => {
              try {



                setUsuario(usuario)
                const alumn = await servicioCursos.asistencia(id)
                console.log(alumn[1][0])
                setClase(alumn[0][0])
                setAlumnos(alumn[1])
                setEstadisticas(alumn[2])

              } catch (error) {

              }






            }}

          />


        </div>
      </>
    );
  }


  // definimos las columnas
  const columns = [
    {
      name: "dni",
      label: "dni",

    },
    {
      name: "apellido",
      label: "apellido",

    },




    {
      name: "asistencia",
      label: "asistencia",

    },

    {
      name: "Tomar asistencia",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) =>
          CutomButtonsRenderer(
            dataIndex,
            rowIndex,
            // overbookingData,
            // handleEditOpen
          )
      }

    },


  ];

  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const CustomTable = ({ inscrip }) => {
    return (


      <Box sx={{ overflowX: 'auto' }}>
        {showAlert && (
          <Alert severity="info" onClose={() => setShowAlert(false)}>
            <AlertTitle>Encargadas!</AlertTitle>
            Las alumnas estan ordenadas por apellido
          </Alert>
        )}
        <ResponsiveTable aria-label="customized table">
          <TableBody>
            {alumnos.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left" data-label="Alumna">
                  {row.apellido}    {row.nombre}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" data-label="DNI">
                  {row.nuevo == "Si" ? <><p style={{ color: currentColor }}><b>Nuevo</b></p>   </> : <> </>}  {row.nuevo}  {row.dni}
                </StyledTableCell>
           

                <StyledTableCell align="left" data-label="Presente">

                  {row.asistencia === "No Tomada" ? <>Si<Checkbox onClick={() => checkede(row.id_alumno)} /> No<Checkbox onClick={() => checkedeno(row.id_alumno)} /></> : <>  {row.asistencia == "Presente" ? <> Si<Checkbox defaultChecked disabled /> No<Checkbox onClick={() => checkedeno(row.id_alumno)} /> </> : <> Si<Checkbox onClick={() => checkede(row.id_alumno)}  {...label} /> No<Checkbox defaultChecked onClick={() => checkedeno(row.id_alumno)} disabled /> </>} </>}
                </StyledTableCell>
                <StyledTableCell align="left" data-label="telefono">
                  {row.telefono}
                </StyledTableCell>
                {/*      <StyledTableCell align="left" data-label="telefono alternativo">
                      {row.telefono2}
                    </StyledTableCell> */}
                <StyledTableCell align="left" data-label="Primer clase">
                  {row.primera}
                </StyledTableCell>


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
        
      {alumnos[0] ? <>
        <h3>{alumnos[0]['nombreescuela']}</h3>
        <h4>Cantidad de mesas </h4>

      </> : <></>}
  
{isMatch ? (
  <div >
      {alumnos.length > 0 ? <>
        <CustomTable alumnos={alumnos} />  </> : <><br /> <h3>No hay asignados</h3></>}
        </div>):( 
        
        
        <div >

          Vista desde PC
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: "20%",maxWidth: "1000%"}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DNI</StyledTableCell>
            <StyledTableCell>NOMBRE</StyledTableCell>
            <StyledTableCell >PRESENTE</StyledTableCell>
            <StyledTableCell align="right">ACCIONES</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {alumnos.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.dni}
              </StyledTableCell>
          
              <StyledTableCell >{row.apellido} {row.nombre}</StyledTableCell>
              <StyledTableCell > {row.asistencia === "No Tomada" ? <>Si<Checkbox onClick={() => checkede(row.id_alumno)} /> No<Checkbox onClick={() => checkedeno(row.id_alumno)} /></> : <>  {row.asistencia == "Presente" ? <> Si<Checkbox defaultChecked disabled /> No<Checkbox onClick={() => checkedeno(row.id_alumno)} /> </> : <> Si<Checkbox onClick={() => checkede(row.id_alumno)}  {...label} /> No<Checkbox defaultChecked onClick={() => checkedeno(row.id_alumno)} disabled /> </>} </>}</StyledTableCell>
              <StyledTableCell align="center">  
             
                Ver mas </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

</div>)}






    </div>


  )
}
export default TablaNotificaciones