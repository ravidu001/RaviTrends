import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
            <div>
                <img src={assets.logo8} className='mb-5 w-32' alt="logo" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    Discover the latest trends, styles, and inspirations with RaviTrends – Your guide to modern living.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+94-77 0055500</li>
                    <li>contact@ravitrends.com</li>
                    <li className='flex items-center gap-2'>
                        <a href='https://www.facebook.com/ravitrends' target='_blank' rel='noopener noreferrer'>
                            <img className='w-10 h-10' src={assets.social1} alt='facebook' />
                        </a>

                        <a href='https://www.instagram.com/ravitrends' target='_blank' rel='noopener noreferrer'>
                            <img className='w-8 h-8' src={assets.social2} alt='instagram' />
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ ravitrends.com - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer