import React, { useEffect, useState } from 'react';
import utils from '../utils'
import { useDispatch, useSelector } from 'react-redux';
import ProdCard from './ProdCard'
import { useNavigate } from 'react-router-dom';



function Products(props) {

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.isAdmin)
    const nav = useNavigate()
    const numOfPurchases = useSelector(state=>state.purchases)
    useEffect(() => {

        utils.getAll('GET-PROD', dispatch, 'products')





    }, [])


    return (
        <>
            {isAdmin &&
                <button onClick={() => { nav('/add-product') }} className='edit-card-button' style={{ float: 'right' }}>Add Product</button>
            }
            <div className='product-container'>
                <h1 style={{ color: 'antiquewhite' }}>Our Products ...</h1> <br />
                <h2>{numOfPurchases} people already bought our products</h2>
            </div>

            <div className='card-container'>

                {products.map((product, index) => {
                    return (

                        <ProdCard key={index} id={product.id} name={product.name} quantity={product.quantity} price={product.price} img={product.img} />
                    )
                })}
            </div>



        </>
    );
}

export default Products;