import { verifyTokenSocket } from "./middleware/authSocket.js";
import newConnectionHandler from "./socketHandlers/newConnectionHandler.js";
import disconnectHandler from "./socketHandlers/disconnectHandler.js";
import { setSocketServerInstance, getOnlineUsers } from "./serverStore.js";
import { Server } from "socket.io";
import { directChatHistoryHandler } from "./socketHandlers/directChatHistoryHandler.js";
import { directMessageHandler } from "./socketHandlers/directMessageHandler.js";
import {roomCreateHandler} from "./socketHandlers/roomCreateHandler.js";
import { roomJoinHandler } from "./socketHandlers/roomJoinHandler.js";
import { roomInitializeConnectionHandler } from "./socketHandlers/roomInitializeConnectionHandler.js";
import { roomSignalingDataHandler } from "./socketHandlers/roomSignalingDataHandler.js";

const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });


  setSocketServerInstance(io);

  io.use((socket, next) => {
    console.log('Verifying token for socket:', socket.id);
    verifyTokenSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {

    newConnectionHandler(socket, io);
    emitOnlineUsers();

    // Move these inside the 'connection' event listener
    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
    socket.on("room-create", () => {
      roomCreateHandler(socket);
    });
    socket.on("room-join", (data) => {
      roomJoinHandler(socket, data);
    });
    socket.on("conn-init", (data) => {
      roomInitializeConnectionHandler(socket, data);
    });
    socket.on("conn-signal", (data) => {
      roomSignalingDataHandler(socket, data);
    });


  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};

export default registerSocketServer;
