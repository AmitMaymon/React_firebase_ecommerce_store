import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import utils from '../utils'
import { useDispatch, useSelector } from 'react-redux';

function ProdCard(props) {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.isAdmin)
    const addedToCart = useSelector(state => state.addedToCart)
    const nav = useNavigate()


    // {
    //     id:props.id,
    //     name:props.name,
    //     price:props.price

    // }


    const handleClick = async () => {
        dispatch({ type: 'CART-ITEM', payload: true })
        setTimeout(() => {
            dispatch({ type: 'CART-ITEM', payload: false })
        }, 1000);
 

        const obj = {
            id: props.id,
            name: props.name,
            price: props.price
        }

        dispatch({ type: 'ADD-TO-CART', payload: obj })
        

    }

    const handleDelete = ()=>{
        utils.removeItem('DELETE-PROD',dispatch,'products',props.id)

    }



    return (
        <div className='card-item'>
            <h3>{props.name}</h3>
            <br />
            <img id='card-img' src={props.img} alt="product picture" />
            
            {

                isAdmin && <button onClick={() => { nav(`/product/${props.id}`) }} className='edit-card-button' style={{ position: 'absolute',border:'1px solid black' }}>Edit Product</button>
            }
            {
                isAdmin &&
                <button onClick={() => {nav(`/purchases/${props.id}`)}} className='edit-card-button' style={{ position: 'absolute', top: '17.5vh',border:'1px solid black' }}>Purchases List</button>
            }
            {
                isAdmin &&
                <button onClick={handleDelete} className='edit-card-button' style={{ position: 'absolute', top: '13vh',border:'1px solid black' }}>Delete Product</button>
            }
            {
                isAdmin &&
                <button className='edit-card-button' style={{ position: 'absolute', top: '22vh',border:'1px solid black' }}>Customers List</button>
            }
            <h4 style={{ position: 'absolute', bottom: '20px' }} >{props.price}$</h4>
            <h4 style={{ position: 'absolute', bottom: '20px', right: '0' }}>{props.quantity > 0 ? 'In Stock' : 'Out Of Stock'}</h4>
            <br />
            <button className='card-button' onClick={handleClick} >Add to Cart</button>
        </div>
    );
}

export default ProdCard;