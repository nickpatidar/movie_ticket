import React from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'

const Movie = () => {
  const {shows} = useAppContext()

  return shows.length > 0 ? (
    <div className='relative my-35 mb-50 px-6 md:px-15 lg:px-30 xl:px-40 overflow-hidden min-h-[75vh]'>
      <BlurCircle  top='120px' left='-15px'/>
      <BlurCircle  bottom='60px' right='60px'/>
      <h1 className='text-lg font-medium my-3'>Now Showing</h1>
      <div className='flex flex-wrap max-sm:justify-center gap-5'>
        {shows.map((movie)=> (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold text-center'>No movies available</h1>
    </div>
  )
}

export default Movie
