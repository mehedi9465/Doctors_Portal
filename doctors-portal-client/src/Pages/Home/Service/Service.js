import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const Service = ({ service }) => {
    return (
            <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ minWidth: 275, border: 0, boxShadow: 0 }}>
            <CardMedia 
                component="img"
                style={{width: 'auto', height: '80px', margin: '0px auto'}}
                image={service?.img}
            />
            <CardContent>
                <Typography variant="h6" component="div" sx={{margin: '25px 0px'}}>
                {service?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{fontSize: '20px'}}>
                {service?.description}
                </Typography>
            </CardContent>
            </Card>
            </Grid>
    );
};

export default Service;