import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = ({
  localStream,
  screenSharingStream,
  setScreenSharingStream,
  isScreenSharingActive,
}) => {
  const handleScreenShareToggle = async () => {

  };

  return (
    <button
      onClick={handleScreenShareToggle}
      className="text-white p-2 bg-transparent hover:bg-gray-700 rounded-full focus:outline-none"
    >
      {isScreenSharingActive ? (
        <FontAwesomeIcon icon={faStopCircle} className="w-6 h-6" />
      ) : (
        <FontAwesomeIcon icon={faDesktop} className="w-6 h-6" />
      )}
    </button>
  );
};

export default ScreenShareButton;
