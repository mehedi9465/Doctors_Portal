import { Alert, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginIMG from '../../../images/login.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { registerUser, status, user, error } = useAuth();
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        console.log(loginData);
        setLoginData(newLoginData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(loginData?.password !== loginData.password2){
            alert('Password did not match');
            return;
        }
        registerUser(loginData?.name, loginData?.email.toLowerCase(), loginData?.password, navigate);
    }
    return (
        <Grid container spacing={2}>
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} item xs={12} md={6}>
                <Box sx={{width: '50%'}}>
                    <Typography variant='h5' sx={{mb: 4}}>Register</Typography>
                    {
                        !status &&
                        <form onSubmit={handleSubmit}>
                        <Box >
                            <TextField sx={{width: '100%', py: 1, mt: 5}} id="standard-basic" label="Name" variant="standard" type="text" name='name' onBlur={handleOnBlur}/>
                        </Box>
                        <Box >
                            <TextField sx={{width: '100%', mt: 2, py: 1}} id="standard-basic" label="Email" variant="standard" type="email" name='email' onBlur={handleOnBlur}/>
                        </Box>
                        <Box >
                            <TextField sx={{width: '100%', mt: 2, py: 1}} id="standard-basic" label="Password" variant="standard" type="password" name='password' onBlur={handleOnBlur}/>
                        </Box>
                        <Box >
                            <TextField sx={{width: '100%', my: 2, py: 1}} id="standard-basic" label="Re-type Password" variant="standard" type="password" name='password2' onBlur={handleOnBlur}/>
                        </Box>
                        <Box >
                            <Button variant='contained' type="submit" sx={{width: '100%', my: 5, py: 1.5}}>Register</Button>
                        </Box>
                        </form>
                    }

                    {
                        status &&
                        <CircularProgress />
                    }
                    <Typography variant='subtitle1'>Already have an <Link to='/login'>account</Link>?</Typography>
                    {
                        user?.email &&
                        <Alert sx={{mt: 5}} severity="success">This is a success alert — check it out!</Alert>
                    }

                    {
                        error &&
                        <Alert sx={{mt: 5}} severity="error">{error}</Alert>
                    }
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{background: `url(${loginIMG})`, backgroundRepeat: 'no-repeat', backgroundSize: '70%', backgroundPosition: 'bottom'}}>
                
            </Grid>
        </Grid>
    );
};

export default Register;