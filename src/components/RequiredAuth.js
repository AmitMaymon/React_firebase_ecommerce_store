import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useLocation } from 'react-router-dom';
import utils from '../utils';
import Unauthorized from './Unauthorized';

function RequiredAuth({ children }) {
    const isAdmin = useSelector(state => state.isAdmin)
    const location = useLocation()

    
    const isCustomerRoute = location.pathname.startsWith('/customer/');
    const isProductRoute = location.pathname.startsWith('/product/');
    console.log(isCustomerRoute);
    if ((location.pathname === '/customers' ||'/purchases' ||isProductRoute || isCustomerRoute ) && !isAdmin) {

        return <Unauthorized />

    }

    return children;
}

export default RequiredAuth;
