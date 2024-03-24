import React, { useEffect,useState } from 'react';
import Avatar from '../Avatar';
import { joinRoom } from '../../realtimeCommunication/roomHandler';
//import { prepareNewPeerConnection, handleSignalingData} from '../../realtimeCommunication/webRTCHandler';
import { useSelector } from "react-redux";
import { useStream } from "../../StreamContext";
//import io from "socket.io-client";


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


  // useEffect(() => {
//     if (!hasJoinedRoom) return; // if user has not joined any room, do nothing
//     const socket = io("http://localhost:5002", {
//         auth: {
//             token: jwtToken,
//         },
//     });
//     socket.on("connect", () => {
//       console.log("connect from active room button",socket.id);
//   });


//     // define event handlers
//     const onConnPrepare = (data) => {
//         const { connUserSocketId } = data;
//         prepareNewPeerConnection(connUserSocketId, false, localStream, setRemoteStreams);
//         console.log('connPrepare',connUserSocketId);
//         socket.emit("conn-init", { connUserSocketId });
//     };

//     const onConnInit = (data) => {
//         const { connUserSocketId } = data;
//         console.log('connInit',connUserSocketId);
//         prepareNewPeerConnection(connUserSocketId, true, localStream, setRemoteStreams);
//     };

//     const onConnSignal = (data) => {
//       console.log('connSignal',data);
//         handleSignalingData(data);
//     };

//     // add event listeners
//     socket.on("conn-prepare", onConnPrepare);
//     socket.on("conn-init", onConnInit);
//     socket.on("conn-signal", onConnSignal);

// }, [hasJoinedRoom]);


const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 4) {
        joinRoom(roomId, audioOnly, setLocalStream);
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
