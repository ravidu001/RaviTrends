import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import About from './pages/About'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Profile from './pages/Profile';
import React from 'react'
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App