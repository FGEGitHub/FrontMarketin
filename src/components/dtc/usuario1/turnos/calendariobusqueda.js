import React, { useEffect, useState } from "react";
import servicioDtc from '../../../../services/dtc';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Alert } from '@mui/material';
//import './CustomCalendar.css'; // Archivo CSS para personalizar el calendario

const TablaNotificaciones = (props) => {
    const [chicos, setChicos] = useState([]);
    const [datos, setDatos] = useState();
    const [fechas1, setFechas1] = useState([]);
    const [fechas2, setFechas2] = useState([]);
    
    useEffect(() => {
        traer();
    }, []);

    const traer = async () => {
        try {
            const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
            if (loggedUserJSON) {
                const usuario = JSON.parse(loggedUserJSON);
                const novedades_aux = await servicioDtc.traercitas(usuario.id);
                setChicos(novedades_aux[0]);
                setDatos(novedades_aux[1]);

                const fechas1 = novedades_aux[0].map(item => new Date(item.fecha + 'T00:00:00Z'));
                const fechas2 = novedades_aux[1].map(item => new Date(item.fecha + 'T00:00:00Z'));
                setFechas1(fechas1);
                setFechas2(fechas2);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const onDateClick = (date) => {
        const formattedDate = date.toISOString().split("T")[0]; // Convertir la fecha a formato YYYY-MM-DD
        props.traer(formattedDate); // Enviar la fecha seleccionada a la función heredada por props
    };

    const isSameDay = (date1, date2) => {
        return date1.getUTCDate() === date2.getUTCDate() &&
               date1.getUTCMonth() === date2.getUTCMonth() &&
               date1.getUTCFullYear() === date2.getUTCFullYear();
    };

    return (
        <div>
          

            <h2>Lista de chicos</h2>
            {chicos ? (
                <div>
                    <Calendar
                    tileContent={({ date, view }) => {
                        if (view === 'month') {
                            // Buscar todos los eventos para la fecha actual
                            const eventos = chicos.filter(chico => isSameDay(new Date(chico.fecha + 'T00:00:00Z'), date));
                            
                            // Si hay eventos, renderizar el detalle de cada uno
                            return eventos.length > 0 ? (
                                <ul className="event-detail-list">
                                    {eventos.map((evento, index) => (
                                        <li key={index} className="event-detail-item">
                                            {evento.detalle}
                                        </li>
                                    ))}
                                </ul>
                            ) : null;
                        }
                        return null;
                    }}
                        onClickDay={onDateClick}
                        tileClassName={({ date, view }) => {
                            if (view === 'month') {
                                if (fechas2.some(f2 => isSameDay(f2, date))) {
                                    return 'react-calendar__tile--fechas2';
                                }
                                if (fechas1.some(f1 => isSameDay(f1, date))) {
                                    return 'react-calendar__tile--fechas1';
                                }
                            }
                            return null;
                        }}
                        className="custom-calendar"
                    />
                </div>
            ) : (
                <h2>El curso aún no tiene chicos</h2>
            )}
        </div>
    );
};

export default TablaNotificaciones;
