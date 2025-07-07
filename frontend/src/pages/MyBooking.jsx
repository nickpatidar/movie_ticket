import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormate'
import { dateFormat } from '../lib/dateFormate'

const MyBooking = () => {

  const currency = import.meta.env.VITE_CURRENCY 

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getMyBookings()
  },[])


  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-25 pt-30 md:pt-32 min-h-[80vh]'>
      <BlurCircle top='70px' left='70px' />
      <div>
        <BlurCircle bottom='0' left='600px' />
      </div>
      <h1 className='text-base font-semibold mb-3'>My Bookings</h1>

      {bookings.map((item, index)=>(
        <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/16 border border-primary/25 rounded-lg mt-3 p-2 max-w-3xl'>
          <div className='flex flex-col md:flex-row'>
            <img src={item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
            <div className='flex flex-col p-3'>
              <p className='text-base font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>

          <div className='flex flex-col md:items-end md:text-right justify-between p-3'>
            <div className='flex items-center gap-3'>
              <p className='text-xl font-semibold mb-2'>{currency}{item.amount}</p>
              {!item.isPaid && <button className='bg-primary hover:bg-primary-dull px-3 py-1 mb-2 text-base rounded-full font-medium cursor-pointer'>Pay Now</button> }
            </div>
            <div className='text-sm'>
              <p><span className='text-gray-400'>Total Tickes:</span> {item.bookedSeats.length}</p>
              <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ")}</p>
            </div>
          </div>

        </div>
      ))}
      
    </div>
  ) : <Loading />
}

export default MyBooking
