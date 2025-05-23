import { useEffect, useState } from "react";
import { socket } from "../socket";

export function useUsers() {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const onUsers = (list: string[]) => {
      setUsers(list);
    };

    socket.on("users", onUsers);

    return () => {
      socket.off("users", onUsers);
    };
  }, []);

  return users;
}
