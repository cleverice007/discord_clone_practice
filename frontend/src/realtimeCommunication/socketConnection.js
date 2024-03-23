import io from "socket.io-client";
import { setPendingFriendsInvitations, setFriends, setOnlineUsers } from '../slices/friendSlice';
import store from "../store";
import { updateDirectChatHistoryIfActive } from '../utils/chat';
import { newRoomCreated, updateActiveRooms } from './roomHandler';
import { prepareNewPeerConnection, handleSignalingData } from './webRTCHandler';

let socket = null;


export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  const dispatch = store.dispatch;


  socket = io("http://localhost:5002", {
      auth: {
          token: jwtToken,
      },
  });

  socket.on("connect_error", (error) => {
      console.error("Connection Error:", error); 
  });

  socket.on("connect", () => {
      console.log("Successfully connected with socket.io server");
      console.log("Socket ID:", socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    dispatch(setOnlineUsers(onlineUsers));
  });
  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(data);
  });
  socket.on("room-create", (data) => {
    newRoomCreated(data);
  });

  socket.on("active-rooms", (data) => {
    updateActiveRooms(data);
  });


  //socket.on("conn-prepare", (data) => {
  //  const { connUserSocketId } = data;
  //  prepareNewPeerConnection(connUserSocketId, false,localStream);
   // socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  // });

  //socket.on("conn-init", (data) => {
   // const { connUserSocketId } = data;
  //prepareNewPeerConnection(connUserSocketId, true);
 // });

  socket.on("conn-signal", (data) => {
    handleSignalingData(data);
  });
};

export const sendDirectMessage = (data) => {
  console.log(data);
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
  socket.emit("room-create");
};

export const joinRoom = (data) => {
  socket.emit("room-join", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
