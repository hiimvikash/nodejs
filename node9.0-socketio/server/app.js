import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});


io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  socket.emit("welcome", `Welcome to WS with socket ID : ${socket.id}`);
  socket.broadcast.emit("welcome", `${socket.id} Joined the server`);
  

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });
  
  
  socket.on("message", ({message, room})=>{
    // console.log(data);
    //  socket.emit("receive-message", message); // this will be sent to sender only.
    // io.emit("receive-message", message); // this will be sent to all the sockets connected to circuit
    socket.broadcast.emit("receive-message", message); // this will be sent to all the socket except itself
    
    // io.to(room).emit("receive-message", message);
  })
  
  socket.on("disconnect", () => {
    console.log("User Disconnected from browser", socket.id);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});