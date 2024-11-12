import React from "react";

// lib
import { PiWechatLogoThin, PiMoonThin, PiSunThin } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
// hook
import { useDarkMode } from "../context/themes/DarkMode";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const Navbar = () => {
  const { theme, handleThemeSwitch } = useDarkMode();
  const { logout } = useAuth();
  return (
    <nav className="bg-bg text-text-1 py-4 px-4 border-b border-border center_y justify-between w-full ">
      <Link to="/" className="center_y gap-1">
        <PiWechatLogoThin size={25} color="var(--primary)" />
        <span className="text-primary">Chat</span>
      </Link>
      <div className="center_y gap-3">
        {theme === "light" ? (
          <span role="button" onClick={handleThemeSwitch}>
            <PiMoonThin size={20} color="var(--text-1)" />
          </span>
        ) : (
          <span role="button" onClick={handleThemeSwitch}>
            <PiSunThin size={20} color="var(--text-1)" />
          </span>
        )}
        <span role="button" onClick={logout}>
          <FiLogOut size={18} color="var(--text-1)" />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
