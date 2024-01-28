import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../utils';
import { useNavigate } from 'react-router-dom';
import EditCustomer from './EditCustomer';
import Swal from 'sweetalert2'
import BuyCustomer from './BuyCustomer';
import Purchased from './Purchased';

function Cutomers(props) {
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customers)
    const [clickedCustomer, setClickedCustomer] = useState(false)
    const [clickedPurchases, setClickedPurchases] = useState(false)
    const [clickedBuy, setClickedBuy] = useState(false)
    const [clickedCustomerId, setClickedCustomerId] = useState('')
    const [buyingCustomer, setBuyingCustomer] = useState({})

    useEffect(() => {

        utils.getAll('GET-CUST', dispatch, 'customers')






    }, [])

    useEffect(() => {





    }, [clickedPurchases])

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1e1e1e",
            cancelButtonColor: "#970000",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                utils.removeItem('DELETE-CUSTOMER', dispatch, 'customers', id)

                const data = await utils.getQueryData('purchases', 'customerId', '==', id)
                for (let i in data) {
                    utils.removeItem('DELETE-PURCHASE', dispatch, 'purchases', data[i].id)

                }
                Swal.fire({
                    title: "Deleted!",
                    text: "Customer data has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#1e1e1e"
                });
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    icon: 'info',
                    confirmButtonColor: "#1e1e1e",
                    background: ''
                })
            }
        });


    }
    const handleCustomerClick = (cust, btnId) => {
        setClickedCustomer(false)
        setClickedBuy(false)
        setClickedPurchases(false)

        if (btnId === 'edit') {

            if (cust.id === clickedCustomerId && clickedCustomer) {
                setClickedCustomer(false)
                return
            }

            setClickedCustomerId(cust.id)
            setClickedCustomer(true)

        } else if (btnId === 'buy') {
            if (cust.id === clickedCustomerId && clickedBuy) {
                setClickedBuy(false)
                return
            }
            setBuyingCustomer(cust)
            setClickedBuy(true)

        } else if (btnId == 'purc') {
            if (cust.id === clickedCustomerId && clickedPurchases) {
                setClickedPurchases(false)
                return
            }

            setClickedPurchases(true)
            setClickedCustomerId(cust.id)


        }

    }




    return (
        <>
            <div className='customers-container'>
                <table >
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>City</th>
                        <th>Street</th>
                        <th>Purchases</th>
                        <th></th>
                        <th></th>
                        <th></th>

                    </tr>
                    {customers.map((cust, index) => {
                        const ProdIds = []
                        return (
                            <tr key={index}>

                                <td>{cust.fname}</td>
                                <td>{cust.lname}</td>
                                <td>{cust.city}</td>
                                <td>{cust.street}</td>
                                <td style={{ cursor: 'pointer' }} onClick={() => { handleCustomerClick(cust, 'purc'); setClickedCustomerId(cust.id) }} >Purchases</td>


                                <td style={{ cursor: 'pointer' }}><i className="fa-solid fa-trash" onClick={() => { handleDelete(cust.id) }}></i></td>
                                <td style={{ cursor: 'pointer' }} onClick={() => { handleCustomerClick(cust, 'edit'); setClickedCustomerId(cust.id) }}>Edit</td>
                                <td style={{ cursor: 'pointer' }} onClick={() => { handleCustomerClick(cust, 'buy'); setClickedCustomerId(cust.id) }} >BuyProd</td>

                            </tr>

                        )



                    })}


                </table>
            </div>
            {

                clickedCustomer &&
                <div className='customer-container'>
                    <br /> <br />

                    <EditCustomer id={clickedCustomerId} />


                </div>


            }
            {
                clickedBuy &&
                <div className='customer-container'>
                    <br /> <br />
                    <BuyCustomer customer={buyingCustomer} id={buyingCustomer.id} />
                </div>
            }
            {
                clickedPurchases &&
                <div className='customer-container'>
                    <br /> <br />
                    <Purchased id={clickedCustomerId} />
                </div>
            }
        </>
    );
}

export default Cutomers;