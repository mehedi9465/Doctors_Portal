import React from 'react';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Box } from '@mui/system';
import { Button, Container, Grid, Typography } from '@mui/material';

const Banner = () => {

    const bannerBG = {
        background: `url(${bg})`,
    }

    return (
        <Box sx={{ flexGrow: 1, padding: '100px 0px'}} style={bannerBG}>
        <Container>
        <Grid container spacing={2} columns={{md: 12}}>
            <Grid item xs={12} md={4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'start'}}>
                <Box sx={{textAlign: 'left'}}>
                <Typography variant='h3' sx={{fontWeight: 'bold'}}>
                    Your New Smile <br />
                    Starts Here
                </Typography>
                <Typography variant='subtitle1' sx={{color: 'gray', margin: '25px 0px'}}>
                    Your Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum odit, itaque nesciunt, deserunt sunt ad dolores, culpa quae minus eos corrupti commodi est ducimus natus! Maxime doloremque tenetur odio esse?
                </Typography>
                <br />
                <Button variant='contained'>Get Appointment</Button>
                </Box>
            </Grid>

            <Grid item xs={12} md={8} sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                <img src={chair} alt='' width='600'/>
            </Grid>
        </Grid>
        </Container>
        </Box>
    );
};

export default Banner;