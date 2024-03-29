import { addNewActiveRoom } from "../serverStore.js";
import { updateRooms } from "./updates/room.js";

const roomCreateHandler = (socket) => {
    console.log("handling room create event");
    const socketId = socket.id;
    const userId = socket.user.userId;
  
    const roomDetails = addNewActiveRoom(userId, socketId);
    console.log('particpants who created room',roomDetails.participants)
  
    socket.emit("room-create", {
      roomDetails,
    });
  
   updateRooms();
  };
  
    export { roomCreateHandler };  