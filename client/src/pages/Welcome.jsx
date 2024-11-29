import React from 'react'
import { NavLink } from 'react-router-dom'
import UserLogin from './UserLogin'
function Welcome() {
  return (
    <div className='flex flex-col h-screen fixed'>
      <div className='min-w-[100vw] h-[79%]'>
        <img src='https://img.freepik.com/free-photo/red-traffic-light-pedestrians-with-countdown_23-2148139857.jpg?t=st=1732886489~exp=1732890089~hmac=bda541cb0e76cfebfdbaad43a68c247090379f893a233b0c19f37ceee58de3e5&w=360' alt='image_banner' className='w-full h-full object-cover md:w-[25%]' />
        <h1 className='absolute top-2 left-2 text-black text-2xl font-extrabold border-2 border-black bg-white px-2 py-1 rounded '>Caber</h1>
      </div>
      <div className='w-full  h-[21%] p-4'>
        <h1 className='text-2xl font-bold '>Get started with Caber</h1>
        <NavLink to='/user/login' className='flex justify-center items-center bg-black text-white py-3 text-2xl mt-4 rounded-md' >Continue</NavLink>
      </div>
    </div>
  )
}

export default Welcome
