

import Navbar from '../../../../components/Navbar'
import { useNavigate, useParams } from "react-router-dom";
import Steper from '../../../../components/fiscalizacion/admin/mesas/tabla'
import React, { useEffect, useState } from "react";
import {
    Button,
 
  } from "@mui/material";

export default function Paginas() {
    const navigate = useNavigate();


    const volver = (e) => {
        navigate('/fiscalizacion/administracion/menu')
        
        
            }

    return (
        <>
        <Navbar/>
        <br/>     <br/>   <br/>     <br/>  
        <Button onClick={volver}>Volver</Button><br/>     <br/>     
        <Steper/>
        </>
   
    );

}