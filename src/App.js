import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
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
function App() {

  const location = useLocation()


  return (
    <div className="App">

      {location.pathname !== '/' && <Navigation />}
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/products' element={<Products />} />
        <Route path='/customers' element={<Customers />} />
        <Route path='/purchases' element={<Purchased />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/add-product' element={<AddProduct />} />
        


        <Route path='/product/:id' element={<EditProduct />} />
        <Route path='/customer/:id' element={<EditCustomer />} />
        <Route path='/purchases/:id' element={<Purchased />} />


      </Routes>

    </div>
  );
}

export default App;
