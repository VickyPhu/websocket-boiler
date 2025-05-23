import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../server/types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

// const URL = "http://localhost:3000";
// const socket = io(URL, {
//   autoConnect: false,});

//   export default socket;
