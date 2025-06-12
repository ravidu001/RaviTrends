import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <div className='flex gap-2'>
            <img className='w-[max(20%,10px)]' src={assets.logo8} alt="" />
            <img className='w-[max(5%,10px)]' src={assets.logo} alt="" />
        </div>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar