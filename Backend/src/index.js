import express from "express"
import dotenv from "dotenv"
import authRoutes from "./Routes/auth.route.js"
import messageRoutes from "./Routes/message.route.js"
import { connectdb } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { server, app } from "./lib/socket.js"

import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const PORT = process.env.PORT 

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true, limit: '5mb' }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// ✅ Only your real API routes
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    console.log("Server is running on port", PORT)
    connectdb()
})
