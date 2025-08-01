import { Link, NavLink } from 'react-router-dom';
import React, { useContext, useState } from 'react';

import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
    
    const logout = ()=> {
        navigate('/login');
        localStorage.removeItem('token');
        setToken(null);
        setCartItems({});
    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/' className='flex items-center gap-2'>
                <img src={assets.logo8} alt="logo" className='w-36' />       
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'> 
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
                </NavLink>
            </ul>
            
            <div className='flex items-center gap-6'>
                <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />

                <div className='group relative'>
                    <img onClick={()=>token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="profile icon" />
                    {/* DropDown Menu */}
                    {
                        token && 
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg shadow-lg'> 
                                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} alt="cart" className='w-5 min-w-5 cursor-pointer' />
                    <span className='absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1'>{getCartCount()}</span>
                </Link>
                <img onClick={() => setVisible(!visible)} src={assets.menu_icon} alt="menu" className='w-5 cursor-pointer sm:hidden' />
            </div>
            
            {/* Mobile Menu */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out lg:hidden md:hidden ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} alt="close" className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/'>HOME</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/collection'>COLLECTION</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/about'>ABOUT</NavLink>
                    <NavLink className='py-2 pl-6 border' onClick={() => setVisible(false)} to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
