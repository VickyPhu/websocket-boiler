import { useEffect, useState } from "react";
import { useLikes } from "../hooks/use-likes";
import { socket } from "../socket";

export default function Chat() {
  const likes = useLikes();
  const [username] = useState("");
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
  const sendMessage = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  const sendLike = () => {
    socket.emit("like");
  };

  return (
    <>
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
    </>
  );
}
