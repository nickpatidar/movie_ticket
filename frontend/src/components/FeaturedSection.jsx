import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'

const FeaturedSection = () => {

    const navigate = useNavigate()

    return (
        <div className='px-5 md:px-14 lg:px-25 xl:px-40 overflow-hidden'>
            <div className='relative flex items-center justify-between pt-15 pb-8'>
                <BlurCircle top='0' right='-10px' />
                <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
                <button onClick={()=> navigate('/movies')} className='group flex items-center gap-2 text-sm text-gray-300'>
                    View All
                    <ArrowRight className='group-hover:translate-x-0.5 transition w-4 h-4' />
                </button>
            </div>
            <div className='flex flex-wrap max-sm:justify-center gap-6 mt-6'>
                {dummyShowsData.slice(0,4).map((show)=>(
                    <MovieCard key={show._id} movie={show} />
                ))}
            </div>

            <div className='flex justify-center mt-18'>
                <button onClick={()=> {navigate('/movies'); scrollTo(0,0)}} className='px-8 py-2 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>
                    Show more
                </button>
            </div>

        </div>
    )
}

export default FeaturedSection
