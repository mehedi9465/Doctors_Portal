import React from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Booking from '../Booking/Booking';

const AvailableAppointment = ({ date, setDate }) => {

    const bookings=[
        {
            id: 1,
            name: 'Teeth Orthodonics',
            time: '8.30 AM - 9.00 AM',
            price: 20,
            space: 10
        },
        {
            id: 2,
            name: 'Cosmetic Dentistry',
            time: '9.00 AM - 10.00 AM',
            price: 15,
            space: 8
        },
        {
            id: 3,
            name: 'Teeth Cleaning',
            time: '10.00 AM - 11.00 AM',
            price: 13,
            space: 10
        },
        {
            id: 4,
            name: 'Cavity Protection',
            time: '11.00 AM - 12.00 PM',
            price: 18,
            space: 5
        },
        {
            id: 5,
            name: 'Pediatric Dental',
            time: '6.00 PM - 7.00 PM',
            price: 22,
            space: 10
        },
        {
            id: 6,
            name: 'Oral Surgery',
            time: '7.00 PM - 8.00 PM',
            price: 15,
            space: 10
        },
    ]
     
    return (
        <Container sx={{my: 5}}>
            <h1>Available Appointment on {date.toDateString()}</h1>
            <Grid container spacing={{xs: 2}} columns={{xs: 4, sm: 12, md: 12}} sx={{textAlign: 'center', py: 4}}>
                {
                    bookings.map(booking => <Booking 
                    key={booking.id} 
                    booking={booking}
                    date={date}
                    ></Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointment;