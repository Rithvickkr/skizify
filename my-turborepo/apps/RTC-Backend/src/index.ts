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
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["*"], // Allow all headers for better mobile compatibility
  },
  pingTimeout: 20000,      // Reduced ping timeout for faster failure detection
  pingInterval: 10000,     // More frequent ping interval
  transports: ['websocket', 'polling'], // Keep both transport methods
  allowEIO3: true,
  connectTimeout: 5000,    // Connection timeout in ms
  // Add path for explicit WebSocket endpoint
  path: '/socket.io/',
  // Additional options for better mobile support
  cookie: false,           // Disable socket.io cookie
  serveClient: false,      // Don't serve client files
});

const userManager = new UserManager();

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});



io.on("connection", (socket: Socket) => {
  console.log("Connection Established");
  console.log("socket");

  const clientInfo = {
    id: socket.id,
    transport: socket.conn.transport.name,
    ip: socket.handshake.address,
    userAgent: socket.handshake.headers['user-agent'],
    query: socket.handshake.query, // Log query parameters
    timestamp: new Date().toISOString()
  };

  console.log("New connection:", clientInfo);

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

  socket.conn.on("upgrade", (transport) => {
    console.log("Transport upgraded:", transport.name);
  });

});



server.listen(3003, '0.0.0.0', () => {
  console.log("listening on *:3003");
});

