import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import  {switchOutgoingTracks} from "../../../realtimeCommunication/webRTCHandler";
import { setScreenSharingStream } from '../../../slices/roomSlice';
import { useSelector, useDispatch } from 'react-redux';


const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = ({
  localStream,
  screenSharingStream,
}) => {
  const dispatch = useDispatch();
  const isScreenSharingActive = useSelector((state) => state.room.isScreenSharingActive);

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
        console.log("Screen sharing started successfully", stream);
        dispatch(setScreenSharingStream({ screenSharingStream: stream }));
      } catch (err) {
        console.log("Error occurred when trying to get access to screen share stream");
      }
    } else {
      console.log("Stopping screen sharing", screenSharingStream); 
      switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      dispatch(setScreenSharingStream({ screenSharingStream: null }));
    }
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
