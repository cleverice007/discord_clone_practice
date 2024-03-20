import React from "react";
import { useSelector } from "react-redux";
import CameraButton from "./CameraButton";


const RoomButtons = () => {
  const { localStream, isUserJoinedWithOnlyAudio } = useSelector((state) => state.room);

  return (
    <div className="h-1/6 w-full bg-blue-600 rounded-tl-lg rounded-tr-lg flex items-center justify-center">
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}
    </div>
  );
};

export default RoomButtons;