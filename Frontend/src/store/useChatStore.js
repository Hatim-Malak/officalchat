import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios.js"
import { persist } from 'zustand/middleware'
import { useAuthstore } from "./useAuthStore.js"

export const useChatStore = create((set,get)=>({
    messages: [], 
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get("/message/users")
            set({users:res.data})

        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessage: async (data) => {
        const { selectedUser, messages } = get()
        if (!selectedUser?._id) return
        try {
          const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, data)
          set({messages:[...messages,res.data]});
        } catch (error) {
          toast.error(error?.response?.data?.message || "Failed to send message")
          throw error
        }
    },

    subscribeTomessage:()=>{
      const {selectedUser} = get()
      if(!selectedUser) return;
      const socket = useAuthstore.getState().socket

      socket.on("newMessage",(newMessage)=>{
        if(newMessage.senderId!==selectedUser._id) return;
        set({
          messages:[...get().messages,newMessage]
        })
      })
    },

    unsubscribeFromMessages:()=>{
      const socket = useAuthstore.getState().socket;
      socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))