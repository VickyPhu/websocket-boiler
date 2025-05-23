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
let messages: ChatMessage[] = [];

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Skicka tidigare meddelanden
  socket.emit("chatHistory", messages);

  socket.data.name = "Guest" + guestIndex++;
  socket.emit("updateLikes", handleLikes);

  socket.on("setUsername", (username) => {
    socket.data.name = username;
    const welcomeMsg: ChatMessage = {
      id: crypto.randomUUID(),
      user: "MSN",
      text: `Welcome ${username}`,
      likes: 0,
    };
    messages.push(welcomeMsg);
    socket.emit("message", welcomeMsg);
  });

  socket.on("like", () => {
    handleLikes++;
    io.emit("updateLikes", handleLikes);
    io.emit("like");
  });

  // ✅ Nytt meddelande
  socket.on("sendMessage", (text) => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      user: socket.data.name,
      text,
      likes: 0,
    };
    messages.push(message);
    io.emit("message", message);
  });

  // ✅ Gilla ett specifikt meddelande
  socket.on("likeMessage", (id: string) => {
    const msg = messages.find((m) => m.id === id);
    if (msg) {
      msg.likes++;
      socket.emit("chatHistory", messages);
      // io.emit("updateMessage", msg);
    }
  });
});

io.listen(3000);
console.log("Websocket server is running on port 3000");
