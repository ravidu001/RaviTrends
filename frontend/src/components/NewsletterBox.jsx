import React from 'react'

const NewsletterBox = () => {

    // prevent refresh the page when submit the form
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Subscribe to our newsletter and get 20% off your first purchase. Stay updated with the latest trends and exclusive offers.
        </p>
        <form onSubmit={onSubmitHandler} action="#" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter your email' className='w-full py-2 outline-none text-gray-800' required />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox