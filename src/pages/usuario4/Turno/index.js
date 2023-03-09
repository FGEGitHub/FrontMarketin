
import MenuUsuario4 from '../../../components/usuario4/Menuizq4'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Clases from '../../../components/usuario4/Clasesdelcurso/todas'
import Ficha from '../../../components/usuario4/datosdelturno/fichaturno'
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
    <MenuUsuario4>
    <Ficha/>
  <Clases/>

 </MenuUsuario4> 

 </div>   :<div></div>  }


   </> );

}