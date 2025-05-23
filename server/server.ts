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
const users = new Map<string, { name: string; avatar: string }>();
// let handleMessages: string[] = [];

io.on("connection", (socket) => {
  console.log(`A user connected ` + socket.id);
  //Visa tidiagre mess från arrayen.

  //Initaliaze user name
  socket.data.name = "Guest" + guestIndex++;
  socket.data.avatar = "/avatars/01.png";

  users.set(socket.id, {
    name: socket.data.name,
    avatar: socket.data.avatar,
  });

  socket.emit("updateLikes", handleLikes);

  socket.on("setUsername", (username, avatar) => {
    socket.data.name = username;
    socket.data.avatar = avatar;

    users.set(socket.id, { name: username, avatar });
    socket.emit("message", `Welcome ${username}`);
    socket.emit("userInfo", username);
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
