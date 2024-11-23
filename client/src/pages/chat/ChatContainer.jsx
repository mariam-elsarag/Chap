import React from "react";
import ChatRooms from "./ChatRooms";
import ChatContent from "./ChatContent";
import { useChat } from "../../context/Chat/ChatContext";
import { BsChat } from "react-icons/bs";
const ChatContainer = () => {
  const { selectRoom } = useChat();

  return (
    <div className="flex items-start h-[calc(100vh_-_58px)] overflow-y-hidden bg-bg">
      <ChatRooms />
      {selectRoom ? (
        <ChatContent />
      ) : (
        <div className="center w-full h-full">
          <div className="flex flex-col items-center justify-center gap-5">
            <BsChat size={60} color="var(--text-1)" />
            <p className="text-2xl text-text-1 ">No room selected</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
