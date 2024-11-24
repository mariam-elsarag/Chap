import { useEffect, useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa6";
import { AvatarUserBoy } from "../../assets/images/Image";
import { formatTime, truncateText } from "../../utils/helper";
import useGetData from "./../../hooks/useGetData";
import { useChat } from "../../context/Chat/ChatContext";
import { useAuth } from "../../context/Auth/AuthContext";
import Model from "../../components/Modal/Modal";
import Users from "./Users/Users";

const ChatRooms = () => {
  const { rooms, setQuery, setRefetchData } = useChat();
  const [search, setSearch] = useState("");

  // for users
  const [visible, setVisible] = useState(false);

  const closeModel = async () => {
    setVisible(false);
    setRefetchData(Date.now());
  };
  return (
    <aside className="w-[280px] xl:w-[345px] pt-5 pb-3 px-4  border-r border-border overflow-hidden h-full flex flex-col  gap-4 ">
      <header className="flex items-center  gap-2">
        <div className=" center_y gap-2 flex-1 input !h-[40px]">
          <TfiSearch color="var(--text-1)" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery({ keyword: search });
              }
            }}
            className="flex-1 bg-transparent w-full outline-none text-text-1 border-none"
            placeholder="Search"
          />
        </div>
        <span
          onClick={() => setVisible(true)}
          className="w-[30px] h-[30px] bg-primary rounded-full center"
        >
          <FaPlus color="var(--text-2)" />
        </span>
      </header>
      <div className="overflow-y-auto h-full flex flex-col gap-3">
        {rooms?.rooms?.map((room) => (
          <ChatMember data={room} key={room?.roomId} />
        ))}
      </div>
      {/* modal */}
      <Model
        open={visible}
        onClose={() => setVisible(false)}
        headerTitle="Create a new room"
      >
        <Users onClose={closeModel} />
      </Model>
    </aside>
  );
};
const ChatMember = ({ data }) => {
  const { openRoom } = useChat();

  const renderLastMessage = (data) => {
    if (data?.text) {
      return (
        <p className="text-sm text-text-1 ">{truncateText(data.text, 20)}</p>
      );
    }
  };

  return (
    <figure
      role="button"
      onClick={() => openRoom(data?.roomId, data.user)}
      className={`flex items-center justify-between ${
        !data?.isReeded && data?.unread_count > 0
          ? "bg-light-primary"
          : "bg-transparent"
      } py-3 px-2 rounded-6  gap-2`}
    >
      <div className="relative w-[45px] h-[45px]  lg:w-[58px] lg:h-[58px] rounded-full">
        <img
          src={data?.user?.avatar !== "" ? data?.user?.avatar : AvatarUserBoy}
          alt="avatar"
          className="w-[45px] h-[45px]  lg:w-[58px] lg:h-[58px] rounded-full object-cover"
        />
      </div>
      <div className="flex  flex-col gap-1 flex-1">
        <h2 className="text-text-1 font-medium text-sm">
          {data?.user?.full_name}
        </h2>

        {renderLastMessage(data?.message)}
      </div>
      <div className="flex flex-col items-center  gap-2">
        <span className="text-text-1 text-xs">
          {data?.updatedAt ? formatTime(data?.updatedAt) : "-"}
        </span>
        {data?.unread_count > 0 && (
          <span className="bg-primary rounded-full w-[18px] h-[18px] center text-xs text-text-2 ">
            {data?.unread_count}
          </span>
        )}
      </div>
    </figure>
  );
};
export default ChatRooms;
