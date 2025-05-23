export interface ServerToClientEvents {
  message: (message: string) => void;
  updateLikes: (likeCount: number) => void;
  like: () => void;
}

export interface ClientToServerEvents {
  like: () => void;
  sendMessage: (message: string) => void;
  setUsername: (username: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
}
