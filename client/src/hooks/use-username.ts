import { useEffect, useState } from "react";
import { socket } from "../socket";

export function useUsername() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleUserInfo = (username: string) => {
      setUsername(username);
    };

    socket.on("userInfo", handleUserInfo);

    return () => {
      socket.off("userInfo", handleUserInfo);
    };
  }, []);

  return username;
}
