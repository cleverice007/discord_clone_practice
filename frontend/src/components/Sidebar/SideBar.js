import React from "react";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { useSelector } from 'react-redux';
import ActiveRoomButton from "./ActiveRoomButton";


const SideBar = () => {
  const isUserInRoom = useSelector((state) => state.room.isUserInRoom);
  const activeRooms = useSelector((state) => state.room.activeRooms);
  console.log(activeRooms)
  
  return (
    <div className="w-18 h-full flex flex-col items-center bg-[#202225]">
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms?.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </div>
  );
};

export default SideBar;
