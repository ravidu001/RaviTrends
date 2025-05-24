import BestSeller from '../components/BestSeller'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import React from 'react'

const Home = () => {
  return (
    <div>
        <Hero />
        <LatestCollection />
        <BestSeller />
    </div>
  )
}

export default Home