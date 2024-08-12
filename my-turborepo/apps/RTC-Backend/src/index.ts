import { Socket } from "socket.io";
import http from "http";

import { Server } from "socket.io";
import { UserManager } from "./managers/UserManager";

const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  connectionStateRecovery: {}
});

const userManager = new UserManager();

io.on("connection", (socket: Socket) => {
  console.log("Connection Established");
  console.log("socket");
  socket.on(
    "sessiondetails",
    ({ userId, meetingId }: { userId: string; meetingId: string }) => {
      console.log("we are creating room");
      console.log("User Joined the RoomId", meetingId);
      userManager.createRoom(userId, meetingId, socket);
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
