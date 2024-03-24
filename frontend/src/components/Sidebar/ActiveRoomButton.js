import React from 'react';
import Avatar from '../Avatar';
import { joinRoom } from '../../realtimeCommunication/roomHandler';
import { prepareNewPeerConnection, handleSignalingData} from '../../realtimeCommunication/webRTCHandler';
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
  const { localStream, setRemoteStreams,setLocalStream } = useStream();
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
        console.log(`Conn-prepare received for ${connUserSocketId}`);
        prepareNewPeerConnection(connUserSocketId, false, localStream, setRemoteStreams);
        socket.emit("conn-init", { connUserSocketId });
      });
  
      socket.on("conn-init", (data) => {
        const { connUserSocketId } = data;
        console.log(`Conn-init received, initiating connection with ${connUserSocketId}`);
        prepareNewPeerConnection(connUserSocketId, true, localStream, setRemoteStreams);
      });
  
      socket.on("conn-signal", (data) => {
        console.log(`Conn-signal received from ${data.connUserSocketId}`);
        handleSignalingData(data);
      });
    } else {
      console.log(`Room is full: ${roomId}`);
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
