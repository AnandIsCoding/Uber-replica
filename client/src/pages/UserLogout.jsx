import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserLogout() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.delete(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.data.success){
            console.log(response.data)
            toast.success(response.data.message)
            localStorage.removeItem('token')
            navigate('/')
        }
    }).catch((error)=>{
        console.log(error)
    })
  return (
    <div>
      Log out
    </div>
  )
}

export default UserLogout
