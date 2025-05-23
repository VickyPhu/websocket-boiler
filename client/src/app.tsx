import { BrowserRouter, Route, Routes } from "react-router";
import Chat from "./components/chat";
import Register from "./components/register";

// onUsernameSelection(username){
//   this.usernameAlreadySelected = true;
//   socket.auth = { username };
//   socket.connect();
// }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
