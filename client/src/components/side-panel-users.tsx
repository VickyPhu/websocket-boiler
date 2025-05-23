import { useUsers } from "../hooks/use-users";

export default function SidePanelUsers() {
  const users = useUsers();

  return (
    <div className="flex flex-col p-4 bg-white shadow m-6 rounded-lg">
      <h3>Aktiva användare:</h3>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
