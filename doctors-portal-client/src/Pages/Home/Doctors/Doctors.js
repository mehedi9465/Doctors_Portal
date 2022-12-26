import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/doctors')
        .then(({ data }) => setDoctors(data))
    }, [])
    return (
        <div>
            <h1>Doctors found: {doctors.length}</h1>
            <Grid container spacing={{ xs: 2, md: 3 }}>
            {doctors.map(doctor => (
                <Grid item xs={12} sm={6} md={4} key={doctor?.email}>
                    <img src={`data:image/png;base64,${doctor?.imageBuffer}`} width='300' height='300'/>
                    <Typography variant='subtitle1'>
                        {doctor?.name}
                    </Typography>
                </Grid>
            ))}
            </Grid>
        </div>
    );
};

export default Doctors;