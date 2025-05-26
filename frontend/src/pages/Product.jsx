import React, { useContext, useEffect, useState } from 'react'

import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useParams } from 'react-router-dom';

const Product = () => {

  const {productId} = useParams();
  const {products, currency} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    
    products.map((item)=> {
      if(item._id === productId) {
        setProductData(item)
        // console.log(item); // display the selected product data
        setImage(item.image[0]) 
        return null;
      }
    })
  }
  
  useEffect(()=> {
    fetchProductData();
  },[productId])
  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_dull_icon} alt="" className='w-3 5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={()=>setSize(item)} key={index} className={`border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className='mt-10'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Elevate your wardrobe with our Men Round Neck Pure Cotton T-shirt, 
            a perfect blend of comfort and style. Crafted from lightweight, pure cotton, 
            this T-shirt offers a close-fitting silhouette with a classic round neckline 
            and short sleeves, making it ideal for layering or as a standalone piece. 
            Whether you're dressing up for a casual outing or lounging at home, 
            this versatile T-shirt is your go-to choice.
          </p>
          <p>Available in sizes M, L, and XL, this shirt features a chic pink color that adds 
            a refreshing touch to any outfit. Enjoy the assurance of quality with our 100% 
            original product guarantee and take advantage of our cash-on-delivery option. 
            With an easy return and exchange policy within 7 days, upgrading your wardrobe 
            has never been simpler!
          </p>
          
        </div>

      </div>
      
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product