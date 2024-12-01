import React, { useState, useEffect } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { NavLink, useNavigate } from 'react-router-dom'
const locations = [
    "24B, Near Mahavir Mandir, Patna",
    "Anand Software Solutions, Exhibition Road, Patna",
    "Kankarbagh Main Road, Near Panchsheel Nagar, Patna",
    "Rajendra Nagar Terminal, Patna",
    "Boring Road Crossing, Opposite P&M Mall, Patna",
    "Dak Bunglow Road, Above Vishal Mega Mart, Patna",
  ];

  
  
  
  
function LocationSearchPanel({showPanel, showVehiclepanel, setShowvehiclepanel}) {
  const [showConfirmride, setShowconfirmride]= useState(false)
  useEffect(()=>{
    setShowvehiclepanel(false)
  },[])
  return (
    <div className={`w-full overflow-y-hidden h-[80%] flex flex-col  mt-5 ${!showPanel ? 'hidden' : 'flex'} md:w-[50%] md:mx-auto overflow-y-auto`}>

        {
            locations.map((area, index) =>{
                return <div onClick={() => setShowvehiclepanel(!showVehiclepanel)} key={index} className=' mt-3 px-5 py-3 rounded-xl border-2 border-gray-200 flex  justify-between active:border-black cursor-pointer'>
                <div className='w-12 h-12 bg-gray-200 rounded-full px-2 py-2 mt-1 mr-2 '>
                <FaLocationDot size={32} className=' text-black '/>
                </div>
                <h2 className='text-lg line-clamp-2 font-semibold '>{area}</h2>
        </div>

            })
        }      

       

        <div className={`w-full duration-[1s] ${showVehiclepanel ? 'h-[0%]' : 'h-[45%] opacity-[100]'} overflow-y-auto ${showPanel ? '' : ''} bg-white absolute bottom-0 right-0 px-3`}>

        <div onClick={() => setShowvehiclepanel(!showVehiclepanel )} className={`cursor-pointer  absolute font-extrabold   right-4 top-2 z-10  ${!showVehiclepanel ? 'h-[11px] w-[45px] bg-black rounded-xl' : 'hidden'}  `}> </div>
        
        {/* cab details */}

        <div onClick={()=>setShowconfirmride(true)} className='w-full min-h-[25vw] border-2 border-black mt-8 mb-[-14px] rounded-lg flex'>
          <div className='w-[25%] minh-full '>
            <img src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_470,w_835/v1597151200/assets/35/7f12f6-b38b-403d-b3ee-84c6c7a3d080/original/Taxi_Yellow.jpg' alt='car_img' className='w-full h-full object-cover rounded-lg ml-1' />
          </div>
          <div className='w-[60%] min-h-full px-4 py-2'>
            <h1 className='text-xl font-bold '>Caber Car 🤵4</h1>
            <p className='text-lg font-semibold '>2 mins away</p>
            <p className='text-sm font-bold '>Affordable compact rides</p>
          </div>
          <div className='w-[15%] min-h-full  text-xl font-extrabold flex justify-center items-center pr-2'> ₹ 120</div>
        </div>

        <div onClick={()=>setShowconfirmride(true)} className='w-full min-h-[25vw] border-2 border-black mt-8 mb-[-14px] rounded-lg flex'>
          <div className='w-[25%] minh-full '>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5y7u7U4ugNewslRbltKGAppz7k9K8wcqEug&s' alt='car_img' className='w-full h-full object-cover rounded-lg ml-1' />
          </div>
          <div className='w-[60%] min-h-full px-4 py-2'>
            <h1 className='text-xl font-bold '>Caber Moto 🤵1</h1>
            <p className='text-lg font-semibold '>4 mins away</p>
            <p className='text-sm font-bold '>Affordable motorbike rides</p>
          </div>
          <div className='w-[20%] min-h-full  text-xl font-extrabold flex justify-center items-center pr-2'> ₹ 80.50</div>
        </div>

        <div onClick={()=>setShowconfirmride(true)} className='w-full min-h-[25vw] border-2 border-black mt-8 mb-[-14px] rounded-lg flex'>
          <div className='w-[25%] minh-full '>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQziHR78tOhPnxa0o8WeheGGWmd2f0eF9rHOw&s' alt='car_img' className='w-full h-full object-cover rounded-lg ml-1 bg-white' />
          </div>
          <div className='w-[60%] min-h-full px-4 py-2'>
            <h1 className='text-xl font-bold '>Caber Auto 🤵3</h1>
            <p className='text-lg font-semibold '>3 mins away</p>
            <p className='text-sm font-bold '>Affordable auto rides</p>
          </div>
          <div className='w-[20%] min-h-full  text-xl font-extrabold flex justify-center items-center pr-2'> ₹ 80.50</div>
        </div>

          {/* show confirm ride dialog slide */}
        <div className={`w-full duration-[2s] ${showConfirmride ? 'h-[80%]' : 'h-[0%] hidden'}   bg-violet-100 absolute bottom-0 right-0 px-3 p-4`} >
        <div onClick={() => setShowconfirmride(false )} className={`cursor-pointer  absolute font-extrabold   right-4 top-2 z-10  ${!showVehiclepanel ? 'h-[8px] w-[25px] bg-black rounded-xl' : 'hidden'} `}>
       </div>
          <h1 className='text-center text-2xl font-bold'>Confirm your ride</h1>
          <div className='flex flex-col gap-2 border-b-2 border-gray-200'>
            <div className='border-b-2 border-gray-400 mb-5'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmC2LKDCfnwm4VG55N2To5nGQ3AmXQh4NQPw&s' alt='image_vehicle' className='w-[33vw] h-[33vw] ml-auto mr-auto' />
              <h1 className='text-center text-sm font-bold'>Kankarbagh Main Road, Near Panchsheel Nagar, Patna</h1>
              <h1 className='text-center text-xl font-bold'>₹ 80.50</h1>
              
            </div>
          </div>
          <NavLink to='/user/riding' className='min-w-[150vw]  px-32 ml-5   py-4  text-2xl text-white rounded-xl font-bold bg-green-700'>Confirm</NavLink>
        </div>
        

        
        </div>
    </div>
  )
}

export default LocationSearchPanel
