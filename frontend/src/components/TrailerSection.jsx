import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailerSection = () => {

  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

  return (
    <div className='px-5 md:px-14 lg:px-22 xl:px-44 py-17 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px] lg:mx-30 mx-auto'>Trailers</p>
    
      <div className='relative mt-4'>
        <BlurCircle top='-60px' right='0px' />
        <ReactPlayer url={currentTrailer.videoUrl} controls={false} className="mx-auto max-w-full" width="820px" height="450px" />
      </div>

      <div className='group grid grid-cols-4 gap-4 md:gap-6 mt-5 max-w-2xl mx-auto'>
        {dummyTrailers.map((trailer)=>(
          <div key={trailer.image} className='relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition max-md:h-60 md:max-h-60 cursor-pointer' onClick={()=>setCurrentTrailer(trailer)}>

            <img src={trailer.image} alt="trailer" className='rounded-lg w-full h-full object-cover brightness-75' />
            <PlayCircleIcon strokeWidth={1.6} className='absolute top-1/2 left-1/2 w-5 md:w-6 h-4 md:h-9 transform -translate-x-1/2 -translate-y-1/2' />
          </div>
        ))}
      </div>
    </div>

  )
}

export default TrailerSection