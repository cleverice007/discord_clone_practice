import React from "react";
import { useSelector } from "react-redux";
import CameraButton from "./CameraButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import ScreenShareButton from "./ScreenShareButton";

const RoomButtons = () => {
  const { localStream, isUserJoinedWithOnlyAudio, screenSharingStream, isScreenSharingActive } = useSelector((state) => state.room);

  return (
    <div className="h-1/6 w-full bg-blue-600 rounded-tl-lg rounded-tr-lg flex items-center justify-center">
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton localStream={localStream} screenSharingStream={screenSharingStream} isScreenSharingActive={isScreenSharingActive} />}
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}    </div>
  );
};

export default RoomButtons;
