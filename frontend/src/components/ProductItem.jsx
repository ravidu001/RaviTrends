import React, { useContext } from 'react'

import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition-all duration-300 ease-in-out h-48 w-48' src={image[0]} alt="product image" />
        </div>
        <p className='pt-3 pb-1 text-sm'> {name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem