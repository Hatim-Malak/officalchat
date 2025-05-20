import React, { useEffect,useRef } from 'react'
import { useAuthstore } from '../store/useAuthStore.js'
import { useChatStore } from '../store/useChatStore.js'
import { Loader2 } from 'lucide-react'
import ChatHeader from './ChatHeader.jsx'
import Chatend from './Chatend.jsx'

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeTomessage,
    unsubscribeFromMessages
  } = useChatStore()
  const { authUser } = useAuthstore()

  const scrollRef = useRef(null)

  useEffect(() => {
      getMessages(selectedUser._id)
      subscribeTomessage();
      return ()=>unsubscribeFromMessages();
  }, [selectedUser._id , getMessages,subscribeTomessage,unsubscribeFromMessages])

  useEffect(() => {
    if (scrollRef.current&&messages) {
      scrollRef.current.scrollIntoView({behavior:"smooth"})
    }
  }, [messages])

  if (isMessagesLoading) {
    return (
      <div className='w-full h-full p-2 flex justify-center items-center'>
        <Loader2 className='w-[50px] h-[50px] animate-spin' />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-1'>
      <ChatHeader />
      <div className="flex flex-col w-full h-[630px] lg:h-[360px] gap-2 overflow-auto px-2">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id
          const profilePic = isSender
            ? authUser.profilePic || "/officalchat.png"
            : selectedUser?.profilePic || "/officalchat.png"

          return (
            <div key={message._id} className={`flex flex-col w-full`} ref={scrollRef}>
              <div className={`text-gray-500 text-sm ${isSender ? 'ml-auto mr-[50px]' : 'ml-[50px]'}`}>
                <time>
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </time>
              </div>
              <div className={`flex gap-2 items-start ${isSender ? 'justify-end' : 'justify-start'}`}>
                {!isSender && (
                  <img
                    src={profilePic}
                    alt="profile"
                    className='size-10 rounded-full border-2 border-black'
                  />
                )}
                <div className='flex flex-col gap-2 justify-center items-center bg-purple-900 text-white p-2 rounded-lg max-w-[200px] break-words overflow-x-hidden'>
                  {message.image&&(
                    <img src={message.image} alt="image" className='size-[200px] rounded-lg border border-black' />
                  )}
                  
                  
                  {message.text&&<p>{message.text}</p>}
                </div>
                {isSender && (
                  <img
                    src={profilePic}
                    alt="profile"
                    className='size-10 rounded-full border-2 border-black'
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
      <Chatend />
    </div>
  )
}

export default ChatContainer
