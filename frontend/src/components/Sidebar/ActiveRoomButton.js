import React, { useEffect, useState } from 'react';
import Avatar from '../Avatar';
import { prepareNewPeerConnection, handleSignalingData } from '../../realtimeCommunication/webRTCHandler';
import { useSelector } from "react-redux";
import { useStream } from "../../StreamContext";
import { joinRoom } from '../../realtimeCommunication/roomHandler';
//import io from "socket.io-client";
import store from '../../store';
import { setOpenRoom, setIsUserJoinedOnlyWithAudio } from '../../slices/roomSlice';



const ActiveRoomButton = ({
  creatorUsername,
  roomId,
  amountOfParticipants,
  isUserInRoom,
}) => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const jwtToken = userDetails.token;
  const audioOnly = useSelector((state) => state.room.audioOnly);
  const { localStream, setRemoteStreams, setLocalStream } = useStream();

  const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 4) {
        joinRoom(roomId, audioOnly, setLocalStream);
    } else {
        console.log(`Room is full: ${roomId}`);
    }
};
  

  // 定義一個新的函數來設定 socket 事件監聽器
  const setupSocketEventListeners = (socket, localStream, setRemoteStreams) => {
    socket.on("connect", () => {
      console.log("connect from dashboard", socket.id);
    });
    socket.on("conn-prepare", (data) => {
      const { connUserSocketId } = data;
      console.log('connPrepare', connUserSocketId);
      prepareNewPeerConnection(connUserSocketId, false, localStream, setRemoteStreams);
    });
    socket.on("conn-init", (data) => {
      const { connUserSocketId } = data;
      console.log('connInit', connUserSocketId);
      prepareNewPeerConnection(connUserSocketId, true, localStream, setRemoteStreams);
    });
    socket.on("conn-signal", (data) => {
      console.log('connSignal', data);
      handleSignalingData(data);
    });
  }






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