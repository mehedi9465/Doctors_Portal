import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import doctor from '../../../images/doctor.png';
import bg from '../../../images/appointment-bg.png';

const AppointmentBanner = () => {
    
    const appointmentbg = {
        background : `url(${bg})`,
        marginTop: '200px',
        backgroundColor: 'rgba(45, 58, 74, 0.8)',
        backgroundBlendMode: 'darken, luminosity',
        margin: '150px 0px'
    }
    
    return (
            <Box style={appointmentbg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <img src={doctor} style={{width: '400px', height: '530px', marginTop: '-150px'}} alt=''/>
            </Grid>

            <Grid sx={{display: 'flex',  justifyContent: 'flex-start'}} item xs={12} md={6}>
                <Box sx={{textAlign: 'left'}}>
                <Typography variant='h6' color='info.main' sx={{marginTop: '40px'}}>
                    APPOINTMENT
                </Typography>
                <Typography variant='h3' style={{color: 'white'}} sx={{marginTop: '30px'}}>
                    Make an appointment today
                </Typography>
                <Typography variant='h6' style={{color: 'wheat'}} sx={{marginTop: '25px', fontSize: '18px', width: '80%'}}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aut libero atque numquam adipisicing elit. Blanditiis aut libe.
                </Typography>
                <br />
                <Button variant='contained'  sx={{margin: '40px 0px 50px 0px'}}>Learn More</Button>
                </Box>
            </Grid>
            </Grid>
            </Box>
    );
};

export default AppointmentBanner;