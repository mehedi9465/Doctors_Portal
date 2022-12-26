import { CircularProgress } from '@mui/material';
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    let { user, status } = useAuth();
    const location = useLocation();

    if(status){
        return <CircularProgress />
    }

    else{
      if (!user.email) {
        return <Navigate to="/login" state={{ from: location }} />;
      }
    
      return children;
    }

};

export default PrivateRoute;