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
          src={AvatarUserBoy}
          alt="user"
          className="w-[43px] h-[43px] rounded-full object-cover object-center "
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
