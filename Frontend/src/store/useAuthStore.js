import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import { toast } from "react-hot-toast"
import {io} from "socket.io-client"

const Base_url = import.meta.env.MODE ==="development"? 'http://localhost:5001/api':"/"

export const useAuthstore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLogingIn:false,
    updatingProfile:false,
    onlineUsers:[],
    isCheckingAuth:true,
    socket:null,

    checkAuth : async() =>{
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser:res.data})
            get().connectSocket()  
        } catch (error) {
            console.log("error in checkAuth ",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("Account created successfully")
            get().connectSocket()  
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    login:async(data)=>{
        set({isLogingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser:res.data})
            toast.success("Logged In successfully")
            get().connectSocket()           
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isLogingIn:false})
        }
    },

    updateProfile:async(data)=>{
        set({updatingProfile:true})
        try {
            const res = await axiosInstance.put("/auth/updateProfile",data)
            set({authUser:res.data})
            toast.success("Profile Uploaded Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({updatingProfile:false})
        }
    },
    connectSocket:()=>{
        const {authUser} = get()
        if(!authUser||get().socket?.connected) return;

        const socket = io(Base_url,{
            query:{
                userId:authUser._id,
            }
        })
        socket.connect()
        set({socket:socket})
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })

    },
    disconnectSocket:()=>{
        if (get().socket?.connected) get().scoket?.disconnected
    }
}))