import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'
import { useSelector } from 'react-redux';

function Menu(props) {
    const isAdmin = useSelector(state => state.isAdmin)



    return (

        <div id='menu'>
            <div id="menu-items">
                <Link to={'/products'} className='menu-item' >Products</Link>
                {
                    isAdmin &&
                    <Link to={'/customers'} className='menu-item'>Customers</Link>
                }
                {
                    isAdmin &&
                    <Link to={'/purchases'} className='menu-item'>Purchased</Link>
                }
            </div>
            <div id='menu-background-pattern'></div>
        </div>
    );
}

export default Menu;