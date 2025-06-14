import'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom'

import Add from './pages/Add'
import List from './pages/List'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Orders from './pages/Orders'
import React from 'react'
import Sidebar from './components/Sidebar'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react';
import { useState } from 'react'

export const backendUrl =  import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
export const currency = '$';

const App = () => {

    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : '');  

    useEffect(() => {
        localStorage.setItem('token', token);
    }
    , [token]);
  
  return (
    <div className='bg-gray-50 min-h-screen'> 
    <ToastContainer />
      { token === '' ? <Login setToken={setToken} /> : 
      <>
        <Navbar setToken={setToken} />
        <hr />
        <div className='flex w-full'>
          <Sidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/' element={<Add token={token} />} />
              <Route path='/add' element={<Add token={token} />} />
              <Route path='/list' element={<List token={token} />} />
              <Route path='/orders' element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
      </>
      }
    </div>
  )
}

export default App