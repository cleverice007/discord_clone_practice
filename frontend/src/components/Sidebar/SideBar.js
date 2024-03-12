import React from "react";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { useSelector } from 'react-redux';


const SideBar = () => {
  const isUserInRoom = useSelector((state) => state.room.isUserInRoom);
  
  return (
    <div className="w-18 h-full flex flex-col items-center bg-[#202225]">
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
    </div>
  );
};

export default SideBar;
