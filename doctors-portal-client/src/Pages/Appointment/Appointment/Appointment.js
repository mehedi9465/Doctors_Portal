import React, { useState } from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import AppointmentHeader from '../Appointment Header/AppointmentHeader';
import AvailableAppointment from '../Available Appointment/AvailableAppointment';

const Appointment = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <Navigation></Navigation>
            <AppointmentHeader date={date} setDate={setDate}></AppointmentHeader>
            <AvailableAppointment date={date} setDate={setDate}></AvailableAppointment>
        </div>
    );
};

export default Appointment; 