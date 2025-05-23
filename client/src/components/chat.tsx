import { useEffect, useState } from "react";
import { useLikes } from "../hooks/use-likes";
import { socket } from "../socket";
import SidePanelUsers from "./side-panel-users";

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
    if (message === "") {
      alert("Skriv något i meddelandet");

      return;
    } else {
      setMessage("");
    }
    socket.emit("sendMessage", message);
  };

  const deleteMessage = (index: number) => {
    setChat((prev) => prev.filter((_, i) => i !== index));
  };

  const sendLike = () => {
    socket.emit("like");
  };

  return (
    <>
      <div className="flex justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-500 flex-wrap">
        {/* <Chat /> */}
        <div className="flex basis-4/5 flex-col max-w-md p-4 bg-white shadow m-6 rounded-lg">
          <h1 className="text-center text-lg font-bold text-blue-400">
            Välkommen {username} till chatten!
          </h1>
          <div className="flex flex-col mr-auto">
            <h2 className="bg-slate-300 px-2 py-1 rounded">Antal ❤️ {likes}</h2>
            <button onClick={sendLike} className="bg-blue-400 text-white rounded px-2 py-1 hover:bg-blue-500 mt-1">
              Skicka ❤️
            </button>
          </div>
          <div className="flex flex-col mt-4 overflow-y-auto h-96 mb-4 bg-gray-200 p-3 rounded-lg">
            {chat.map((line, index) => (
              <div key={index} className="bg-white m-1 rounded-lg p-2 flex">
                {line}
                <button
                  onClick={() => deleteMessage(index)}
                  className="bg-red-400 text-white rounded px-1 py-1 hover:bg-red-500 ml-auto"
                  title="Ta bort meddelande"
                >
                  Ta bort
                </button>
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
