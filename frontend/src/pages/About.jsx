import NewsletterBox from '../components/NewsletterBox'
import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='about us' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At RaviTrends, we see fashion as a way to express your unique style. Our mission is to make online clothes shopping delightful with high-quality, trendy apparel. We curate collections for comfort and durability, backed by excellent customer service, fast shipping, and easy returns, ensuring you feel confident in every outfit.</p>
          <p>Our team is dedicated to your satisfaction, prioritizing sustainability, ethical sourcing, and inclusivity with diverse sizes and styles. Whether refreshing your wardrobe or seeking a special piece, RaviTrends aims to exceed expectations, making your shopping experience enjoyable and rewarding.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Empower every individual to embrace their unique style through a curated selection of high-quality, trendy, and sustainable clothing. We are committed to delivering an exceptional online shopping experience with outstanding customer service, seamless navigation, and inclusive sizing, ensuring that everyone feels confident and inspired in their fashion choices.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We source premium materials and rigorously inspect every item to ensure lasting style and comfort.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Shop effortlessly with our user-friendly platform, fast shipping, and hassle-free returns.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our dedicated team is here to assist you every step of the way, ensuring a seamless experience.</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About