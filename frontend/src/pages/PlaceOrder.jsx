import React, { useContext, useEffect, useState } from 'react'

import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const [useProfileData, setUseProfileData] = useState(false);
  const {navigate, backendUrl, token, cartItems, getCartAmount, delivery_fee, products, setCartItems} = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    houseNo: '',
    street: '',
    city: '',
    district: '',
    province: '',
    postalCode: '',
    phoneNumber: ''
  });

  // Load saved profile data
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile && useProfileData) {
      const profileData = JSON.parse(savedProfile);
      setFormData(profileData);
    }
  }, [useProfileData]);

  const handleUseProfileData = (checked) => {
    setUseProfileData(checked);
    if (checked) {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profileData = JSON.parse(savedProfile);
        setFormData(profileData);
      }
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        houseNo: '',
        street: '',
        city: '',
        district: '',
        province: '',
        postalCode: '',
        phoneNumber: ''
      });
    }
  };
  
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    setFormData(data=> ({...data, [name]: value}));
  }
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = products.find(product => product._id === itemId);
            if (itemInfo) {
              const orderItem = structuredClone(itemInfo);
              orderItem.size = size;
              orderItem.quantity = cartItems[itemId][size];
              orderItems.push(orderItem);
            }
          }
        }
      }


      // console.log(orderItems);
      let orderData= {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        // API call for COD
        case 'cod':
          const  response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token} });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {  
            toast.error(response.data.message);
          }
          break;
          
        // API call for Stripe
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token} });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        defualt:

          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* Auto-fill checkbox */}
        {token && (
          <div className='flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded'>
            <input 
              type="checkbox" 
              id="useProfile"
              checked={useProfileData}
              onChange={(e) => handleUseProfileData(e.target.checked)}
              className='w-4 h-4'
            />
            <label htmlFor="useProfile" className='text-sm text-gray-700 cursor-pointer'>
              Use my saved profile information
            </label>
          </div>
        )}
        
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='houseNo' value={formData.houseNo} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='House No.' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='district' value={formData.district} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='District' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='province' value={formData.province} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Province' />
          <input required onChange={onChangeHandler} name='postalCode' value={formData.postalCode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Postal Code' />
        </div>
        <input required onChange={onChangeHandler} name='phoneNumber' value={formData.phoneNumber} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone Number' />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row lg:justify-between lg:gap-10'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer lg:pr-20'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Logo" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div> 
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder