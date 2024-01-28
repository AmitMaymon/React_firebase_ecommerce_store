import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import utils from '../utils';
import { Link, useNavigate, useParams } from 'react-router-dom';








function Purchased(props) {
    const products = useSelector(state => state.products)
    const customers = useSelector(state => state.customers)
    const [selectedProd, setSelectedProd] = useState('')
    const [selectedCust, setSelectedCust] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectUpdate, setSelectUpdate] = useState(false)
    const [foundQuery, setFoundQuery] = useState([])
    const [inParams, setInParams] = useState(false)
    const [inProps, setInProps] = useState(false)
    const dispatch = useDispatch()
    const params = useParams()
    const productRef = useRef(null)
    const customerRef = useRef(null)
    const buttonRef = useRef(null)
    const nav = useNavigate()


    useEffect(() => {

        utils.getAll('GET-CUST', dispatch, 'customers')
        utils.getAll('GET-PROD', dispatch, 'products')
        const withParmas = async () => {


            productRef.current.value = params.id
            setSelectedProd(params.id)





        }
        const withProps = async () => {
            customerRef.current.value = props.id
            setSelectedCust(props.id)
        }

        if (params.id) {
            setInParams(true)
            withParmas()
        }
        if (props.id) {
            setInProps(true)
            withProps()
        }




    }, [props,params])
    useEffect(() => {
        if (inParams) {
            buttonRef.current.click()
            setInProps(false)
        }
        if (inProps) {
            buttonRef.current.click()
            setInProps(false)
        }



    }, [selectedProd, selectedCust])





    const handleSearchV2 = async (params) => {
        let q = {
            cust: selectedCust === '' ? false : true,
            prod: selectedProd === '' ? false : true,
            date: selectedDate === '' ? false : true
        }

        const formattedDate = formatDate(selectedDate)
        const cust = await utils.getQueryData('customers', 'id', selectedCust === '' ? '!=' : '==', selectedCust)
        const prod = await utils.getQueryData('products', 'id', selectedProd === '' ? '!=' : '==', selectedProd)
        const date = await utils.getQueryData('purchases', 'date', selectedDate ==='' ? '!=' : '==', formattedDate)

        const final = []
        let double = false
        for (let i in date) {
            if (q.cust) {
                if (q.prod) {
                    date[i].customerId === selectedCust && date[i].products.some(d => d.id == selectedProd) && final.push(date[i])
                    double = true
                } else {
                    date[i].customerId === selectedCust && final.push(date[i])

                }
            } else if (q.prod) {
                if (q.cust && !double) {
                    date[i].products.some(p => p.id === selectedProd) && date[i].customerId == selectedCust && final.push(date[i])
                } else if (!double) {
                    date[i].products.some(p => p.id === selectedProd) && final.push(date[i])

                }
            }
            if (!q.cust && !q.prod) {

                final.push(date[i])
            }

            setFoundQuery(final)





        }




    }

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }
    useEffect(() => {
        const update = (val) => {
            setSelectUpdate(val)
            setFoundQuery([])
        }
        update(false)
        update(true)


    }, [selectedCust, selectedDate, selectedProd])









    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <div style={{ display: 'flex', flexDirection: 'column' }} className='customers-container'>

                <div className='customers-container'>

                    <select id='productInput' ref={productRef} name="products" onChange={(e) => { setSelectedProd(e.target.value) }}>
                        <option value="" selected >All Products</option>
                        {
                            products.map((prod, index) => {

                                return (
                                    <option key={index} value={prod.id}>{prod.name}</option>
                                )
                            })
                        }

                    </select>

                    <select name="customers" ref={customerRef} onChange={(e) => { setSelectedCust(e.target.value) }}>
                        <option value="" selected >All Customers</option>
                        {
                            customers.map((cust, index) => {

                                return (
                                    <option key={index} value={cust.id}>{cust.fname + ' ' + cust.lname}</option>
                                )
                            })
                        }

                    </select>

                    <input type="date" onChange={(e) => { setSelectedDate(e.target.value) }} />
                </div>
                <div className='customers-container'>
                    <button ref={buttonRef} className='compact-button' onClick={handleSearchV2}>Search</button>
                </div>
                <div className='customers-container'>
                    {selectUpdate &&

                        <table>
                            <th>Date</th>
                            <th>Full Name</th>
                            <th>Products</th>
                            <th>Customer Id</th>
                            <th>Purchase Id</th>


                            {
                                foundQuery.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.date + " " + item.hour}</td>
                                        <td>{item.customer.fname + ' ' + item.customer.lname}</td>
                                        <td>
                                            {item.products.map((prod, prodIndex) => (
                                                <span key={prodIndex}>

                                                    <Link to={'/product/' + prod.id} className='clickable-link'>
                                                        {prod.name + ' '}
                                                    </Link>

                                                    {/* {prodIndex < item.products.length - 1 && ', '} */}
                                                </span>
                                            ))}
                                        </td>
                                        <td style={{ cursor: 'pointer' }} onClick={()=>{nav('/customer/' + item.customerId)}}>{item.customerId}</td>
                                        <td style={{ cursor: 'pointer' }}>{item.id}</td>
                                    </tr>
                                ))
                            }

                        </table>
                    }
                </div>
            </div>
        </div>
    );
}

export default Purchased;