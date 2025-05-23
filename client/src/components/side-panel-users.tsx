import { useUsername } from "../hooks/use-username";

export default function SidePanelUsers() {
  const username = useUsername();

  return (
    <div style={{ width: "200px", background: "#eee", padding: "1rem" }}>
      <h3>Du är inloggad som:</h3>
      <p>{username}</p>
    </div>
  );
}
