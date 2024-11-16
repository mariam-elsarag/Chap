import React from "react";
import ChatRooms from "./ChatRooms";
import ChatContent from "./ChatContent";
import { useChat } from "../../context/Chat/ChatContext";

const ChatContainer = () => {
  const { selectRoom } = useChat();

  return (
    <div className="flex items-start h-[calc(100vh_-_58px)] overflow-y-hidden bg-bg">
      <ChatRooms />
      {selectRoom ? <ChatContent /> : <div>roma</div>}
    </div>
  );
};

export default ChatContainer;
