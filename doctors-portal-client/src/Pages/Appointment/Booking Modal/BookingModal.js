import { Backdrop, Button, Fade, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { React, useState } from 'react';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';

const BookingModal = ({ openBooking, handleOpen, handleClose, booking, date }) => {

  const { name, time, price } = booking;
  const { user } = useAuth();

  const initialInfo = { patientName: user.displayName, phone: '', email: user.email };
  const [bookingInfo, setBookingInfo] = useState(initialInfo);

    const handleOnBlur = e => {
      const field = e.target.name;
      const value = e.target.value;
      const newInfo = {...bookingInfo};
      newInfo[field] = value;
      setBookingInfo(newInfo);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'white',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
      };

      const handleOnSubmit = e => {
          e.preventDefault();
          const appointment = {
            ...bookingInfo,
            time,
            price,
            serviceName: name,
            date: date.toDateString()
          }
          axios.post('http://localhost:5000/appointments', appointment)
          .then(({ data }) => {
            if(data.insertedId){
              swal({
                title: "Appointment Booked!",
                icon: "success",
                button: "ok",
              });
            }
            else{
              swal({
                title: "Something Went Wrong!",
                icon: "error",
                button: "ok",
              });
            }
          })
          console.log(appointment);
          handleClose();
      }
      

    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openBooking}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
      >
        <Fade in={openBooking}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2" sx={{textAlign: 'center', mb: 4}} color='info.main'>
              {booking.name}
            </Typography>
            
            <form onSubmit={handleOnSubmit}>

                <Box
                sx={{
                    width: '80%',
                    maxWidth: '100%',
                    margin: 'auto'
                }}
                >
                <TextField fullWidth 
                label="Time" 
                id="fullWidth margin-normal" 
                margin="normal"
                defaultValue={booking.time} 
                disabled 
                />
                </Box>

                <Box
                sx={{
                    width: '80%',
                    maxWidth: '100%',
                    margin: 'auto'
                }}
                >
                <TextField fullWidth 
                label="Your Name" 
                id="fullWidth margin-normal" 
                margin="normal"
                defaultValue={user?.displayName}
                name="patientName"
                onBlur={handleOnBlur} />
                </Box>

                <Box
                sx={{
                    width: '80%',
                    maxWidth: '100%',
                    margin: 'auto'
                }}
                >
                <TextField fullWidth 
                label="Phone Number" 
                id="fullWidth margin-normal" 
                margin="normal"
                name="phone"
                onBlur={handleOnBlur}
                />
                </Box>

                <Box
                sx={{
                    width: '80%',
                    maxWidth: '100%',
                    margin: 'auto'
                }}
                >
                <TextField fullWidth 
                label="Email"
                type="email" 
                id="fullWidth margin-normal" 
                margin="normal"
                defaultValue={user?.email}
                name="patientEmail"
                onBlur={handleOnBlur} />
                </Box>

                <Box
                sx={{
                    width: '80%',
                    maxWidth: '100%',
                    margin: 'auto'
                }}
                >
                <TextField fullWidth 
                defaultValue={date.toDateString()}
                disabled
                type="text" 
                id="fullWidth margin-normal" 
                margin="normal" />
                </Box>

                <Box sx={{
                    width: '80%',
                    maxWidth: '100%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'end'
                }}>
                    <Button type='submit' sx={{width: '20%', mt: 3, py: 1}} variant='contained'>Send</Button>
                </Box>

            </form>
          </Box>
        </Fade>
      </Modal>
    );
};

export default BookingModal;