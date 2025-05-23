import Chat from "./components/chat";
import Register from "./components/register";
import SidePanelUsers from "./components/side-panel-users";

// onUsernameSelection(username){
//   this.usernameAlreadySelected = true;
//   socket.auth = { username };
//   socket.connect();
// }

export default function App() {
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <Register />
        <Chat />
        <SidePanelUsers />
        <div style={{ flex: 1, padding: "1rem" }}></div>
      </div>
    </>
  );
}
