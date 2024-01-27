import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Menu from './components/Menu'
import Customers from './components/Cutomers'
import Purchased from './components/Purchased';
import Products from './components/Products';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';
import Cart from './components/Cart';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import EditCustomer from './components/EditCustomer'
import Login from './components/Login';
import NotFound from './components/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import ts from 'time-stamp'
import utils from './utils';
import AccountLogin from './components/AccountLogin';
import RequiredAuth from './components/RequiredAuth';
function App() {
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.loggedIn)
  const nav = useNavigate()
  const location = useLocation()

  // useEffect(() => {

  //   if(location.pathname == '/login' && !loggedIn){
  //     nav('/')
  //   }
  //   const shouldLogin = utils.shouldReLogin()

  //   if (shouldLogin) {
  //     console.log('Should Login');
  //     nav('/login')
  //     dispatch({ type: 'RE-LOGIN' })
  //   }
  //   console.log('LOCATION: ',location);

  // }, [location])


  return (
    <div className="App">

      {location.pathname !== '/' && <Navigation />}
      <Routes>

        <Route path='/' element={<Menu />} />
        <Route path='/products' element={<Products />} />
        <Route path='/customers' element={<RequiredAuth><Customers /></RequiredAuth>} />
        <Route path='/purchases' element={<RequiredAuth><Purchased /></RequiredAuth>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-product' element={<RequiredAuth><AddProduct /></RequiredAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/account-login' element={<AccountLogin />} />



        <Route path='/product/:id' element={<RequiredAuth><EditProduct /></RequiredAuth>} />
        <Route path='/customer/:id' element={<RequiredAuth><EditCustomer /></RequiredAuth>} />
        <Route path='/purchases/:id' element={<RequiredAuth><Purchased /></RequiredAuth>} />



        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
