import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';




function Navigation(props) {
    const addedToCart = useSelector(state => state.addedToCart)
    const cart = useSelector(state => state.cart)
    const isAdmin = useSelector(state => state.isAdmin)
    const loggedIn = useSelector(state => state.loggedIn)
    const dispatch = useDispatch(


    )
    const handleLogout = () => {
        dispatch({type:'RE-LOGIN'})
        localStorage.removeItem('uId')
        localStorage.removeItem('loggedTime')
        localStorage.removeItem('a')
    }


    return (
        <div className='nav-bar'>
            <Link to={'/'} id='nav-item'>Menu</Link>
            <Link to={'/products'} id='nav-item' >Products</Link>
            {
                isAdmin &&
                <Link to={'/customers'} id='nav-item' >Customers</Link>
            }
            {
                isAdmin &&
                <Link to={'/purchases'} id='nav-item' >Purchases</Link>
            }

            {
                loggedIn &&
                <Link to={'/login'} id='nav-item'>Login</Link>
            }
            {
                !loggedIn &&
                <Link to={'/'} id='nav-item' onClick={handleLogout}>Log Out</Link>


            }
            <Link to={'/cart'} id='nav-item' >My Cart <i className={addedToCart ? "fa-solid fa-cart-shopping fa-shake" : "fa-solid fa-cart-shopping"}>

            </i><i style={{ fontSize: '10px' }}>{cart.length > 0 ? cart.length : null}</i> </Link>
        </div>
    );
}

export default Navigation;