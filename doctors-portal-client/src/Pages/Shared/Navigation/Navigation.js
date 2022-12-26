import { AppBar, Button, IconButton, Toolbar, Typography, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


const Navigation = () => {
    const { user, logOut } = useAuth();
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Doctors Portal
                </Typography>
                <Link to='/appointment'>
                    <Button color="inherit">Appointment</Button>
                </Link>
                {
                    !user?.email && 
                    <Link to='/login'>
                    <Button color="inherit">Login</Button>
                    </Link> 
                }

                {
                    !user?.email &&
                    <Link to='/register'>
                    <Button color="inherit">Register</Button>
                    </Link>
                }

                {
                    user.email &&
                    <NavLink to='/dashboard'><Button color="inherit">DashBoard</Button></NavLink>
                }

                {
                    user.email &&
                    <Button onClick={logOut} color="inherit">logOut</Button>
                }
                
                <Typography varian='subtitle2'>{user?.email}</Typography>
                

                </Toolbar>
            </AppBar>
            </Box>
        </>
    );
};

export default Navigation;