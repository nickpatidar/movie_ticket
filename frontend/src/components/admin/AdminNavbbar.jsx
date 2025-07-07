import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbbar = () => {
    return (
        <div className='flex items-center justify-between px-4 md:px-7 h-12 border-b border-gray-300/30'>
            <Link to='/'>
                <img src={assets.logo} alt="logo" />
            </Link>
        </div>
    )
}

export default AdminNavbbar