import React, { useState } from "react";

const CameraButton = ({ localStream }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <button
      onClick={handleToggleCamera}
      className="p-2 bg-transparent hover:bg-gray-700 text-white rounded-full focus:outline-none"
    >
      {cameraEnabled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.55-2.27A1 1 0 0121 8.87v6.26a1 1 0 01-1.45.91L15 14v2a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.55-2.27A1 1 0 0121 8.87v6.26a1 1 0 01-1.45.91L15 14v2a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2zm-6 4l6 6m0 0l-6-6m6 6L9 8m6 12l-6-6"
          />
        </svg>
      )}
    </button>
  );
};

export default CameraButton;
