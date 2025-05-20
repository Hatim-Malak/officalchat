import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useAuthstore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom'


const ChatHeader = () => {
    const {selectedUser,setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthstore()

  return (
    <div className='w-full flex bg-purple-900 justify-between items-center pt-2 px-1 pb-1.5 rounded-tr-lg'>
      <div className='flex gap-2 items-start justify-center'>
        <div className='w-[40px] h-[40px] rounded-full border border-black'>
          <img src={selectedUser.profilePic||"/officalchat.png"} alt="image" className='object-cover w-full h-full rounded-full' />
        </div>
        <div>
          <h2 className='text-md font-medium text-white'>{selectedUser.fullName}</h2>
          <h3 className='text-sm font-medium text-gray-500'>{onlineUsers.includes(selectedUser._id)?"Online":"Offline"}</h3>
        </div>
      </div>
      <div>
        <Link onClick={()=>setSelectedUser(null)} className='flex items-center justify-center mr-3'>
          <img src="/cross.svg" alt="cross" className='w-[30px]' />
        </Link>  
      </div>  
    </div>
  )
}

export default ChatHeader
