import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useChatStore } from '../store/useChatStore.js'

const Chatend = () => {
    const [text,setext] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)
    const {sendMessage} = useChatStore()
    const handleImage = (e) =>{
        const file = e.target.files[0]
        if(!file) return;

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async()=>{
            const base64Image = reader.result;
            setImagePreview(base64Image)
        }
    }
    const removeImage = () =>{
        setImagePreview(null)
    }
    const handleSendMessage=async(e)=>{
        e.preventDefault();
        if(!text.trim() && !imagePreview) return;
        try {
            await sendMessage({
                text:text.trim(),
                image:imagePreview
            })
            setext("")
            setImagePreview(null)
            if(fileInputRef.current) fileInputRef.current.value = ""
        } catch (error) {
            console.log("Failed to send message",error)
        }
    }
  return (
    <div className='w-full h-[100px] flex flex-col justify-end px-1'>
        {imagePreview&&(
            <div className='flex relative lg:ml-8 ml-2'>
                <div className='h-[50px] w-[50px] border border-black'>
                    <img src={imagePreview} alt="image" className='w-full h-full object-cover' />
                </div>
                <button className='rounded-full p-1 bg-gray-500 absolute  left-[40px] bottom-[35px] w-[20px] h-[20px] ' onClick={removeImage}>
                    <img src="/cross.svg" alt="cross" className='w-[10px] '/>
                </button>
            </div>
        )}
        
            <form onSubmit={handleSendMessage} className='w-full h-[50px] flex justify-center gap-4 items-center'>        
                <input type="text" value={text} onChange={(e)=>setext(e.target.value)} className='w-[450px] py-1.5 px-2 border-2 border-purple-900 rounded-lg' placeholder='Type a message..' />
                <div className='flex gap-2'>
                    <label htmlFor="img-upload" className='cursor-pointer p-2 rounded-full bg-purple-900'>
                        <img src="/image.svg" alt="image" className='lg:w-[20px] w-[60px]' />
                        <input type="file" id='img-upload' ref={fileInputRef} accept='image/*' className='hidden' onChange={handleImage} />
                    </label>
                    <button className='p-2 rounded-full bg-purple-900' disabled={!text.trim()&&!imagePreview}>
                        <img src="/send.svg" alt="send" className='lg:w-[20px] w-[60px]' />
                    </button>
                </div>
            </form>
        
    </div> 
  )
}

export default Chatend