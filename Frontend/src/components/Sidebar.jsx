import { Loader2 } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuthstore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'


const Sidebar = () => {
    const {getUsers,users,selectedUser,isUserLoading,setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthstore()
    // const [showOnlineOnly,setShowOnlineOnly] = useState(false)
    useEffect(() => {
      getUsers()
    
    }, [getUsers])

    // const filteredUser = showOnlineOnly?users.filter(user=> onlineUsers.includes(user._id)):users

    if(isUserLoading){
        return(
           <div className='w-[272px] h-[465px] p-2 flex justify-center items-center'>
               <Loader2 className='w-[50px] h-[50px] animate-spin'/>
           </div> 
        ) 
    }
    
  return (
    <div className=' w-[75px] lg:w-[272px] lg:h-[465px] h-[740px] p-2 overflow-auto'>
        {users.map((user)=>(
            <button className={`w-full flex relative gap-2 hover:bg-purple-800 p-2 ${selectedUser?._id === user._id ? "bg-purple-700":"hover:none"}`} key={user._id} onClick={()=>setSelectedUser(user)}>
                <div className='w-[40px] h-[40px] rounded-full border border-black'>
                    <img src={user.profilePic||"/officalchat.png"} alt={user.name} className='object-cover w-full h-full rounded-full' />
                </div>
                <div className={`size-3 rounded-full left-9 top-9 absolute ${onlineUsers.includes(user._id)?'bg-green-500':'bg-red-900'}`}></div>
                <div className='flex flex-col items-start justify-center relative hidden lg:block'>
                    <h2 className='text-md font-medium text-white'>{user.fullName}</h2>
                    <h3 className='text-sm font-medium text-gray-500 absolute '>{onlineUsers.includes(user._id)?"Online":"Offline"}</h3>
                </div>
            </button>
        ))}
    </div>
  )
}

export default Sidebar