import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const CameraButton = ({ localStream }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <button onClick={handleToggleCamera} className="p-2 bg-transparent hover:bg-gray-700 text-white rounded-full focus:outline-none">
      {cameraEnabled ? (
        <FontAwesomeIcon icon={faCamera} className="w-6 h-6" />
      ) : (
        <FontAwesomeIcon icon={faEyeSlash} className="w-6 h-6" />
      )}
    </button>
  );
};

export default CameraButton;