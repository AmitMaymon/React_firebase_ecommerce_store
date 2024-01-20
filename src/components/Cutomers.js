import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import EditCustomer from './EditCustomer';
import Swal from 'sweetalert2'

function Cutomers(props) {
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customers)
    const [clickedCustomer, setClickedCustomer] = useState(false)
    const [clickedCustomerId, setClickedCustomerId] = useState('')
    const nav = useNavigate()

    useEffect(() => {

        utils.getAll('GET-CUST', dispatch, 'customers')


        
        


    }, [])

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

                const data = await utils.getQueryData('purchases','customerId','==',id)
                console.log('delete DATA: ',data);
                for(let i in data){
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
    const handleCustomerClick = (cust) => {
        if (cust.id == clickedCustomerId && clickedCustomer) {
            console.log('ya');
            setClickedCustomer(false)
            return
        }

        console.log(cust.id);
        setClickedCustomerId(cust.id)
        setClickedCustomer(true)

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
                        <th>Products</th>
                        <th></th>
                        <th></th>
                        <th></th>

                    </tr>
                    {customers.map((cust, index) => {
                        const ProdIds = []
                        console.log('id', cust.id);

                        return (
                            <tr key={index}>

                                <td>{cust.fname}</td>
                                <td>{cust.lname}</td>
                                <td>{cust.city}</td>
                                <td>{cust.street}</td>
                                <td>{cust.products?.map((prod) => {

                                    if (ProdIds.includes(prod.id)) {
                                        return

                                    } else {
                                        ProdIds.push(prod.id)
                                        return (
                                            <Link to={'/product/' + prod.id} className='clickable-link'>{prod.name}</Link>

                                        )


                                    }

                                })
                                }</td>


                                <td style={{ cursor: 'pointer' }}><i className="fa-solid fa-trash" onClick={() => { handleDelete(cust.id) }}></i></td>
                                <td style={{ cursor: 'pointer' }} onClick={() => { handleCustomerClick(cust) }}>Edit</td>
                                <td style={{ cursor: 'pointer' }} onClick={() => { handleCustomerClick(cust) }}>BuyProd</td>

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
        </>
    );
}

export default Cutomers;