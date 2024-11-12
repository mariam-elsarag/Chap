import { useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { FaPlus } from "react-icons/fa6";
import { AvatarUserBoy } from "../../assets/images/Image";
import { truncateText } from "../../utils/helper";
const ChatRooms = () => {
  const [search, setSearch] = useState("");
  return (
    <aside className="w-[320px] pt-5 pb-3 px-4  border-r border-border overflow-hidden h-full flex flex-col  gap-4 ">
      <header className="flex items-center  gap-2">
        <div className=" center_y gap-2 flex-1 input !h-[40px]">
          <TfiSearch color="var(--text-1)" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent w-full outline-none text-text-1 border-none"
            placeholder="Search"
          />
        </div>
        <span className="w-[30px] h-[30px] bg-primary rounded-full center">
          <FaPlus color="var(--text-2)" />
        </span>
      </header>
      <div className="overflow-y-auto h-full flex flex-col gap-3">
        <ChatMember />
        <ChatMember />
      </div>
    </aside>
  );
};
const ChatMember = () => {
  return (
    <figure className="flex items-center justify-between bg-light-primary py-3 px-2 rounded-6  gap-2">
      <img
        src={AvatarUserBoy}
        alt="avatar"
        className="w-[58px] h-[58px] rounded-full object-cover"
      />
      <div className="flex  flex-col gap-1">
        <h2 className="text-text-1 font-medium text-sm">Grace Miller</h2>
        <p className="text-sm text-text-1">
          {truncateText("Hey, how's it going?", 20)}
        </p>
      </div>
      <div className="flex flex-col items-center  gap-2">
        <span className="text-text-1 text-xs">10:30 AM</span>
        <span className="bg-primary rounded-full w-[18px] h-[18px] center text-xs text-text-2 ">
          {" "}
          1
        </span>
      </div>
    </figure>
  );
};
export default ChatRooms;
