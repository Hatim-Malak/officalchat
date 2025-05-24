import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthstore } from '../store/useAuthStore.js'
import { Loader2 } from 'lucide-react';
import { toast } from "react-hot-toast"
import Navbar from "../components/Navbar.jsx"

const SignupPage = () => {
  const [showPassword,setshowPassword] = useState(false)
  const [formData,setformData] = useState({
    fullName:"",
    email:"",
    password:""
  })
  const signup = useAuthstore(state => state.signup);
  const isSigningUp = useAuthstore(state => state.isSigningUp);
  const validateForm = () =>{
    if(!formData.fullName.trim()) return toast.error("FullName is required")
    if(!formData.email.trim()) return toast.error("Email is required")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email Format")
    if(!formData.password.trim()) return toast.error("password is required")
    if(formData.password.length<6) return toast.error("Password must be at least of 6 characters")
    return true;
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const success = validateForm()
    if(success===true) signup(formData)
  }
  return (
    <div>
    <Navbar/>
    <div className='flex bg-purple-900 min-h-screen lg:h-[557px] w-full items-center justify-center'>
      <div className=' text-white w-full lg:w-3/5 h-full flex flex-col items-center justify-center'>
        <div className=' flex flex-col bg-white rounded-xl h-[430px] w-[390px] justify-around items-center border-2 border-purple-900 shadow '>
          <div className='flex flex-col items-center'>
            <img src="/account.svg" alt="account" />
            <h1 className=' text-purple-900 font-extrabold text-2xl'>Create Account</h1>
            <p className='text-gray-500'>get started with your free account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3'>
              <div className=' text-black flex flex-col gap-1'>
                <h2 className=' font-bold'>FullName</h2>
                <div className='flex relative'>
                  <img className='absolute left-1.5 top-1 w-[28px]' src="/user.svg" alt="user" />
                  <input type="text" value={formData.fullName} onChange={(e)=>setformData({...formData,fullName:e.target.value})} placeholder='Ex:-john Doe' className=' border-2 border-purple-900 text-black rounded-sm py-1 pr-4 pl-10' />
                </div>
              </div>
              <div className=' text-black flex flex-col gap-1'>
                <h2 className=' font-bold'>email</h2>
                <div className='flex relative'>
                  <img className='absolute left-1 w-[33px] top-0.5' src="/email.svg" alt="email" />
                  <input type="email" value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})}  placeholder='Ex:-xyz@gmail.com' className=' border-2 border-purple-900 text-black  rounded-sm py-1 pr-4 pl-10' />
                </div>
              </div>
              <div className=' text-black flex flex-col gap-1'>
                <h2 className=' font-bold'>password</h2>
                <div className=' flex relative '>
                  <img className='absolute left-1 w-[28px] top-1' src="/password.svg" alt="password" />
                  <input type={showPassword?"text":"password"} value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})} placeholder='Ex:-4987499' className=' border-2 border-purple-900 text-black  rounded-sm py-1 pr-10 pl-10 w-[240px]'/>
                  <button className='absolute right-3 top-1.5' type='button' onClick={() => setshowPassword(prev => !prev)}>{!showPassword?<img src="/showpassword.svg" alt="show" />:<img src="/dontshowpassword.svg" alt="unshow" />}</button>
                </div>
              </div>
              <button type='submit' disabled={isSigningUp} className=' bg-purple-900 text-white px-4 py-2 rounded-md border-2 hover:border-black flex items-center justify-center gap-2 min-h-[44px]'>
                {isSigningUp?(
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Loading...
                  </>

                ):(
                  "Create Account"
                )
                }
              </button>
            </div>
          </form>
        </div>
        <div className='flex'>
          <p className='text-white'>Already have an account?</p>
          <Link to="/login" className='link link-primary'>Sign in</Link>
        </div>
      </div>
      <div className=' w-2/5 h-full hidden lg:block'>
        <img src="/officalchat.png" alt="image" className=' w-full h-full ' />
      </div>
    </div>
    </div>  
  )
}

export default SignupPage