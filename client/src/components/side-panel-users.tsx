// components/SidePanelUsers.tsx
import { useUsers } from "../hooks/use-users";

export default function SidePanelUsers() {
  const users = useUsers();

  return (

    <div className="flex flex-col basis-1/5 max-w-xs p-4 bg-white shadow m-6 rounded-lg">

      <h3 className="text-lg font-bold text-blue-400">Aktiva användare:</h3>
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
