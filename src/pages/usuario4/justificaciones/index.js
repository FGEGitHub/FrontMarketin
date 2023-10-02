
import MenuUsuario4 from '../../../components/usuario4/navbar'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Curso from '../../../components/usuario4/justificaciones/lista'
 
export default function Paginas() {

    const [logueado, setLogueado] = useState(false) 
    const navigate = useNavigate();
    useEffect(() => {
      
      const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        
      if (loggedUserJSON) {
        
        const user = JSON.parse(loggedUserJSON)
        if ( user.nivel != 4    ){
          window.localStorage.removeItem('loggedNoteAppUser')
     
    
        }else{
    
          setLogueado(true)
        }
      
        //servicioUsuario.setToken(user.token)  
       
        
      }else{
        navigate('/login')
       
      }
     
    }, []) 
    
    
    


    return (
 
<>
{ logueado ? <div> 
<MenuUsuario4/>
  
  <Curso/>



 </div>   :<div></div>  }


   </> );

}