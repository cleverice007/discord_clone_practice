import React, { useState } from "react";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./RoomButtons/RoomButtons";

const Room = () => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <div
      className={`absolute rounded-lg flex flex-col items-center justify-center bg-[#202225] ${
        isRoomMinimized ? "bottom-0 right-0 w-1/3 h-[40vh]" : "w-full h-screen"
      }`}
    >
      <VideosContainer />
      <RoomButtons />
      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        handleRoomResize={roomResizeHandler}
      />
    </div>
  );
};

export default Room;
