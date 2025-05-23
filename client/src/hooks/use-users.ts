// hooks/use-users.ts
import { useEffect, useState } from "react";
import { socket } from "../socket";

// 🟡 Ändra typen till objekt med name och avatar
type User = { name: string; avatar: string };

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const handleUsers = (userList: User[]) => {
      setUsers(userList);
    };

    socket.on("users", handleUsers);

    return () => {
      socket.off("users", handleUsers);
    };
  }, []);

  return users;
}
