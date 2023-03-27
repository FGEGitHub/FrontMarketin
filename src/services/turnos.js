import axios from "axios"


const baseUrl = 'http://esme.cuquicalvano.com:4000/turnos/'
//const  baseUrl ='http://localhost:4000/turnos/'



const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
/////loggedUserJSON Recupera lasesion el tokeny lo envia mediante la constante config. el back lo filtra 
 let config = ''
 if (loggedUserJSON) {
     const userContext = JSON.parse(loggedUserJSON)
  
 
      config = {
         headers:{

             Authorization:`Bearer ${userContext.token}`
         }
     }
 
     
 }else{
      config = {
         headers:{
             Authorization:`Bearer `
         }
     }
 }




 

  //////desde el id usaurio coordinador
  const lista = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'clasesdelturno/'+ usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }


  const nuevaclase= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'nuevaclase',datos,config)
     
     alert(data)  
 } 
 

 const modificarTurno= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'modificarturno',datos,config)
     
     alert(data)  
 } 


 const modificarclase= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'modificarclase',datos,config)
   
   alert(data)  
} 
export default {lista,nuevaclase,modificarTurno,modificarclase}