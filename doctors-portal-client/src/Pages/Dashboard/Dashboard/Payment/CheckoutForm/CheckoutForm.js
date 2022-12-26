import React, { useEffect, useState } from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import axios from 'axios';
import useAuth from '../../../../../hooks/useAuth';
import { CircularProgress } from '@mui/material';

const CheckOutForm = ({ appointment }) => {
    const { price } = appointment;
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();

    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        axios.post('http://localhost:5000/create-payment-intent', price)
        .then(({ data }) => setClientSecret(data))
    }, [price])

    const handleSubmit = async (e) => {
        if(!stripe || !elements){
            return;
        }
        e.preventDefault();

        const card = elements.getElement(CardElement);

        if(card === null){
            return;
        }

        setProcessing(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error){
            setError(error.message)
        }
        else{
            setError('')
            console.log(paymentMethod);
        }

        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            '{PAYMENT_INTENT_CLIENT_SECRET}',
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: appointment?.patientName,
                  email: user?.email
                },
              },
            },
          );

          if(intentError){
              setError(intentError.message)
          }
          else{
              setError('');
              console.log(paymentIntent);
              setProcessing(false);
              const payment = {
                  amount: paymentIntent?.amount,
                  created: paymentIntent.created,
                  last4: paymentIntent?.card?.last4,
                  transaction: paymentIntent?.client_secret.slice('_secret')[0],
              }
              axios.put(`http://localhost:5000/appointments/${appointment?._id}`, payment)
              .then(({ data }) => {

              })
          }
          
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
            {
                processing ? <CircularProgress></CircularProgress>
                :
                <button type="submit" disabled={!stripe}>
                    Pay ${price}
                </button>
            }
            </form>
            {
                error && <p style={{color: 'red'}}>{error}</p>
            }
        </div>
    );
};

export default CheckOutForm;