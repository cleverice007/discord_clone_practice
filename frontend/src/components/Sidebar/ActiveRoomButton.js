import React from 'react';
import Avatar from '../Avatar';
import { joinRoom } from '../../realtimeCommunication/roomHandler';
import { prepareNewPeerConnection } from '../../realtimeCommunication/webRTCHandler';
import { useSelector } from "react-redux";
import { useStream } from "../../StreamContext";
import io from "socket.io-client";


const ActiveRoomButton = ({
  creatorUsername,
  roomId,
  amountOfParticipants,
  isUserInRoom,
}) => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const jwtToken = userDetails.token;
  const audioOnly = useSelector((state) => state.room.audioOnly);
  const { localStream, setLocalStream } = useStream();
  const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 4) {
      joinRoom(roomId, audioOnly, setLocalStream);


      const socket = io("http://localhost:5002", {
        auth: {
          token: jwtToken,
        },
      });


      socket.on("conn-prepare", (data) => {
        const { connUserSocketId } = data;
        prepareNewPeerConnection(connUserSocketId, false, localStream);
        socket.emit("conn-init", { connUserSocketId: connUserSocketId });
      });
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
