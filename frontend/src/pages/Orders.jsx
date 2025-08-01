import React, { useContext } from 'react'

import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
// import { set } from 'mongoose';
import { useEffect } from 'react';
import { useState } from 'react';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      // console.log(response.data);

      if (response.data.success) {
        let allOrderitem = [];
        response.data.orders.map((order) => {
          // Only include orders that are not delivered or failed
          if (order.status !== 'Delivered' && order.status !== 'Delivery Failed') {
            order.items.map((item) => {
              item['status'] = order.status;
              item['date'] = order.date;
              item['paymentMethod'] = order.paymentMethod;
              item['payment'] = order.payment;
              allOrderitem.push(item);
            })
          }
        })
        // console.log(allOrderitems);
        setorderData(allOrderitem.reverse());
      }
      
    } catch (error) {
      console.log(error);
      
    }

  }
  
  useEffect(() => {
    loadOrderData()
  },[token]);
  
  return (
    <div className='border-t pt-16'>
      
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      
      <p className='text-sm text-gray-600 mt-2 mb-4'>Track your active orders (Order Placed, Shipped, Out for delivery)</p>

      <div className='sm:mt-3'>
        {orderData.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 mb-4'>No active orders found</p>
            <p className='text-sm text-gray-400'>Your delivered orders can be found in your profile</p>
          </div>
        ) : (
          orderData.map((item,index)=> (
            <div key={index} className='py-4 border-t border-b text-gray700 flex flex-col md:flex-row md:items0center md:justify-between gap-4'>
              <div className='flex items-start gap-6 yexy-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt={item.name} />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{item.price}.00</p>
                    <p>Quantity: {item.quantity }</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <div className='flex items-center'>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm h-10 font-medium rounded-sm'>Track Order</button>  
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders