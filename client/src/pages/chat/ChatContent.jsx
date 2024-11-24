import React, { useEffect, useRef, useState } from "react";
import { AvatarUserBoy } from "../../assets/images/Image";
import { RiSendPlaneFill } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { Divider, MessageLayout } from "./MessageType";
import { useChat } from "../../context/Chat/ChatContext";
import { useAuth } from "../../context/Auth/AuthContext";
import axiosInstance from "./../../service/axiosInstance";
import Spinner from "../../Ui/Spinner";
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
          className=" w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full object-cover"
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
  const [displayedDates, setDisplayedDates] = useState([]);
  const [isScroll, setIsScroll] = useState(false);
  const chatRef = useRef(null);

  const {
    messageHistory,
    loading: loadingMessage,
    next,
    getAllMessages,
  } = useChat();
  const { user } = useAuth();

  useEffect(() => {
    if (messageHistory?.length > 0 && chatRef?.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messageHistory]);

  useEffect(() => {
    if (messageHistory?.length > 0) {
      const dates = messageHistory?.map((item) =>
        item.createdAt.substring(0, 10)
      );
      const uniqueDates = [...new Set(dates)];
      setDisplayedDates(uniqueDates);
    }
  }, [messageHistory]);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && next && !loadingMessage) {
      setIsScroll(true);
      getAllMessages();
    }
  };

  return (
    <div
      onScroll={handleScroll}
      ref={chatRef}
      className="px-8 bg-bg py-5 flex flex-col gap-3 overflow-y-auto"
    >
      {loadingMessage ? (
        <div className="flex items-center justify-center flex-1">
          <Spinner />
        </div>
      ) : (
        messageHistory?.length > 0 &&
        displayedDates?.map((date, index) => (
          <React.Fragment key={index}>
            <Divider date={date} />
            {messageHistory
              ?.filter((item) => item.createdAt.substring(0, 10) === date)
              ?.map((item, msgIndex) => (
                <MessageLayout
                  key={msgIndex}
                  data={item}
                  isSender={user.userId === item.sender.userId}
                />
              ))}
          </React.Fragment>
        ))
      )}
    </div>
  );
};
// editor
const ChatEditor = () => {
  const { selectRoom, setMessageHistory } = useChat();
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    if (message !== "") {
      try {
        const sendData = { room: selectRoom.id, text: message };
        const response = await axiosInstance.post(
          `/api/chat/message`,
          sendData
        );
        if (response.status === 200) {
          setMessage("");
          // setMessageHistory((prevMessages) => [...prevMessages, response.data]);
        }
      } catch (err) {
        console.log("error");
      }
    }
  };
  return (
    <footer className="px-8">
      <div className="flex items-center gap-2">
        {/* <span className="w-[24px] h-[24px] center">
          <GrAttachment color="var(--text-1)" size={20} />
        </span> */}
        <div className="flex items-start border border-border flex-1 py-2 rounded-10 px-4">
          <textarea
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
          <span className=" w-[30px] h-[30px] center" onClick={sendMessage}>
            <RiSendPlaneFill color="var(--primary)" size={25} />
          </span>
        </div>
      </div>
    </footer>
  );
};
export default ChatContent;
