import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { apiKey } from "../../utils/helper";
import { useAuth } from "../Auth/AuthContext";

const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [selectRoom, setSelectRoom] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const openRoom = (id, user) => {
    setSelectRoom({ id, user });
  };
  return (
    <ChatContext.Provider value={{ selectRoom, openRoom }}>
      {children}
    </ChatContext.Provider>
  );
};

function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined)
    throw new Error("ChatContext used outside the ChatProvider");
  return context;
}

export { ChatProvider, useChat };
