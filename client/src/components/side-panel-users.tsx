// components/side-panel-users.tsx
import { useUsers } from "../hooks/useUsers";

export default function SidePanelUsers() {
  const users = useUsers();

  return (
    <div style={{ width: "200px", background: "#eee", padding: "1rem" }}>
      <h3>Användare</h3>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
