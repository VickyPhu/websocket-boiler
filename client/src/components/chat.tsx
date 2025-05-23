import { useEffect, useState } from "react";
import { useLikes } from "../hooks/use-likes";
import { useUsers } from "../hooks/use-users";
import { socket } from "../socket";
import SidePanelUsers from "./side-panel-users";

export default function Chat() {
  const likes = useLikes();
  const users = useUsers();
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
    if (message === "") {
      alert("Skriv något i meddelandet");

      return;
    } else {
      setMessage("");
    }
    socket.emit("sendMessage", message);
  };

  const sendLike = () => {
    socket.emit("like");
  };

  return (
    <>
      <div className="flex justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-500">
        {/* <Chat /> */}
        <div className="flex flex-col w-full max-w-md p-4 bg-white shadow m-15 rounded-lg">
          <h1 className="text-center text-lg font-bold text-blue-400">
            Välkommen {users.length}
          </h1>
          <h2>Antal ❤️ {likes}</h2>
          <button onClick={sendLike}>Skicka ❤️</button>

          <div className="flex flex-col mt-4 overflow-y-auto h-96 mb-4 bg-gray-100 p-3 rounded-lg">
            {chat.map((line, index) => (
              <div key={index} className="bg-white m-1 rounded-lg p-2">
                {line}
              </div>
            ))}
          </div>

          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={message}
            placeholder="Skriv ditt meddelande här..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-400 mt-4 py-2 text-white rounded hover:bg-blue-500 cursor-pointer"
          >
            Skicka ditt mess
          </button>
        </div>
        <SidePanelUsers />
      </div>
    </>
  );
}
