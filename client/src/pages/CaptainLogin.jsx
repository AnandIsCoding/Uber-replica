import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'

function CaptainLogin() {
    const [showPassword, setShowpassword] = useState(false)
    const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const user = {
    email:email,
    password:password
  }
  const handleCaptainlogin = async(event) =>{
      event.preventDefault()
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, user , {withCredentials: true})
        if(response.data?.success){
          toast.success(response.data.message)
          setEmail('')
          setPassword('')
          navigate('/captain/home')
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error('Failed to login server error')
        console.log('captain login arror => ', error)
      }
      
      
  }
  return (
    <div className='px-4 flex flex-col  gap-2 md:w-[40%] md:mx-auto'>
    <div>
    <h1 className='absolute top-2 left-2 text-black text-2xl font-extrabold border-2  bg-white px-2 py-1 rounded '>Caber</h1>
    <form onSubmit={(event) => handleCaptainlogin(event)} className='mt-20 py-4 ' >
    <h1 className='text-violet-700  font-bold mb-5 text-2xl py-1 animate-bounce duration-[5s]'>Welcome Captain</h1>
      <label htmlFor='email' className='text-black text-2xl font-bold' >Your email </label>
      <input type='email' name='email' id='email' placeholder='Registered email' className='bg-zinc-50 rounded-lg font-bold outline-none border-2 w-full py-3 px-3 mt-2 text-xl border-zinc-700 mb-8' value={email} onChange={(event) => setEmail(event.target.value)} />

      <label htmlFor='password' autoComplete='true' className='text-black text-2xl font-bold ' >Your password </label>
      <input type={showPassword ? 'text' : 'password'} name='password' id='password' placeholder='Registered password' className='bg-zinc-50 rounded-lg font-bold outline-none border-2 w-full py-3 px-3 mt-2 text-xl border-zinc-700' value={password} onChange={(event) => setPassword(event.target.value)} />
      <p className='text-end text-xl font-bold cursor-pointer ' onClick={() => setShowpassword(!showPassword)}>{showPassword ? 'Hide password' : 'show password'}</p>

      <button className='w-full rounded-sm mt-5 font-bold text-2xl bg-black text-white py-3'>Login</button>
    </form>
  <h2 className='text-xl font-bold text-end'>new here ? <NavLink to='/captain/signup' className=' text-violet-700 '>SignUp/create account</NavLink> </h2>
    </div>

    <NavLink to='/user/login' className='absolute bottom-2 flex justify-center items-center left-0 w-full px-2 py-4  text-2xl rounded-sm font-bold bg-violet-400'>Sign In as User</NavLink>
  </div>
  )
}

export default CaptainLogin
