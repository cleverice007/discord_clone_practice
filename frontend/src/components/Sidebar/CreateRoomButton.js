import React from "react";
import { useSelector } from "react-redux"; 
import { useStream } from "../../StreamContext";
import { createNewRoom } from "../../realtimeCommunication/roomHandler";

const CreateRoomButton = ({ isUserInRoom }) => {
  const audioOnly = useSelector((state) => state.room.audioOnly);
  const { setLocalStream } = useStream();

  const createNewRoomHandler = () => {
    createNewRoom(audioOnly, setLocalStream);
  };

  return (
    <button
      disabled={isUserInRoom}
      onClick={createNewRoomHandler}
      className={`w-12 h-12 rounded-2xl m-0 p-0 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ${isUserInRoom ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ marginTop: "10px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 m-auto" 
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
};

export default CreateRoomButton;
