export type ChatMessage = {
  id: string;
  user: string;
  text: string;
  likes: number;
};

export interface ServerToClientEvents {
  message: (message: ChatMessage) => void;
  updateMessage: (message: ChatMessage) => void;
  chatHistory: (messages: ChatMessage[]) => void;
  updateLikes: (count: number) => void;
  like: () => void;
}

export interface ClientToServerEvents {
  sendMessage: (text: string) => void;
  like: () => void;
  likeMessage: (id: string) => void;
  setUsername: (name: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
}
