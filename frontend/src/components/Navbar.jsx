import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useUser()
  const {openSignIn} = useClerk()

  const navigate = useNavigate()

  const {favoriteMovies} = useAppContext()
  
  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-15 lg:px-20 py-4 '>
      <Link to='/' className='max-md:flex-1'>
      <img src={assets.logo} alt="" className='w-32 h-auto' />
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-6 min-md:px-6 py-2 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

        <XIcon className='md:hidden absolute top-5 right-5 w-5 h-5 cursor-pointer' onClick={()=>setIsOpen(!isOpen)} />

          <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Home</Link>
          <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/movies'>Movies</Link>
          <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Theaters</Link>
          <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/'>Releases</Link>
          {favoriteMovies.length > 0 && <Link onClick={()=>{scrollTo(0,0); setIsOpen(false)}} to='/favorite'>Favorites</Link>}
      </div>

      <div className='flex items-center gap-6'>
        <SearchIcon className='max-md:hidden w-5 h-5 cursor-pointer' />
        {
          !user? (<button onClick={openSignIn} className='px-3 py-1 sm:px-7 sm:py-1.5 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action  label='My Booking' labelIcon=
                {<TicketPlus width={15} />} onClick={()=>navigate('/my-bookings')}/>
              </UserButton.MenuItems>
            </UserButton>
          )
        }
        
      </div>
      
      <MenuIcon className='max-md:ml-4 md:hidden w-7 h-7 cursor-pointer' onClick={()=> setIsOpen(!isOpen)} />
    </div>
  )
}

export default Navbar
