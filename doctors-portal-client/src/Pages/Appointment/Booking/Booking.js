import { Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import BookingModal from '../Booking Modal/BookingModal';

const Booking = ({ booking, date }) => {

    const [openBooking, setOpenBooking] = React.useState(false);
    const handleOpen = () => setOpenBooking(true);
    const handleClose = () => setOpenBooking(false);

    return (
            <>
                <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{m: 3, p: 4}}>
                    <Typography variant='h5' color='info.main'>{booking.name}</Typography>
                    <Typography variant='subtitle1' sx={{mt: 2,mb:1}}>{booking.time}</Typography>
                    <Typography variant='body2' color='secondary.main' sx={{mb: 2, mt:1}}>{booking.space} Spaces available</Typography>
                    <Typography variant='body2' color='secondary.main' sx={{mb: 2, mt:1}}>Cost: ${booking.price}</Typography>
                    <Button onClick={handleOpen} variant='contained' color='info' sx={{px: 3, py: 1}}>Book Appointment</Button>
                </Paper>
                </Grid>
                <BookingModal
                booking={booking}
                openBooking={openBooking}
                handleOpen={handleOpen}
                handleClose={handleClose}
                date={date}
                ></BookingModal>
            </>
    );
};

export default Booking;