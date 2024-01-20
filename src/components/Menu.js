import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function Menu(props) {




    return (

        <div id='menu'>
            <div id="menu-items">
            <Link to={'/products'} className='menu-item' >Products</Link>
            <Link to={'/customers'} className='menu-item'>Customers</Link>
            <Link to={'/purchased'} className='menu-item'>Purchased</Link>
            </div>
            <div id='menu-background-pattern'></div>
        </div>
    );
}

export default Menu;