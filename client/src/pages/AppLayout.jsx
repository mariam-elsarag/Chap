import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Ui/Navbar";

const AppLayout = () => {
  return (
    <div className="flex h-screen  flex-col">
      <Navbar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
