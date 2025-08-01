import React, { use, useContext, useEffect, useState } from 'react'

import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Collection = () => {

  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavant');

  // Toggle category filter
  const toggleCategory = (e) => {
    // If the category is already selected, remove it from the array
    // If not, add it to the array
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    // If the subCategory is already selected, remove it from the array
    // If not, add it to the array
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } 
    else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    
    let productsCopy = products.slice();

    if(showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    // filter category products to display
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    
    // filter subcategory products to display
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    
    setFilterProducts(productsCopy);
  }

  const sortProducts = () => {
     
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
    
      default:
        applyFilter();
        break;
    }
  }

  // applyFilter function did the role of this function
  // useEffect(()=>{
  //   setFilterProducts(products); 
  // },[])

//   useEffect(()=>{
//     console.log('Category changed:', category);
//   }, [category]);

//   useEffect(()=>{
//     console.log('SubCategory changed:', subCategory);
//   }
// , [subCategory]);

  useEffect(()=>{
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(()=>{
    sortProducts();
  }, [sortType]);
  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

    {/* Filter Options */}
    <div className='min-w-60'>
      <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
      </p>
      {/* Category FIlter */}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} /> Men
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} /> Women
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} /> Kids
          </p>
        </div>
      </div>
      {/* SubCategory FIlter */}
      <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
          </p>
          <p className='flex gap-2'>
            <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
          </p>
        </div>
      </div>
    </div>

    {/* Right side */}
    <div className='flex-1'>
      
      <div className='flex justify-between text-base sm:text-2xl mb-4'> 
        <Title text1={'ALL'} text2={'COLLECTIONS'} />
        {/* Product Sort */}
        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
          <option value="relavant">Sort by: Relavant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>

      {/* Map Products */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterProducts.map((item,index)=>(
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))
        }
      </div>
    </div>
      
    </div>
  )
}

export default Collection