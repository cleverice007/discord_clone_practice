import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CloseRoomButton = () => {
  const handleLeaveRoom = () => {
  };

  return (
    <button
      onClick={handleLeaveRoom}
      className="text-white p-2 bg-transparent hover:bg-gray-700 rounded-full focus:outline-none"
    >
      <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
    </button>
  );
};

export default CloseRoomButton;
