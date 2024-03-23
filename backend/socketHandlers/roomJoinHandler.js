import { joinActiveRoom } from "../serverStore.js";
import { updateRooms } from "./updates/room.js";
import { getActiveRoom } from "../serverStore.js";


const roomJoinHandler = (socket, data) => {
    const { roomId } = data;
    console.log("Attempting to join room with ID:", roomId);

    const participantDetails = {
        userId: socket.user.userId,
        socketId: socket.id,
    };

    // check if room exists
    const roomDetails = getActiveRoom(roomId);
    if (!roomDetails) {
      console.error("No active room found with ID:", roomId);
      return;
    }

    joinActiveRoom(roomId, participantDetails);

    // send information to users in room that they should prepare for incoming connection
    roomDetails.participants.forEach((participant) => {
        if (participant.socketId !== participantDetails.socketId) {
            socket.to(participant.socketId).emit("conn-prepare", {
                connUserSocketId: participantDetails.socketId,
            });
        }
    });
    updateRooms();
};

export { roomJoinHandler };