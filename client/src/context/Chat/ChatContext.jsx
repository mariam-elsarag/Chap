import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { apiKey } from "../../utils/helper";
import { useAuth } from "../Auth/AuthContext";
import axiosInstance from "../../service/axiosInstance";

const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [selectRoom, setSelectRoom] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const { socket } = useAuth();

  // all messages
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(`/api/chat/message/${selectRoom?.id}`);

  // functions
  const getAllMessages = async (roomId, page) => {
    try {
      setLoading(true);
      const endpoint = page ? `/api/chat/message/${roomId}` : next;
      const response = await axiosInstance.get(endpoint);
      if (response.status === 200) {
        setMessageHistory(response.data.results);
        setNext(response.data.next);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const readMessage = async (roomId) => {
    try {
      const response = await axiosInstance.patch(
        `/api/chat/room/${roomId}/read_message`
      );
      if (response.status === 200) {
        setMessageHistory((prev) =>
          prev.map((item) =>
            item.roomId === roomId
              ? { ...item, isReeded: response.data.isReeded }
              : item
          )
        );
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  const openRoom = async (id, user) => {
    setSelectRoom({ id, user });
    await getAllMessages(id, 1);
    await readMessage(id);
  };
  useEffect(() => {
    if (selectRoom) {
      socket.on("message", (newMessage) => {
        setMessageHistory((pre) => [...pre, newMessage]);
      });
    }
  }, [selectRoom]);

  return (
    <ChatContext.Provider
      value={{
        selectRoom,
        messageHistory,
        setMessageHistory,
        openRoom,
        loading,
      }}
    >
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
