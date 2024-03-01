import io from "socket.io-client";
import { setPendingFriendsInvitations, setFriends, setOnlineUsers } from '../slices/friendSlice';
import store from "../store";
let socket = null;


export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  const dispatch = store.dispatch;


  socket = io("http://localhost:5002", {
      auth: {
          token: jwtToken,
      },
      // 新增下面这行以更详细地跟踪连接错误
      transports: ['websocket'], // 强制使用Websocket进行连接
  });

  socket.on("connect_error", (error) => {
      console.error("Connection Error:", error); // 新增
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

};
