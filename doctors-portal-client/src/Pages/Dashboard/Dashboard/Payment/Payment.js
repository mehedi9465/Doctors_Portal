import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51JvnbKAoJN9sjfwJelV5vnXS9cEyP0ig5vMid1wHVnYbCp6lBBJE5qS7d6o6EBd0pL7tLq1zZ7vbA9oFWf4bBd7b00f8yBz74u');

const Payment = () => {
    const [appointment, setAppointment] = useState({});
    const { appointmentId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/appointments/${appointmentId}`)
        .then(({ data }) => setAppointment(data))
    }, [appointmentId]);
    
    return (
        <div>
            <h2>Patient: {appointment?.patientName}</h2>
            <h2>Please pay for: {appointment?.serviceName}</h2>
            <h2>Cost: ${appointment?.price}</h2>

            {
                appointment?.price &&
                    <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        appointment={appointment}
                    />
                    </Elements>
            }

        </div>
    );
};

export default Payment;

/*

1. Install Stripe
2.set Publishable Key
3.Wrap with Elements
4.Checkout Form
5.
*/