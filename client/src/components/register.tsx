import { useState } from "react";
import { useNavigate } from "react-router";
import { socket } from "../socket";

export default function Register() {
  const [username, setUsername] = useState("");
  const [registred, setRegistered] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    socket.emit("setUsername", username, "avatar");
    setRegistered(true);
    navigate("/chat");
  };

  if (!registred) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-500">
        <h1 className="text-3xl">Välkommen</h1>
        <div className="p-6 rounded shadow-md bg-slate-200 max-w-sm flex flex-col gap-4 m-4">
          <h2>Skapa ett roligt användarnamn</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Namn"
            className="border-2 border-slate-300 p-2 rounded bg-slate-100"
          />
          <button
            onClick={handleRegister}
            className="bg-slate-300 p-2 rounded hover:bg-slate-400 transition cursor-pointer"
          >
            Registrera dig här
          </button>
        </div>
      </div>
    );
  }
}
