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

  console.log("new active rooms: ");
  console.log(activeRooms);

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
  // 首先，找到與給定roomId匹配的房間
  const room = activeRooms.find((room) => room.roomId === roomId);
  console.log("Room found:", room);

  // 如果找不到房間，打印一個錯誤並返回，避免執行後面的代碼
  if (!room) {
    console.error("Room not found with roomId:", roomId);
    return;
  }

  // 過濾出不包含當前roomId的所有房間
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);
  console.log("Active rooms after filter:", activeRooms);

  // 建立一個更新過的房間物件，並將新參與者加入到participants陣列中
  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };
  console.log("Updated room:", updatedRoom);

  // 將更新過的房間物件推回到activeRooms陣列中
  activeRooms.push(updatedRoom);
};

export
 { setSocketServerInstance, getSocketServerInstance, addNewConnectedUser, 
  removeConnectedUser, getActiveConnections, getOnlineUsers, addNewActiveRoom, getActiveRooms
,getActiveRoom, joinActiveRoom};