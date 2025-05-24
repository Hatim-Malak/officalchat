import React,{useState} from 'react'
import { useAuthstore } from '../store/useAuthStore'
import Navbar from "../components/Navbar.jsx"
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'


const ProfilePage = () => {
  const [selectImg,setSelectImg] = useState(null)
  const{authUser,updatingProfile,updateProfile}=useAuthstore()
  const handleImage = async(e) =>{
    const file = e.target.files[0]
    if(!file) return;

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async()=>{
      const base64Image = reader.result;
      setSelectImg(base64Image)
      await updateProfile({profilePic:base64Image})
    }
  }
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='bg-purple-900 min-h-screen lg:h-[557px] flex justify-center items-center relative'>
        <div className='flex flex-col bg-white rounded-xl h-[490px] w-[390px] justify-around items-center border-2 border-purple-900 shadow '>
          <div className='flex flex-col items-center justify-center pt-2'>
            <h1 className='font-bold text-2xl'>Profile</h1>
            <p className='text-bold text-gray-500 pb-2.5 font-medium'>Your profile information</p>
            <div className='flex relative'>
              <div className='border-[3.5px] border-purple-900 rounded-full h-[110px] w-[110px] '>
                <img src={selectImg||authUser.profilePic||"/officalchat.png"} alt="photo" className='h-full w-full object-cover rounded-full' />
              </div>
              <label htmlFor='avatar-upload' className='cursor-pointer bg-purple-900 rounded-full p-1 h-[40px] absolute left-[71px] top-[66px] border-2 border-purple-900 hover:border-black'>
                <img src="/camera.svg" disabled={updatingProfile} alt="camera" className='w-[30px] ' />
                <input
                  type="file"
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImage}
                  disabled={updatingProfile}
                 />
              </label>
            </div>
            <div className='text-gray-500 pt-2 font-medium'>{updatingProfile?(
              <>
                <div className='flex gap-2 items-center justify-center font-medium'>
                <Loader2 className='w-3 h-3 animate-spin'/>
                <span>uploading..</span>
                </div>
              </>
            ):(
              "click the camera icon to update the photo"
            )}</div>
          </div>
          <div>
          <div className='flex flex-col gap-2'>
              <div className=' text-black flex flex-col gap-1'>
                <h2 className=' font-bold'>FullName</h2>
                <div className='flex relative'>
                  <img className='absolute left-1.5 top-1 w-[28px]' src="/user.svg" alt="user" />
                  <input type="text" value={authUser.fullName} disabled={true} className=' border-2 border-purple-900 text-gray-500 rounded-sm py-1 pr-4 pl-10' />
                </div>
              </div>
              <div className=' text-black flex flex-col gap-1'>
                <h2 className=' font-bold'>email</h2>
                <div className='flex relative'>
                  <img className='absolute left-1 w-[33px] top-0.5' src="/email.svg" alt="email" />
                  <input type="email" value={authUser.email} disabled={true} className=' border-2 border-purple-900 text-gray-500  rounded-sm py-1 pr-4 pl-10' />
                </div>
              </div>
            </div>
          </div>
          <div className='w-[300px] p-3'>
            <h2 className='text-lg font-bold'>Account Information</h2>
            <div className='flex justify-between items-center p-2 font-medium'>
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className='border border-gray-500'></div>
            <div className='flex justify-between items-center p-2 font-medium'>
              <span>Account Status</span>
              <span className='text-green-500'>Active</span>
            </div>
          </div>
        </div>
        <Link className='absolute right-2 top-1' to="/">
          <img src="/cross.svg" alt="cross" className='w-[30px]' />
        </Link>
      </div>
    </div>
  )
}

export default ProfilePage