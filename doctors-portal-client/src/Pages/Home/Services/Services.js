import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Service from '../Service/Service';
import flouride from '../../../images/fluoride.png'
import cavity from '../../../images/cavity.png'
import whitening from '../../../images/whitening.png'

const Services = () => {

    const services = [
        {
            "name": "Flouride Treatment",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nemo veritatis",
            "img": flouride
        },

        {
            "name": "Cavity Treatment",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nemo veritatis",
            "img": cavity
        },

        {
            "name": "Whitening Treatment",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nemo veritatis",
            "img": whitening
        }
    ]

    return (
        <div>
            <Typography variant="h6" component="div" sx={{margin: "20px 0px", fontWeight: 'bold'}} color="info.main">
                OUR SERVICES
            </Typography>
            <Typography variant="h3" component="div" sx={{margin: '25px 0px 100px 0px', fontWeight: 'bold'}}>
                Services We Provide
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
            <Container>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    services.map(service => <Service key={service.name} service={service}></Service>)
                }
            </Grid>
            </Container>
            </Box>
        </div>
    );
};

export default Services;