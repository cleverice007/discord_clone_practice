import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";

const MicButton = ({ localStream }) => {
    const [micEnabled, setMicEnabled] = useState(true);
  
    const handleToggleMic = () => {
      localStream.getAudioTracks()[0].enabled = !micEnabled;
      setMicEnabled(!micEnabled);
    };
  
    return (
      <button onClick={handleToggleMic} className="p-2 bg-transparent hover:bg-gray-700 text-white rounded-full focus:outline-none">
        {micEnabled ? (
          <FontAwesomeIcon icon={faMicrophone} className="w-6 h-6" />
        ) : (
          <FontAwesomeIcon icon={faMicrophoneSlash} className="w-6 h-6" />
        )}
      </button>
    );
  };

export default MicButton;
