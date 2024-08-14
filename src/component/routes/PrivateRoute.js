import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import Authentication from '../../login/authentication/AuthenticationService';

export default function PrivateRoute() {
    if(Authentication.isUserLoggedIn()){
        return <Outlet/>;
    } else {
        return <Navigate replace to="/loginErr" />;
    }
}