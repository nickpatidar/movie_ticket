import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormate';

const Dashboard = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);

  const DashboardCards = [
    { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon},
    { title: "Total Revenue", value: currency + dashboardData.totalRevenue || "0", icon: CircleDollarSignIcon},
    { title: "Active Shows", value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon},
    { title: "Total Users", value: dashboardData.totalUser || "0", icon: UserIcon}
  ]

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
    setLoading(false);
  }

  useEffect(()=>{
    fetchDashboardData();
  },[])

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className='relative flex flex-wrap gap-3 mt-4'>
        <BlurCircle top='-100px' left='0' />
        <div className='flex flex-wrap gap-3 w-full'>
          {DashboardCards.map((card, index) => (
            <div key={index} className='flex items-center justify-between px-3 py-2 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full'>
              <div>
                <h1 className='text-sm'>{card.title}</h1>
                <p className='text-lg font-medium mt-1'>{card.value}</p>
              </div>
              <card.icon className='w-4 h-4' />
            </div>
          ))}
        </div>
      </div>
      <p className='mt-7 text-lg font-medium'>Active Shows</p>

      <div className='relative flex flex-wrap gap-4 mt-3 max-w-5xl'>
        <BlurCircle top='100px' left='-10%' />
        {dashboardData.activeShows.map((show)=>(
          <div key={show._id} className='w-45 rounded-lg overflow-hidden h-full pb-2 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300 '>
            <img src={show.movie.poster_path} alt="" className='h-45 w-full object-cover' />
            <p className='font-medium p-2 truncate'>{show.movie.title}</p>
            <div className='flex items-center justify-between px-1.5'>
              <p className='text-lg font-medium'>{currency} {show.showPrice}</p>
              <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                <StarIcon className='w-3 h-3 text-primary fill-primary' />
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className='px-1.5 pt-1.5 text-sm text-gray-400'>{dateFormat(show.showDateTime)}</p>
          </div>
        ))}
      </div>
    </>
  ) : <Loading />
}

export default Dashboard