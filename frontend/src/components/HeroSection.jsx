import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  
  const navigate = useNavigate()

  return (


    <div className='flex flex-col items-start justify-center gap-3 px-5 md:px-14 lg:px-20 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
        <img src={assets.marvelLogo} alt="" className='max-h-9 lg:h-9 mt-18' />

        <h1 className='text-4xl md:text-[65px] md:leading-18 font-semibold max-w-110'>Guardians <br /> of the Galaxy</h1>

        <div className='flex items-center gap-3 text-gray-300'>
            <span>Action | Adventure | Sci-Fi</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4 h-4' /> 2018
            </div>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4 h-4' /> 2h 8m
            </div>
        </div>
        <p className='max-w-md text-gray-300'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
        <button onClick={()=> navigate('/movies')} className='flex items-center gap-1 px-5 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
          Explore Movies
          <ArrowRight className='w-4 h-4' />
        </button>
    </div>
  )
}

export default HeroSection
