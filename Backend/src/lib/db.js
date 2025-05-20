import mongoose from "mongoose"

export const connectdb = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error;",error)
    }
}