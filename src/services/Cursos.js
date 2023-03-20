import axios from "axios"


const baseUrl = 'http://esme.cuquicalvano.com:4000/cursos/'
//const  baseUrl ='http://localhost:4000/cursos/'



const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
/////loggedUserJSON Recupera lasesion el tokeny lo envia mediante la constante config. el back lo filtra 
 let config = ''

 if (loggedUserJSON) {

  try {
      const userContext = JSON.parse(loggedUserJSON)
      config = {
         headers:{
             Authorization:`Bearer ${userContext.token}`
         }
     }
  } catch (error) {
        window.localStorage.removeItem('loggedNoteAppUser')
   
  }
 

  
}else{
   config = {
      headers:{
          Authorization:`Bearer `
      }
  }
}





/////////////ver ruta al back
 const datosusuario = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosusuario/'+ usuario, config)
return data
       
  }

  
  const detalledelcurso = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'detalledelcurso/'+ usuario, config)
return data
       
  }
const lista = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'lista/', config)
return data
       
  }
  const listaniv1 = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listaniv1/'+usuario, config)
return data
       
  }
  const verclases = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'verclases/'+usuario, config)
return data
       
  }
  const datosdelturno = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'datosdelturno/'+usuario, config)
return data
       
  }
  

  const asistencia = async (usuario) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'asistencia/'+usuario, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }
return data
       
  }

  const listadeturnos = async (id) => {
  
    // const data = await axios.post('http://localhost:4000/signupp', datos)
      const {data} = await axios.get(baseUrl+'listadeturnos/'+id, config)
      if(data=== 'error login'){
       
        window.localStorage.removeItem('loggedNoteAppUser')
        window.location.reload();
      }

return data
      

  }
  

  const traerlosturnos= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'traerlosturnos',datos,config)
      console.log(data)
     if(data=== 'error login'){
       
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    } 
   
    return data
 } 


/////nivel1
  const inscribir= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'inscribir',config,datos)
     
     if(data=== 'error login'){
       
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    } 
 } 

 ///// crear curso conectar
  const crear= async  (datos) => {
    console.log(datos)
     const {data } = await axios.post(baseUrl+'crear',config,datos)
     if(data=== 'error login'){
       
      window.localStorage.removeItem('loggedNoteAppUser')
      window.location.reload();
    }  
 }  
 
 const nuevoturno= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'nuevoturno',config,datos)
   if(data=== 'error login'){
       
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  } 
} 
 const nuevaclase= async  (datos) => {
  console.log(datos)
   const {data } = await axios.post(baseUrl+'nuevaclase',config,datos)
   if(data=== 'error login'){
       
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  } 
} 


const presente= async  (datos) => {
 
   const {data } = await axios.post(baseUrl+'presente',config,datos)
   if(data=== 'error login'){
       
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }

} 
const modificarcurso= async  (datos) => {
 
  const {data } = await axios.post(baseUrl+'modificarcurso',config,datos)
  if(data=== 'error login'){
       
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }  
} 

const borrarturno= async  (datos) => {
  console.log(datos)
   const {data } = await axios.get(baseUrl+'borrarturno/'+datos,config,datos)
   if(data=== 'error login'){
       
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
   alert(data)  
} 
//


const listadetodoslosturnos= async  (datos) => {
  console.log(config)
   const {data } = await axios.get(baseUrl+'listadetodoslosturnos/',config,datos)
   if(data=== 'error login'){
       
    window.localStorage.removeItem('loggedNoteAppUser')
    window.location.reload();
  }
   return data
} 

export default {borrarturno,listadetodoslosturnos,datosdelturno,traerlosturnos,nuevoturno,modificarcurso,presente,asistencia,listadeturnos,datosusuario,verclases,inscribir,listaniv1,lista,crear,nuevaclase,detalledelcurso}
