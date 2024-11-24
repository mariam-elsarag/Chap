import { AvatarUserBoy } from "../../assets/images/Image";

export const MessageLayout = ({ type = "text", data, isSender = false }) => {
  const renderMessage = (type) => {
    switch (type) {
      case "text":
        return <MessageText isSender={isSender} text={data?.text} />;

      default:
        return <MessageText isSender={isSender} text={data?.text} />;
    }
  };

  return (
    <div
      className={`flex items-start  ${
        isSender ? "" : "ml-auto flex-row-reverse"
      }  max-w-[50%] gap-2`}
    >
      {!isSender && (
        <img
          src={data?.sender?.avatar}
          alt="user"
          className=" w-[40px] h-[40px] lg:w-[43px] lg:h-[43px] rounded-full object-cover object-center "
        />
      )}
      <div>{renderMessage(type)}</div>
    </div>
  );
};

const MessageText = ({ isSender, text }) => {
  return (
    <p
      className={` rounded-xl py-2 text-sm px-3 ${
        isSender ? "bg-secondary text-text-1 " : "bg-primary text-text-2 "
      }`}
    >
      {text}
    </p>
  );
};

export const Divider = ({ date }) => {
  return (
    <div className="relative h-[1px] w-full bg-border my-3">
      <span className="absolute top-[50%] left-[50%] text-sm translate-x-[-50%] translate-y-[-50%] bg-bg text-text-1 px-4 ">
        {date}
      </span>
    </div>
  );
};
