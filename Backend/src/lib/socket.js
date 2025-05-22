import { Server } from "socket.io"

const userSocketMap = {}; // Stores online users
let io; // Will hold the initialized socket.io instance

// Initialize socket.io with the server from index.js
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);

        const userId = socket.handshake.query.userId;
        if (userId) userSocketMap[userId] = socket.id;

        io.emit("getOnlineUsers", Object.keys(userSocketMap));

        socket.on("disconnected", () => {
            console.log("A user disconnected", socket.id);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });
};

// Function to get a receiver's socket ID
export const getRecieverSocketId = (userId) => {
    return userSocketMap[userId];
};

export { io };
