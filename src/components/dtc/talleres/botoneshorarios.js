import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";

const MobileNavigation = () => {
  const navigate = useNavigate();
  
  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
  let botones = [];

  if (loggedUserJSON) {
    const usuario = JSON.parse(loggedUserJSON);
    if ([240, 265, 266, 306, 308].includes(usuario.id)) {
      botones = ["14:00", "15:00", "16:00"];
    } else if (usuario.id === 304) {
      botones = ["14:30", "15:30", "16:30"];
    }
  }

  const formatHorario = (horario) => horario.replace(":", "");

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" gap={2} p={2} bgcolor="grey.100">
      {botones.map((horario, index) => (
        <Button
          key={index}
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={() => navigate(`/dtc/tallerasistencia/${formatHorario(horario)}`)}
        >
          Horario de {horario} hs
        </Button>
      ))}
    </Box>
  );
};

export default MobileNavigation;
