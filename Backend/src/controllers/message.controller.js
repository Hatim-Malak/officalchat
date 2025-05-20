import Message from "../Models/message.model.js";
import User from "../Models/user.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getRecieverSocketId,io } from "../lib/socket.js";

export const getUsersForSidebar = async(req,res) =>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("error in getUsersForSidebar",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getMessages =async(req,res) =>{
    try {
        const {id:userToChatId} = req.params
        const senderId = req.user._id

        const message = await Message.find({
            $or:[
                {senderId:senderId,recieverId:userToChatId},
                {senderId:userToChatId,recieverId:senderId}
            ]
        })
        res.status(200).json(message)
    } catch (error) {
        console.log("error in getMessage controller ",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessages = async(req,res) =>{
    try {
        const {text,image} = req.body;
        const {id:recieverId} = req.params
        const senderId = req.user._id
        
        let imageUrl
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        const recieverSocketId  = getRecieverSocketId(recieverId)
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage controller ",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}