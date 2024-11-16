import React from "react";
import { AvatarUserBoy } from "../../assets/images/Image";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { MessageLayout } from "./MessageType";
import { useChat } from "../../context/Chat/ChatContext";
import { useAuth } from "../../context/Auth/AuthContext";
const ChatContent = () => {
  return (
    <div className="flex-1 bg--bg grid grid-rows-[auto_1fr_auto]  h-full pb-5 ">
      <ChatHeader />
      <ChatBody />
      <ChatEditor />
    </div>
  );
};
const ChatHeader = () => {
  const { selectRoom } = useChat();
  const { onlineUsers } = useAuth();
  const isOnline = onlineUsers.includes(selectRoom?.user?.userId);
  return (
    <header className="flex items-center justify-between bg-bg  border-b border-border py-3 px-8 ">
      <figure className="flex gap-2 items-center">
        <img
          src={
            selectRoom?.user?.avatar !== ""
              ? selectRoom?.user?.avatar
              : AvatarUserBoy
          }
          alt="avatar"
          className="w-[48px] h-[48px] rounded-full object-cover"
        />

        <div className="flex  flex-col gap-1">
          <h2 className="text-text-1 font-medium text-sm">
            {selectRoom?.user?.full_name}
          </h2>
          {isOnline && (
            <p className="center_y gap-1">
              <span className="flex w-[8px] h-[8px] rounded-full bg-green "></span>
              <span className="text-text-1 text-sm">online</span>
            </p>
          )}
        </div>
      </figure>
    </header>
  );
};
const ChatBody = () => {
  return (
    <div className="px-8 bg-bg py-5 flex flex-col gap-3">
      <MessageLayout />
      <MessageLayout isSender={true} />
    </div>
  );
};
// editor
const ChatEditor = () => {
  const sendMessage = async () => {
    console.log(sendMessage);
  };
  return (
    <footer className="px-8">
      <div className="flex items-center gap-2">
        <span className="w-[24px] h-[24px] center">
          <GrAttachment color="var(--text-1)" size={20} />
        </span>
        <div className="flex items-start border border-border flex-1 py-2 rounded-10 px-4">
          <textarea
            placeholder="Type a message"
            className=" h-[32px] py-1 text-text-1 outline-none shadow-none flex-1 resize-none bg-bg "
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                sendMessage();
              }
              if (e.shiftKey) {
                autoExpandTextarea(e.target);
              }
            }}
          />
          <span className=" w-[30px] h-[30px] center">
            <RiSendPlaneFill color="var(--primary)" size={25} />
          </span>
        </div>
      </div>
    </footer>
  );
};
export default ChatContent;
