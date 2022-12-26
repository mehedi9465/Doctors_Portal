import { Alert, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginIMG from '../../../images/login.png';

const Login = () => {
    const { user, error, status, loginUser, googleSignIn } = useAuth();
    const [loginData, setLoginData] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        loginUser(loginData?.email, loginData?.password, location, navigate);
    }

    const handleGoogleSignIn = () => {
        console.log(location, navigate);
        googleSignIn(location, navigate)
    }

    return (
        <Grid container spacing={2}>
            <Grid sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} item xs={12} md={6}>
                <Box sx={{width: '50%'}}>
                    <Typography variant='h5' sx={{mb: 4}}>Login</Typography>
                    {
                        status ?
                        <CircularProgress />
                        :
                        <Box>
                        <form onSubmit={handleSubmit}>
                        <Box >
                            <TextField sx={{width: '100%', py: 1, mt: 5}} id="standard-basic" label="User Name" variant="standard" type="email" name='email' onChange={handleOnChange}/>
                        </Box>
                        <Box >
                            <TextField sx={{width: '100%', my: 2, py: 1}} id="standard-basic" label="Password" variant="standard" type="password" name='password' onChange={handleOnChange}/>
                        </Box>
                        <Box >
                            <Button variant='contained' type="submit" sx={{width: '100%', my: 5, py: 1.5}}>Sign In</Button>
                        </Box>
                        
                        </form>
                        <Box >
                            <Button onClick={handleGoogleSignIn} variant='contained' type="submit" sx={{width: '100%', py: 1.5, mb: 5}}>Google</Button>
                        </Box>
                        </Box>
                    }
                        <Typography variant='subtitle1'>Don't have any <Link to='/Register'>account</Link>?</Typography>
                    {
                        user?.email &&
                        <Alert sx={{mt: 5}} severity="success">Successfully Logged in!</Alert>
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

export default Login;