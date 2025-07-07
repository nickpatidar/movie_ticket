import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormate'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const MovieDetails = () => {

  const navigate = useNavigate()

  const { id } = useParams()
  const [show, setShow] = useState(null)

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    if (show) {

      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  return show ? (
    <div className='px-6 md:px-12 lg:px-25 pt-25 md:pt-40'>
      <div className='flex flex-col md:flex-row gap-5 max-w-4xl mx-auto'>
        <img src={show.movie.poster_path} className='max-md:mx-auto rounded-xl h-80 max-w-70 object-cover' alt="" />

        <div className='relative flex flex-col gap-2'>
          <BlurCircle top='-50px' left='-70px' />
          <p className='text-primary'>English</p>
          <h1 className='text-3xl font-semibold max-w-90 text-balance'>{show.movie.title}</h1>
          <div className='flex items-center gap-1 text-gray-300'>
            <StarIcon className='w-4 h-4 text-primary fill-primary' />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className='text-gray-400 mt-2 text-sm leading-tight  max-w-xl'>{show.movie.overview}</p>
          <p>
            {timeFormat(show.movie.runtime)} • {show.movie.genres.map(genre => genre.name).join(" ")} • {show.movie.release_date.split("-")[0]}
          </p>

          <div className='flex items-center flex-wrap gap-3 mt-3'>
            <button className='flex items-center gap-2 px-5 py-2 text-sm bg-gray-800 hover:bg-gray-900 rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircleIcon className={`w-4 h-4`} />
              Watch Trailer
            </button>
            <a className='px-8 py-2 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95' href="#dateSelect">Buy Tickets</a>
            <button className='bg-gray-700 p-2 rounded-full transition cursor-pointer active:scale-95'>
              <Heart className={`w-4 h-4`} />
            </button>
          </div>

        </div>
      </div>

      <p className='text-lg font-medium mt-15'>Your Favorite Cast</p>
      <div className='overflow-x-auto mt-5 no-scrollbar pb-2'>
        <div className='flex items-center gap-3 w-max px-3'>
          {show.movie.casts.slice(0, 12).map((cast, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <img src={cast.profile_path} className='rounded-full h-15 md:h-15 aspect-square object-cover' alt="" />
              <p className='font-medium text-xs mt-2'>{cast.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className='text-lg font-medium mt-15 mb-5'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-5'>
        {dummyShowsData.slice(0, 4).map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className='flex justify-center mt-15'>
        <button onClick={() => { navigate('/movies'); scrollTo(0, 0) }} className='px-7 py-2 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
      </div>

    </div>
  ) : <Loading />
}

export default MovieDetails
