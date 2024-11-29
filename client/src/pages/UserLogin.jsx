import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { UserContext } from '../context/UserContext.jsx'

function UserLogin() {
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)

  const [showPassword, setShowpassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUserlogin = async(event) =>{
    
      event.preventDefault()
      try {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,{email:email,password:password}, {withCredentials:true})
        if (response.data?.success) {
          
          toast.success(response.data.message);
          setUser(response.data.userAvailable)
          setLoading(false)
          localStorage.setItem('token', response.data.token)
          setEmail('')
          setPassword('')
          navigate('/user/home')

        } else {
          toast.error(response.data.message);
          setLoading(false)
        }
        
        
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      
      
  }
  return (
    <div className='px-4 flex flex-col  gap-2 md:w-[40%] md:mx-auto '>
      <div>
      <h1 className='absolute top-2 left-2 text-black text-2xl font-extrabold border-2  bg-white px-2 py-1 rounded '>Caber</h1>
      <form className='mt-20 py-4 ' onSubmit={(event) => handleUserlogin(event)}>
      <h1 className='text-violet-700  font-bold mb-5 text-2xl py-1 animate-bounce duration-[5s]'>Welcome User</h1>
        <label htmlFor='email' className='text-black text-2xl font-bold' >Your email </label>
        <input type='email' value={email} name='email' id='email' placeholder='Registered email' className='bg-zinc-50 rounded-lg font-bold outline-none border-2 w-full py-3 px-3 mt-2 text-xl border-zinc-700 mb-8' onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor='password' className='text-black text-2xl font-bold ' >Your password </label>
        <input type={showPassword ? 'text' : 'password'} name='password' id='password' placeholder='Registered password' className='bg-zinc-50 rounded-lg font-bold outline-none border-2 w-full py-3 px-3 mt-2 text-xl border-zinc-700' value={password} onChange={(event) => setPassword(event.target.value)} />
        <p className='text-end text-xl font-bold cursor-pointer ' onClick={() => setShowpassword(!showPassword)}>{showPassword ? 'Hide password' : 'show password'}</p>
        <p className={`font-bold ${!loading ? 'hidden' :'opacity-0'} text-blue-500 `} > loading.....</p>
        <button className='w-full rounded-sm mt-5 font-bold text-2xl bg-black text-white py-3'>Login</button>
      </form>
    <h2 className='text-xl font-bold text-end'>new here ? <NavLink to='/user/signup' className=' text-violet-700 '>SignUp/create account</NavLink> </h2>
      </div>

      <NavLink to='/captain/login' className='absolute bottom-2 flex justify-center items-center left-0 w-full px-2 py-4  text-2xl rounded-sm font-bold bg-violet-400'>Sign In as Captain</NavLink>
    </div>
  )
}

export default UserLogin
