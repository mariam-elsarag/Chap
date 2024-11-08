import React from "react";
import { Link, Outlet } from "react-router-dom";
import { PiMoonThin, PiSunThin, PiWechatLogoThin } from "react-icons/pi";
import { useDarkMode } from "../../context/themes/DarkMode";

const UnAuthLayout = () => {
  const { theme, handleThemeSwitch } = useDarkMode();
  return (
    <div className="bg-bg h-screen overflow-y-auto flex  flex-col gap-8">
      <nav className="text-text-1 py-4 px-4 border-b border-border center_y justify-between w-full ">
        <Link to="/" className="center_y gap-1">
          <PiWechatLogoThin size={25} color="var(--primary)" />
          <span className="text-primary">Chat</span>
        </Link>
        <div>
          {theme === "light" ? (
            <span role="button" onClick={handleThemeSwitch}>
              <PiMoonThin size={20} color="var(--text-1)" />
            </span>
          ) : (
            <span role="button" onClick={handleThemeSwitch}>
              <PiSunThin size={20} color="var(--text-1)" />
            </span>
          )}
        </div>
      </nav>
      <div className=" center flex-col flex-1 ">
        <div className="bg-secondary-bg shadow-main w-[500px] rounded-10 text-text-1 py-10 px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UnAuthLayout;
