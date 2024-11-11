import { Socket } from "socket.io";
import http, { createServer } from "http";
import express from "express";
import cors from "cors";


import { Server } from "socket.io";
import { UserManager } from "./managers/UserManager";


const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

//middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {}

});

const userManager = new UserManager();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});



io.on("connection", (socket: Socket) => {
  console.log("Connection Established");
  console.log("socket");


  socket.emit('debug', {
    message: 'Connected successfully',
    socketId: socket.id,
    transport: socket.conn.transport.name
  });

  socket.on(
    "sessiondetails",
    ({ userId, meetingId }: { userId: string; meetingId: string }) => {
      console.log("we are creating room");
      console.log("User Joined the RoomId", meetingId);
      userManager.createRoom(userId, meetingId, socket ,io);
      socket.on("disconnect", () => {
        console.log("user disconnected");
        userManager.removeUser(meetingId, userId);
      });
    }
  );


});



server.listen(3003, () => {
  console.log("listening on *:3003");
});

