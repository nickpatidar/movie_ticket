import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const SeatLayout = () => {

  const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [show, setShow] = useState(null)
  const [occupiedSeats, setOccupiedSeats] = useState([])

  const navigate = useNavigate()

  const { axios, getToken, user } = useAppContext();

  const getShow = async () => {
    try{
      const { data } = await axios.get(`/api/show/${id}`)
      if(data.success){
        setShow(data)
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first")
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can select up to 5 seats only")
    }
    if(occupiedSeats.includes(seatId)){
      return toast('This seat is already booked')
    }

    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-1.5 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-1.5'>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button key={seatId} onClick={() => handleSeatClick(seatId)} className={`h-5 w-5 rounded border border-primary/60 cursor-pointer 
             ${selectedSeats.includes(seatId) && "bg-primary text-white"}
             ${occupiedSeats.includes(seatId) && "opacity-50"}`}>
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  const getOccupiedSeats = async ()=>{
    try{
      const {data} = await axios.get(`/api/booking/seats/${selectedTime.showId}`)
      if(data.success){
        setOccupiedSeats(data.occupiedSeats)
      }else{
        toast.error(data.message)
      }
    } catch(error){
      console.log(error)
    }
  }

  const bookTickets = async ()=>{
    try{
      if(!user) return toast.error('Please login to proceed')

        if(!selectedTime || !selectedSeats.length) return toast.error('please select a time and seats');

        const { data } = await axios.post('/api/booking/create', {showId: selectedTime.showId, selectedSeats}, {headers: { Authorization: `Bearer ${await getToken()}`}})
        

        if(data.success){
          window.location.href = data.url;
        }else{
          toast.error(data.message)
        }
    } catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getShow()
  }, [])

  useEffect(()=>{
    if(selectedTime){
      getOccupiedSeats()
    }
  },[selectedTime])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-12 lg:px-25 py-20 md:pt-35'>
      <div className='w-45 bg-primary/20 border border-primary/30 rounded-lg py-7 h-max md:sticky md:top-20'>
        <p className='text-lg font-semibold px-4'>Available Timings</p>
        <div className='mt-3 space-y-1'>
          {show.dateTime[date].map((item) => (
            <div key={item.time} onClick={() => setSelectedTime(item)} className={`flex items-center gap-1.5 px-4 py-1.5 w-max rounded-r-md cursor-pointer transition  ${selectedTime?.time === item.time ? "bg-primary text-white " : "hover:bg-primary/30"}`}>
              <ClockIcon className='w-3 h-3 ' />
              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>


      <div className='relative flex-1 flex flex-col items-center max-md:mt-10'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle bottom='0' right='0' />
        <h1 className='text-xl font-semibold mb-3'>Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className='text-gray-400 text-sm mb-4'>SCREEN SIDE</p>

        <div className='flex flex-col items-center mt-7 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-5 md:gap-1 mb-4'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>

          <div className='grid grid-cols-2 gap-8'>
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        <button onClick={bookTickets} className='flex items-center mt-15 px-7 py-3 gap-1 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
          Proceed to checkout
          <ArrowRightIcon strokeWidth={3} className='w-3 h-3' />
        </button>

      </div>
    </div>
  ) : <Loading />
}

export default SeatLayout
