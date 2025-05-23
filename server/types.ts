export interface ServerToClientEvents {
  message: (message: string) => void;
  updateLikes: (likeCount: number) => void;
  like: () => void;
  users: (users: { name: string; avatar: string }[]) => void;
  userInfo: (username: string, avatar: string) => void;
}

export interface ClientToServerEvents {
  like: () => void;
  sendMessage: (message: string) => void;
  setUsername: (username: string, avatar: string) => void;
  userInfo: (user: { name: string; avatar: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  avatar: string;
}
