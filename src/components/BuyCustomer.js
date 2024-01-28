import React, { useEffect, useState } from 'react';
import utils from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import ts from 'time-stamp'

function BuyCustomer(props) {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [selectedProd, setSelectedProd] = useState('')


    useEffect(() => {
        utils.getAll('GET-PROD', dispatch, 'products')



    }, [])



    const handleClick = () => {
        const currentProd = products.find(prod => selectedProd === prod.id)

        const purObj = {
            customer: props.customer,
            products: [currentProd],
            customerId: props.customer.id,
            date: ts('DD/MM/YYYY'),
            hour: ts('HH:mm')

        }
        const custobj = { ...props.customer }




        utils.custPurchase(props.id,purObj,custobj,dispatch)



    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <div style={{ display: 'flex', flexDirection: 'column' }} className='customers-container'>

                <div className='customers-container'>

                    <select id='productInput' name="products" onChange={(e) => { setSelectedProd(e.target.value) }}>
                        <option value="" selected disabled>Please select a product</option>
                        {
                            products.map((prod, index) => {

                                return (
                                    <option key={index} value={prod.id}>{prod.name}</option>
                                )
                            })
                        }

                    </select>

                    <a style={{ cursor: 'pointer' }} onClick={handleClick}>Buy</a>







                </div>
            </div>
        </div >
    );
}

export default BuyCustomer;