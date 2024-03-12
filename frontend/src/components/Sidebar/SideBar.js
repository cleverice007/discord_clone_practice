import React from "react";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";

const SideBar = () => {
  const isUserInRoom = false;
  return (
    <div className="w-18 h-full flex flex-col items-center bg-[#202225]">
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
    </div>
  );
};

export default SideBar;
