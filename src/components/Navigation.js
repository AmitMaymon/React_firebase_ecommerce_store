import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';




function Navigation(props) {
    const addedToCart = useSelector(state => state.addedToCart)
    const cart = useSelector(state => state.cart)
    const isAdmin = useSelector(state => state.isAdmin)

    return (
        <div className='nav-bar'>
            <Link to={'/'} id='nav-item'>Menu</Link>
            <Link to={'/products'} id='nav-item' >Products</Link>
            <Link to={'/customers'} id='nav-item' >Customers</Link>
            {
                isAdmin &&
                <Link to={'/purchases'} id='nav-item' >Purchases</Link>
            }
            <Link to={'/cart'} id='nav-item' >My Cart <i className={addedToCart ? "fa-solid fa-cart-shopping fa-shake" : "fa-solid fa-cart-shopping"}>

            </i><i style={{ fontSize: '10px' }}>{cart.length > 0 ? cart.length : null}</i> </Link>
        </div>
    );
}

export default Navigation;