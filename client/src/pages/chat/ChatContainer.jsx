import React from "react";
import ChatRooms from "./ChatRooms";
import ChatContent from "./ChatContent";

const ChatContainer = () => {
  return (
    <div className="flex items-start h-[calc(100vh_-_58px)] overflow-y-hidden bg-bg">
      <ChatRooms />
      <ChatContent />
    </div>
  );
};

export default ChatContainer;
