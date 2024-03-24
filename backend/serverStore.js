const connectedUsers = new Map();

let io = null;
let activeRooms = [];


const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log("new connected users");
  console.log(connectedUsers);
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("new connected users");
    console.log(connectedUsers);
  }
};

const getActiveConnections = (userId) => {
  const activeConnections = [];

  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: Math.random().toString(36).substring(7),
  };

  activeRooms = [...activeRooms, newActiveRoom];
  return newActiveRoom;
};

const getActiveRooms = () => {
  return [...activeRooms];
};


const getActiveRoom = (roomId) => {
  const activeRoom = activeRooms.find(
    (activeRoom) => activeRoom.roomId === roomId
  );

  if (activeRoom) {
    return {
      ...activeRoom,
    };
  } else {
    return null;
  }
};
const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRooms.find((room) => room.roomId === roomId);

  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };

  activeRooms.push(updatedRoom);
  console.log('participants',updatedRoom.participants);
};


export
 { setSocketServerInstance, getSocketServerInstance, addNewConnectedUser, 
  removeConnectedUser, getActiveConnections, getOnlineUsers, addNewActiveRoom, getActiveRooms
,getActiveRoom, joinActiveRoom};