import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isLoggedIn }) => {
    return isLoggedIn ? element : <Navigate to="/loginPage" />;
};

export default PrivateRoute;
