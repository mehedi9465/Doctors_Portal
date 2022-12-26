import { Grid } from '@mui/material';
import React from 'react';
import Calender from '../../Shared/Calendar/Calender';
import Appointments from '../Appointments/Appointments';

const DashboardHome = () => {
    const [date, setDate] = React.useState(new Date());
    console.log('Hello');
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={4}>
                <Calender date={date} setDate={setDate}></Calender>
            </Grid>

            <Grid item xs={12} sm={7} md={8}>
                <Appointments date={date}></Appointments>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;