import { verifyTokenSocket } from "./middleware/authSocket.js";
import newConnectionHandler from "./socketHandlers/newConnectionHandler.js";
import disconnectHandler from "./socketHandlers/disconnectHandler.js";
import { setSocketServerInstance,getOnlineUsers } from "./serverStore.js";
import { Server } from "socket.io";

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
    console.log('Verifying token for socket:', socket.id); // Log the socket id being verified
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

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};

export default registerSocketServer;