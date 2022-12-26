import { PhotoCamera } from '@mui/icons-material';
import { Button, IconButton, Input, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

const AddDoctor = () => {

    const [doctorData, setDoctorData] = useState({});
    const [image, setImage] = useState('');

    const handleSubmit = e =>{
        e.preventDefault();
        if(!image){
            swal({
                title: "Please add a image!",
                icon: "warning",
                button: "ok",
              });
              return;
        }
        console.log(image);
        const formData = new FormData();
        formData.append('name', doctorData?.name);
        formData.append('email', doctorData?.email);
        formData.append('image', image);
        axios.post('http://localhost:5000/doctors', formData)
        .then(({ data }) => {
            if(data.insertedId){
                swal({
                    title: "Successfully Added!",
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
    }

    const handleOnchange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...doctorData };
        newInfo[field] = value;
        setDoctorData(newInfo);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    width: '80%',
                    maxWidth: '100%',
                    margin: 'auto'
                }}
                >
                <TextField fullWidth 
                required
                label="Name" 
                name="name"
                onChange={handleOnchange}
                margin="normal"
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
                required
                label="Email" 
                name="email"
                onChange={handleOnchange}
                margin="normal"
                />
            </Box>
            <Box
                sx={{
                    width: '80%',
                    maxWidth: '100%',
                    margin: ' 25px auto'
                }}
                >
                <Input accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])} />
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </Box>
            <Box>
                <Button type='submit' variant='outlined' color='info'>Add Doctor</Button>
            </Box>
            </form>
        </div>
    );
};

export default AddDoctor;