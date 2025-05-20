import React from 'react'

const NoChatSelected = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
        <div className='p-2 bg-purple-900 rounded-lg'>
            <img src="/account.svg" alt="account" className='w-[25px]' />
        </div>
        <h1 className='text-xl font-bold'>Welcome to OfficalChat</h1>
        <div className='flex justify-center items-center'>
          <p className='text-sm font-medium text-gray-500 w-[280px] lg:w-full  break-words overflow-x-hidden'>Select a conversation from sidebar to start</p>
        </div>
    </div>
  )
}

export default NoChatSelected