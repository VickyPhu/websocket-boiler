// components/SidePanelUsers.tsx
import { useUsers } from "../hooks/use-users";

export default function SidePanelUsers() {
  const users = useUsers();

  return (
    <div style={{ width: "200px", background: "#f5f5f5", padding: "1rem" }}>
      <h3>Aktiva användare:</h3>
      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {/* Visa namn och ev. avatar */}
            {u.avatar && (
              <img
                src={u.avatar}
                alt="avatar"
                width={20}
                style={{ display: "inline", marginRight: 8 }}
              />
            )}
            {u.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
