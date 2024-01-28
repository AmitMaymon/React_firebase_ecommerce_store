import React, {  useState } from 'react';
import { useNavigate} from 'react-router-dom';
import utils from '../utils'
import { useDispatch } from 'react-redux';
import ProdCard from './ProdCard';

function AddProduct(props) {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [tempProduct, setTempProduct] = useState({
        name: '',
        price: 0,
        quantity: 0,
        img: '',
        

    })



    const handleChange = (e) => {
        const { name, value } = e.target
        setTempProduct(prevState => ({ ...prevState, [name]: value }))

    }

    const handleButton = () => {
        utils.addItem('ADD-PROD',dispatch,'products',tempProduct,nav)
        



    }


    return (
        <>
            <div className='customers-container' >
                <table>

                    <thead>
                        <th>Product Name</th>
                        <th>Proudct price</th>
                        <th>Proudct quantity</th>
                        <th>Proudct img link</th>

                    </thead>
                    <tbody>

                        <tr>
                            <td> <input name='name' type="text" value={tempProduct.name} onChange={handleChange} /></td>
                            <td><input name='price' type="number" value={tempProduct.price} onChange={handleChange} /></td>
                            <td><input name='quantity' type="number" value={tempProduct.quantity} onChange={handleChange} /></td>
                            <td><input name='img' type="text" value={tempProduct.img} onChange={handleChange} /></td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div className='customers-container'>
                <button className='card-button' onClick={handleButton} style={{ position: 'relative', width: '60%', height: '5vh', border: '1px solid antiquewhite' }} >Create New Item</button>

            </div>
            <div className='customers-container'>
                <ProdCard name={tempProduct.name} price={tempProduct.price} quantity={tempProduct.quantity} img={tempProduct.img} />

            </div>

        </>
    );
}

export default AddProduct;