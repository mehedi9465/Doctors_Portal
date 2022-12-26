import { Button, Container, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {

    const [email, setEmail] = useState('');
    const { token } = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const user = { email };
        console.log(user);
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.matchedCount){
                swal({
                    title: "Done!",
                    icon: "success",
                    button: "ok",
                  });
            }
            else {
                swal({
                    title: "Email Not Found!",
                    icon: "error",
                    button: "ok",
                  });
            }
        })
    }

    return (
        <Container>
            <h1>Make Admin</h1>
            <form onSubmit={handleSubmit}>
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
                onBlur={handleOnBlur} 
                margin="normal"
                />
                </Box>
                <Box >
                    <Button variant='contained' type="submit" sx={{width: '20%', my: 5, py: 1.5}}>Submit</Button>
                </Box>
            </form>
        </Container>
    );
};

export default MakeAdmin;