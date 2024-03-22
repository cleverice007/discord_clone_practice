import React from 'react';
import Avatar from '../Avatar';
import { joinRoom } from '../../realtimeCommunication/roomHandler';
import { useSelector } from "react-redux"; 
import { useStream } from "../../StreamContext";

const ActiveRoomButton = ({
  creatorUsername,
  roomId,
  amountOfParticipants,
  isUserInRoom,
}) => {
  const audioOnly = useSelector((state) => state.room.audioOnly);
  const { setLocalStream } = useStream();
  const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 4) {
      joinRoom(roomId, audioOnly, setLocalStream);
    }
  };

  const activeRoomButtonDisabled = amountOfParticipants > 3;
  const roomTitle = `Creator: ${creatorUsername}. Connected: ${amountOfParticipants}`;

  return (
    <div className="tooltip" data-tip={roomTitle}>
      <button
        className={`w-12 h-12 rounded-2xl m-0 p-0 mt-2 text-white bg-indigo-600 ${activeRoomButtonDisabled || isUserInRoom ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-indigo-700`}
        disabled={activeRoomButtonDisabled || isUserInRoom}
        onClick={handleJoinActiveRoom}
      >
        <Avatar username={creatorUsername} />
      </button>
    </div>
  );
};

export default ActiveRoomButton;
