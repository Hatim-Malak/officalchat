import User from "../Models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokens } from "../lib/util.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req,res) =>{
    const {email,fullName,password} = req.body
    try {
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least of 6 characters"})
        }
        const user = await User.findOne({email})

        if(user) return res.status(400).json({message:"Email already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedpassword
        })

        if(newUser){
            generateTokens(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const login = async(req,res) =>{
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({message:"Invalid credentials"})

        const isPassword = await bcrypt.compare(password,user.password)
        if(!isPassword) return res.status(400).json({message:"Invalid credentials"})

        generateTokens(user._id,res)
        res.status(200).json({
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log("error in login controller ",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logout = async(req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out succesfully"})
    } catch (error) {
        console.log("Error in logout controller ",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfile = async(req,res) =>{
    try {
        const {profilePic} = req.body
        const userId = req.user._id
        if(!profilePic){
            return res.status(400).json({message:"ProfilePic is required"})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in updateProfile controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkAuth controller",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}