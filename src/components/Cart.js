import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../utils'
import { useNavigate } from 'react-router-dom';
import ts from 'time-stamp'
import Swal from 'sweetalert2'

function Cart(props) {
    const cart = useSelector(state => state.cart)
    const [total, setTotal] = useState(0)
    const [customer, setCustomer] = useState({ fname: '', lname: '', city: '', street: '', products: [] })
    const [purchase, setPurchase] = useState({ customer: customer, date: '',hour:'', products: customer.products })
    const [allFields, setAllFields] = useState(false)
    const [emptyFields, setEmptyFields] = useState([])
    const dispatch = useDispatch()
    const nav = useNavigate()
    useEffect(() => {
        const tempTotal = cart.reduce((total, item) => total + parseFloat(item.price), 0);
        setTotal(tempTotal)


    }, [cart])

    const handleDelete = (id) => {

        dispatch({ type: 'DELETE-FROM-CART', payload: id })


    }
    useEffect(() => {
        setCustomer({ ...customer, products: cart })



    }, [cart])

    useEffect(() => {
        setPurchase({ date: ts('DD/MM/YYYY'),hour:ts('HH:mm'), customer: customer, products: customer.products })

    }, [customer, cart])



    const handleClick = () => {
        if (cart.length == 0) {
            Swal.fire({
                title: 'Your Cart is Empty,please add a product to your cart',
                confirmButtonColor:"#1e1e1e"
            });
            nav('/products')
            return
        }
        let { status, fields } = customerValidate()
        setEmptyFields(fields)
        setAllFields(status)

        if (!status) {
            return
        }

        utils.addItemPurchase('PURCHASE', dispatch, 'customers', customer, nav, purchase)


    }



    const customerValidate = () => {
        let counter = 0
        let fields = []
        for (let key in customer) {
            let value = customer[key]

            if (value == '') {

                fields.push(key)
                // setEmptyFields(prevFields => ([...prevFields, key]))


            } else {
                counter++
            }
        }


        if (counter == Object.keys(customer).length) {
            return { status: true, fields }
        } else {
            return { status: false, fields }
        }


    }


    const handleCustomerChange = (e) => {
        // setEmptyFields([])

        const { name, value } = e.target
        setCustomer(prevState => ({ ...prevState, [name]: value }))




    }

    const fieldNamesMap = {
        fname: 'First Name',
        lname: 'Last Name',
        city: 'City',
        street: 'Street'
    }

    return (
        <>
            <div className='customers-container'>
                <span>First Name<input name='fname' type="text" onChange={handleCustomerChange} /></span>
                <span> Last Name <input name='lname' type="text" onChange={handleCustomerChange} /></span>
                <span>City <input name='city' type="text" onChange={handleCustomerChange} /></span>
                <span>Street <input name='street' type="text" onChange={handleCustomerChange} /></span>

        

            </div>

            <div className='customers-container' >
                <table>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th></th>

                    <tbody>
                        {
                            cart.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.price}$</td>
                                        <td><i className="fa-solid fa-trash" onClick={() => { handleDelete(item.id) }}></i></td>

                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td>Total:</td>
                            <td>{total}$</td>
                            <td></td>
                        </tr>
                    </tbody>

                </table>


            </div>
            <div className='customers-container'>
                <button className='edit-card-button' onClick={handleClick}>Purchase</button>

            </div>
            {
                !allFields && <div className='customers-container' style={{ color: 'red' }}>Please fill the following fields : {emptyFields.map((field) => { return (<>{fieldNamesMap[field]} </>) })}</div>

            }



        </>
    );
}

export default Cart;