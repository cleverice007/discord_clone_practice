import React from "react";

const ResizeRoomButton = ({ isRoomMinimized, handleRoomResize }) => {
  return (
    <div className="absolute bottom-2.5 right-2.5">
      <button
        onClick={handleRoomResize}
        className="text-white p-2 bg-transparent hover:bg-gray-700 focus:outline-none"
      >
        {isRoomMinimized ? (
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
              d="M5 15l7-7 7 7"
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ResizeRoomButton;
