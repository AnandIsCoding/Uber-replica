import React, { useState } from 'react'
import LocationSearchPanel from '../components/LocationSearchPanel'

function UserHomePage() {
  const [showPanel, setShowPanel] = useState(false)
  const [showVehiclepanel, setShowvehiclepanel] = useState(false)
  const handleInputclick = () =>{
    setShowPanel(true)
    
  }
  return (
    <div>
     <div className='w-full h-screen bg-green-400 md:w-[50%] md:mx-auto'>
     {/* <h1 className='absolute top-2 left-2 text-black text-2xl font-extrabold border-2  bg-white px-2 py-1 rounded opacity-30 '>Caber</h1> */}
       <img src='https://preview.redd.it/retro-car-gif-v0-dcb1jychiq2d1.gif?width=498&auto=webp&s=74c2d9f0ad033e2a048c5a7e20cbe1b4c8abd6f0' alt='map' className='w-full h-full object-cover' />
     </div>

     <div className={`duration-[1s] ease-in-out absolute w-full bottom-0 ${showPanel ? 'h-[100%]' : 'h-[25%]'}  bg-white px-5 py-3 md:w-[50%] md:mx-auto md:ml-[25%]`}>
        <h1 className='text-3xl font-bold '>Find a trip</h1>
        
        <form>
        
        <div onClick={() => setShowPanel(false)} className={`cursor-pointer duration-[20s] rounded-lg  absolute font-extrabold w-[50px]  bg-black  right-4 top-6 ${showPanel ? 'h-[8px]' : 'hidden'} `}> </div>
          <input type='text' placeholder='Your pick up location' className='text-xl font-semibold w-full rounded-md py-2 px-2  outline-none bg-transparent border-2 border-zinc-900 mt-5' onClick={handleInputclick }/>
          <input type='text' placeholder='Your destination' className='text-xl font-semibold w-full rounded-md py-2 px-2  outline-none bg-transparent border-2 border-zinc-900 mt-5' onClick={handleInputclick }/>        </form>
        
        <LocationSearchPanel showPanel={showPanel} showVehiclepanel={showVehiclepanel} setShowvehiclepanel={setShowvehiclepanel} />
     </div>
    </div>
  )
}

export default UserHomePage
