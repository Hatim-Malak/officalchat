import  Sidebar  from '../components/Sidebar.jsx'
import React from 'react'
import ChatContainer from '../components/ChatContainer.jsx'
import Navbar from "../components/Navbar.jsx"
import NoChatSelected from '../components/NoChatSelected.jsx'
import { useChatStore } from '../store/useChatStore.js'

const HomePage = () => {
  const {selectedUser} = useChatStore()
  return (
    <div className='min-h-screen'>
      <Navbar/>
      <div className='h-full lg:h-[557px] w-full bg-purple-800 flex justify-center items-center'>
        <div className='bg-white h-[680px] lg:h-[530px] w-[380px] lg:w-[900px] rounded-lg shadow flex'>
          <div className='w-1/5 lg:w-1/3 bg-purple-900 rounded-bl-lg rounded-tl-lg p-2 flex justify-center items-center flex-col gap-2'>
            <div className='flex justify-start w-[20px] lg:w-[272px] gap-2'>
              <img src="/contact.svg" alt="contact" className='w-[25px]' />
              <h2 className='text-lg font-medium text-white hidden lg:block'>Contacts</h2>
            </div>
            <Sidebar/>
          </div>
          <div className='w-4/5 lg:w-2/3'>
            {selectedUser?<ChatContainer/>:<NoChatSelected/>}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default HomePage