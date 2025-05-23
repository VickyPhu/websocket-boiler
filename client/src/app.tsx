import ConnectLabel from "./components/connect-label";
import Droplet from "./components/droplet";
import { useLikes } from "./hooks/use-likes";
import { socket } from "./socket";
import Chat from "./components/chat.tsx"
import { useEffect, useState } from "react";

// onUsernameSelection(username){
//   this.usernameAlreadySelected = true;
//   socket.auth = { username };
//   socket.connect();
// }

export default function App() {
  const likes = useLikes();
  const [username, setUsername] = useState("");
  const [registred, setRegistered] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  // useEffect(() => {
  //   socket.on("message", (username, msg) => {
  //     setChat((prev) => [...prev, `${username}: ${msg}`]);
  //   });


  const handleClick = () => socket.emit("like");

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-500">
      <ConnectLabel />
      <Droplet onClick={handleClick}>{likes}</Droplet>

            <Chat />
    </div>
  );
}
