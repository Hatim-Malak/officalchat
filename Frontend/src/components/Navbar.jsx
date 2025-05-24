import React from 'react'
import {useAuthstore} from "../store/useAuthStore.js"
import { Link } from 'react-router-dom'


const Navbar = () => {
  const {logout,authUser} = useAuthstore()
  return (
    <div className='flex bg-purple-800 text-white items-center justify-between pr-5 pl-3 h-[50px] w-screen lg:w-full'>
      <div>
        <img src="officalchat_logo.svg" alt="logo" className='w-[140px]' />
      </div>
      <div className='flex gap-4'>
        {authUser&&(
          <>
            <div className="flex gap-1.5 bg-purple-900 px-1.5 py-1 rounded-xl pr-2 ">
              <Link to={"/profile"} className='flex hover:text-black items-center justify-center gap-1'>
                <img src="/profile.svg" alt="pf" className=' w-[27px]' />
                <h2 className='hidden lg:block'>Profile</h2>
              </Link>
            </div>
            <div className="flex gap-1.5 bg-purple-900  px-1.5 py-1 rounded-xl pr-2">
              <button onClick={logout} className='flex hover:text-black flex items-center justify-center gap-1'>
                <img src="/logout.svg" alt="lg" className='w-[29px]' />
                <h2 className='hidden lg:block' >Logout</h2>
              </button>
            </div>
        </>
        )}
        <div className="flex gap-1.5 bg-purple-900  px-1.5 py-1 rounded-xl pr-2">
          <Link to={"/About"} className='flex hover:text-black items-center justify-center gap-1'>
            <img src="/About.svg" alt="About" className='w-[25px]' />
            <h2 className='hidden lg:block'>About us</h2>
          </Link>
        </div>
      </div>
    </div>
    
  )
}

export default Navbar