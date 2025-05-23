import { useState } from "react";
import { socket } from "../socket";

export default function Register() {
  const [username, setUsername] = useState("");
  const [registred, setRegistered] = useState(false);

  const handleRegister = () => {
    socket.emit("setUsername", username);
    setRegistered(true);
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
}
