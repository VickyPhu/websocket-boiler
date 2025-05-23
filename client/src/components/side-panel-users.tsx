import { useUsers } from "../hooks/use-users";

export default function SidePanelUsers() {
  const users = useUsers();

  return (
    <div style={{ width: "200px", background: "#f5f5f5", padding: "1rem" }}>
      <h3>Aktiva användare:</h3>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
