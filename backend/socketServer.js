import { verifyTokenSocket } from "./middleware/authSocket.js";
import newConnectionHandler from "./socketHandlers/newConnectionHandler.js";
import disconnectHandler from "./socketHandlers/disconnectHandler.js";
import { setSocketServerInstance,getOnlineUsers } from "./serverStore.js";
import { Server } from "socket.io";
import {directChatHistoryHandler} from "./socketHandlers/directChatHistoryHandler.js";
import {directMessageHandler} from "./socketHandlers/directMessageHandler.js";

const registerSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  console.log('Socket.IO server has been set up.');

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
    console.log("user connected");
    console.log(socket.id);

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
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};

export default registerSocketServer;
