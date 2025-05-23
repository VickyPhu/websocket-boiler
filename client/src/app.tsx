import { useEffect, useState } from "react";
import { useLikes } from "./hooks/use-likes";
import { socket } from "./socket";

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

  useEffect(() => {
    socket.on("message", (message: string) => {
      setChat((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
      socket.off("updateLikes");
    };
  }, []);
  const handleRegister = () => {
    socket.emit("setUsername", username);
    setRegistered(true);
  };

  const sendMessage = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  const sendLike = () => {
    socket.emit("like");
  };

  if (!registred) {
    return (
      <div style={{ background: "tomato" }}>
        <h1>Välkommen, skapa ett roligt användarnamn</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ background: "antiquewhite" }}
        />
        <button onClick={handleRegister} style={{ color: "blue" }}>
          Registrera dig här
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-500">
            {/* <Chat /> */}
    <div>
      <h1>Välkommen {username}</h1>
      <h2>Antal ❤️ {likes}</h2>
      <button onClick={sendLike}>Skicka ❤️</button>

      <div>
        {chat.map((line, index) => (
          <div key={index}>{line}</div>
        ))}

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>Skicka ditt mess</button>
      </div>
    </div>
    </div>
  );
}
