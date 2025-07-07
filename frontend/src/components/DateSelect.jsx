import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const DateSelect = ({ dateTime, id }) => {

  const navagate = useNavigate()

  const [selected, setSelected] = useState(null)

  const onBookHandler = () =>{
    if(!selected){
      return toast('Please select a date')
    }
    navagate(`/movies/${id}/${selected}`)
    scrollTo(0, 0)
  }

  return (
    <div id='dateSelect' className='pt-20'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-6 relative p-6 bg-primary/20 border-primary/40 rounded-lg'>
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle top='90px' right='-50px' />
        <div>
          <p className='text-lg font-semibold'>Choose Date</p>
          <div className='flex items-center gap-4 text-sm mt-3'>
            <ChevronLeftIcon width={22} />
            <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-3'>
              {Object.keys(dateTime).map((date) => (
                <button onClick={()=> setSelected(date)} key={date} className={`flex flex-col items-center justify-center h-10 w-10 aspect-square rounded cursor-pointer ${selected === date ? "bg-primary text-white" : "border border-primary/90"}`}>
                  <span>{new Date(date).getDate()}</span>
                  <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={22} />
          </div>
        </div>
        <button onClick={onBookHandler} className='bg-primary text-white px-5 py-1 mt-4 rounded hover:bg-primary-dull transition-all cursor-pointer'>Book Now</button>
      </div>
    </div>
  )
}

export default DateSelect