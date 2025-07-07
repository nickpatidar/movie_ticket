import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {

  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile
  }

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon},
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon},
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon},
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon}
  ]

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-5 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
      <img className='h-9 md:h-12 w-9 md:w-12 rounded-full mx-auto' src={user.imageUrl} alt="sidebar" />
      <p className='mt-1.5 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>
      <div className='w-full'>
        {adminNavlinks.map((link,index)=>(
          <NavLink key={index} to={link.path} end className={({ isActive}) => `relative flex items-center max-md:justify-center gap-2 w-full py-2 min-md:pl-10 first:mt-4 text-gray-400 ${isActive && 'bg-primary/15 text-primary group'}`}>
            {({ isActive})=>(
              <>
                <link.icon className='w-4 h-4' />
                <p className='max-md:hidden'>{link.name}</p>
                <span className={`w-1 h-8 rounded-l right-0 absolute ${isActive && "bg-primary"}`} />
              </>
            )}

          </NavLink>
        ))}
      </div>

    </div>
  )
}

export default AdminSidebar