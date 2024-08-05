import { Socket } from "socket.io";
import http from "http";

import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManager";

const server = http.createServer(http);

const io = new Server(server , {
  cors : {
    origin : "*"
  }
});

const userManager = new UserManager();

io.on('connection' , (socket : Socket) =>{
  console.log("Connection Established");
  userManager.createRoom('RandomName',socket);
  socket.on("disconnect", () =>{
    console.log("user disconnected");
    userManager.removeUser(socket.id);
  })
})

server.listen(3003, () => {
  console.log('listening on *:3003');
});