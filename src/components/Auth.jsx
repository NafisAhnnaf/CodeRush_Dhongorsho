import React from 'react'
import {Navigate, Outlet} from 'react-router-dom';
const Auth = () => {

    const id = localStorage.getItem('userID');
  return id ? <Outlet/> :<Navigate to={'/login'}/>
};

export default Auth