{messages.map((message)=>{
    return (
    <div
      key={message._id}
      className={`flex flex-col border border-black ${message.senderId === authUser._id?"items-center justify-center":"chat-start"}`}>
      <div className='flex'>
        <div className='chat-header mb-1'>
          <time className="text-xs opacity-50 ml-1">
            c
          </time>
        </div>
        <div className='h-10 w-10 rounded-full border-2 border-black '>
          <img className='w-full h-full object-cover rounded-full' src={message.senderId===authUser._id?authUser.profilePic || "/officalchat.png":selectedUser.profilePic||"/officalchat.png"} alt="profile pic" />
        </div>              
        <div className="">
          {message.text}
        </div>
      </div>
    </div>
    )
  })}
