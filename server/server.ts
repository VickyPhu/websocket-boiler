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

type ChatMessage = {
  id: string;
  user: string;
  text: string;
  likes: number;
};

let guestIndex = 1;
let handleLikes = 0;

// Mappar socket.id → { name, avatar }
const users = new Map<string, { name: string; avatar: string }>();

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Initiera gäst-användare med namn och avatar
  socket.data.name = "Guest" + guestIndex++;
  socket.data.avatar = "/avatars/01.jpg";

  users.set(socket.id, {
    name: socket.data.name,
    avatar: socket.data.avatar,
  });

  socket.emit("updateLikes", handleLikes);
  io.emit("users", Array.from(users.values())); // Skicka initial lista

  socket.on("setUsername", (username, avatar) => {
    socket.data.name = username;
    socket.data.avatar = avatar;

    users.set(socket.id, { name: username, avatar });

    socket.emit("message", `Welcome ${username}`);
    socket.emit("userInfo", username, avatar);
    io.emit("users", Array.from(users.values())); // Skicka uppdaterad lista
  });

  socket.on("like", () => {
    handleLikes++;
    io.emit("updateLikes", handleLikes);
    io.emit("like");
  });

  socket.on("sendMessage", (message) => {

    io.emit("message", `${socket.data.name}: ${message}`);
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("users", Array.from(users.values())); // Uppdatera listan
    console.log(`User disconnected: ${socket.id}`);
  });
});

io.listen(3000);
console.log("Websocket server is running on port 3000");
