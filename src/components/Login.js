import React, { useState } from 'react';
import { auth, db } from '../firebase/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ts from 'time-stamp';
import utils from '../utils';

function Login(props) {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false)



    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'admin') setAdmin(checked);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const registeredAt = ts('DD/MM/YYYY:HH:mm')
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user
            // Registration successful

            await setDoc(doc(db, 'users', user.uid), {
                email: email,
                id: user.uid,
                admin: admin,
                registeredAt: registeredAt
            })
            alert('SUCCESS')
            await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('uId', user.uid)
            dispatch({ type: 'LOGIN', payload: ts('DD/MM/YYYY:HH:mm') })
        } catch (error) {
            // Handle Errors here.
            console.error("Error in user registration", error.message);
        }
    };

    // Handle the form submission for login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            const { uid } = user.user
            alert('SUCCESS')
            localStorage.setItem('uId', JSON.stringify(uid))
            const admin = await utils.getQueryData('users', 'id', '==', uid)
            console.log(admin);
            dispatch({ type: 'LOGIN', payload:{ time:ts('DD/MM/YYYY:HH:mm'),admin:admin[0].admin} })
            nav('/')

        } catch (error) {
            // Handle Errors here.
            console.error("Error in user login", error.message);
        }
    };
    const formStyle = {
        display: 'flex',

        flexDirection: 'column',
        alignItems: 'center',
        height: '280px',
        justifyContent: 'center',
        margin: '50px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px'
    };

    const inputStyle = {
        margin: '10px',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '85%'
    };

    const buttonStyle = {
        margin: '10px',
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'black',
        color: 'white',
        cursor: 'pointer',
        width: '60%'
    };
    
    return (
        <div className='customers-container'>
            <div style={formStyle}>
                <input type="text" placeholder="Name" style={inputStyle} />
                <input type="email" placeholder="Email" style={inputStyle} name="email" value={email} onChange={handleChange} />
                <input type="password" placeholder="Password" style={inputStyle} name="password" value={password} onChange={handleChange} />
                Admin Privilleges<input defaultValue={false} type="checkbox" name="admin" id="" onChange={handleChange} />
                <button onClick={handleRegister} style={buttonStyle}>Register</button>
                {/* <a ><Link to={'/login/account-login'}>Already have an account? </Link></a>  Notyet implemented*/} 
                <button onClick={handleLogin} style={buttonStyle}>Login</button>
            </div>
        </div>
    );
}



export default Login;