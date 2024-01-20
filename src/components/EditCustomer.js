import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import utils from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import './test.css'
function EditCustomer(props) {
    let { id } = props
    let {id:pId} = useParams()



    const dispatch = useDispatch()
    const customer = useSelector(state => state.customer)


    const [tempCustomer, setTempCustomer] = useState({
        fname: '',
        lname: '',
        city: '',
        street: '',
        products: [],
        purId:''

    })

    useEffect(() => {
        if(id){
            utils.getByID('GET-CUST-ID', dispatch, 'customers', id)

        }else if(pId){
            utils.getByID('GET-CUST-ID', dispatch, 'customers', pId)
        }


    }, [id])

    useEffect(() => {
        setTempCustomer({
            fname: customer.fname,
            lname: customer.lname,
            city: customer.city,
            street: customer.street,
            products: customer.products,
            purId:customer.purId
        })
        console.log(customer,tempCustomer);


    }, [customer])


    const handleChange = (e) => {
        const { name, value } = e.target
        setTempCustomer(prevState => ({ ...prevState, [name]: value }))

    }

    const handleButton = async () => {

        utils.update('UPDATE-CUST', dispatch, 'customers', id, tempCustomer)



    }


    return (
        <div style={{ textAlign: 'center' }}>

            <div>
                <div style={{ color: 'antiquewhite', display: 'inline-block', marginRight: '10px', textAlign: 'center' }}>
                    <span>First Name</span>
                    <br />
                    <input name='fname' type="text" value={tempCustomer.fname} onChange={handleChange} />
                </div>
                <div style={{ color: 'antiquewhite', display: 'inline-block', marginRight: '10px', textAlign: 'center' }}>
                    <span>Last Name</span>
                    <br />
                    <input name='lname' type="text" value={tempCustomer.lname} onChange={handleChange} />
                </div>
                <div style={{ color: 'antiquewhite', display: 'inline-block', marginRight: '10px', textAlign: 'center' }}>
                    <span>City</span>
                    <br />
                    <input name='city' type="text" value={tempCustomer.city} onChange={handleChange} />
                </div>
                <div style={{ color: 'antiquewhite', display: 'inline-block', textAlign: 'center' }}>
                    <span>Street</span>
                    <br />
                    <input name='street' type="text" value={tempCustomer.street} onChange={handleChange} />
                </div>
                <div style={{ color: 'antiquewhite', display: 'inline-block', textAlign: 'center', paddingLeft: '10px' }}>
                    <br />
                    <button className='compact-button' onClick={handleButton}>Update</button>
                </div>
            
            </div>
            <div className='customers-container'>
{/* 
                <table style={{margin:'auto'}}>
                    <tr>

                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Id</th>
                        
                    </tr>


                    {
                        tempCustomer.products?.map((prod, index) => {
                            return (
                                <tr key={index}>
                                    <td>{prod.name}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.id}</td>
                                    
                                    
                                </tr>

                            )

                        })
                    }
                </table> */}
            </div>

        </div>
    );
}

export default EditCustomer;