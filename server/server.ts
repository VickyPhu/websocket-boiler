import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

let guestIndex = 1;
let handleLikes = 0;
// let handleMessages: string[] = [];

io.on("connection", (socket) => {
  console.log(`A user connected ` + socket.id);
//Visa tidiagre mess från arrayen.

  //Initaliaze user name
  socket.data.name = "Guest" + guestIndex++;
  socket.emit("updateLikes", handleLikes);

  socket.on("setUsername", (username) => {
    socket.data.name = username;
    socket.emit("message", `Welcome ${username}`);
  });

  socket.on("like", () => {
    handleLikes++;
    io.emit("updateLikes", handleLikes);
    io.emit("like");
  });

  socket.on("sendMessage", (message) => {
  //Spare mess i array
    io.emit("message", `${socket.data.name}: ${message}`);
  });
});

io.listen(3000);
console.log("Websocket server is running on port 3000");
