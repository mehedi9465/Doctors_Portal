import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Appointments = ({ date }) => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const FormateDate = date.toDateString();
    console.log(FormateDate);

    useEffect(() => {
        axios.get(`http://localhost:5000/appointments?email=${user.email}&date=${FormateDate}`)
        .then(({ data }) => {
            console.log(data);
            setAppointments(data);
        })
    }, [FormateDate, user.email])

    return (
        <div>
            <h1>Appointments: {appointments.length}</h1>
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Service</TableCell>
                    <TableCell align="center">Schedule</TableCell>
                    <TableCell align="center">Payment</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {appointments.map((appointment) => (
                    <TableRow
                    key={appointment?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center" component="th" scope="row">
                        {appointment.patientName}
                    </TableCell>
                    <TableCell align="center">{appointment.serviceName}</TableCell>
                    <TableCell align="center">{appointment.time}</TableCell>
                    <TableCell align="center">{appointment?.payment ? 'paid' : <Link to={`/dashboard/payment/${appointment?._id}`}> <Button variant='contained'>Pay</Button> </Link>}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
};

export default Appointments;