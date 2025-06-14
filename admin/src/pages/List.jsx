import React from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { currency } from '../App';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
const List = ({ token }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token } 
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Failed to fetch the list");
      }
    } catch (error) {
      console.error("Error fetching the list:", error);

    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove/', { id }, {
        headers: { token }
      });
      if (response.data.success) {
        toast.success("Product deleted successfully");
        await fetchList(); // Refresh the list after deletion
        // setList(list.filter(item => item._id !== id));
      } else {
        toast.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
    }
  }
  

  useEffect(() => {
    fetchList();
  }, []);
  
  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table Title */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        
        {
          list.map((item, index)=> (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>

            </div>
            
          ))
        }
      </div>
    </>
  )
}

export default List