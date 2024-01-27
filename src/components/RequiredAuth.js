import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import utils from '../utils';
import NotFound from './NotFound';
import Unauthorized from './Unauthorized';

function RequiredAuth({ children }) {
    const loggedIn = useSelector(state => state.loggedIn);
    const isAdmin = useSelector(state => state.isAdmin)
    const dispatch = useDispatch();
    const location = useLocation()
    const shouldLogin = utils.shouldReLogin();
    // if (!loggedIn || shouldLogin) {
    //     console.log('Redirecting to login...');
    //     dispatch({ type: 'RE-LOGIN' });

    //     // Use Navigate component for redirection
    //     return <Navigate to="/login" replace />;
    // }
    const isCustomerRoute = location.pathname.startsWith('/customer/');
    const isProductRoute = location.pathname.startsWith('/product/');
    console.log(isCustomerRoute);
    if ((location.pathname === '/customers' ||'/purchases' ||isProductRoute || isCustomerRoute ) && !isAdmin) {

        return <Unauthorized />

    }

    return children;
}

export default RequiredAuth;
