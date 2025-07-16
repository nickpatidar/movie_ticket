import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { dateFormat } from '../../lib/dateFormate';
import { useAppContext } from '../../context/AppContext';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const {axios, getToken, user} = useAppContext()


  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try { 
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })  
      setBookings(data.bookings)
    } catch(error){
      console.error(error);
    }
    setIsLoading(false)
  };

  useEffect(() => {
    if(user){
      getAllBookings()
    }
  }, [user])


  return !isLoading ? (
    <>
      <title text1="List" text2="Bookings" />
      <div className='max-w-4xl mt-4 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-4'>User Name</th>
              <th className='p-2 font-medium '>Movie Name</th>
              <th className='p-2 font-medium '>Show Time</th>
              <th className='p-2 font-medium '>Seats</th>
              <th className='p-2 font-medium '>Amount</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {bookings.map((item, index) => (
              <tr key={index} className='border-b border-primary/25 bg-primary/10 even:bg-primary/15'>
                <td className='p-2 min-w-35 pl-4'>{item.user.name}</td>
                <td className='p-2'>{item.show.movie.title}</td>
                <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
                <td className='p-2'>{Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(",")}</td>
                <td className='p-2'>{currency} {item.amount}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </>
  ) : <Loading />
}

export default ListBookings