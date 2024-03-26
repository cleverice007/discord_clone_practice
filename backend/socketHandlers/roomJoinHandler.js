import { joinActiveRoom } from "../serverStore.js";
import { updateRooms } from "./updates/room.js";
import { getActiveRoom } from "../serverStore.js";

const roomJoinHandler = (socket, data) => {
    const { roomId } = data;

    const participantDetails = {
        userId: socket.user.userId,
        socketId: socket.id,
    };
    console.log('participantDetails', participantDetails.socketId);

    // 先加入活跃房间，更新参与者列表
    joinActiveRoom(roomId, participantDetails);

    // 再重新获取房间的最新详情，以确保包含所有更新
    const updatedRoomDetails = getActiveRoom(roomId);

    updatedRoomDetails.participants.forEach((participant) => {
        if (participant.socketId !== participantDetails.socketId) {
            console.log(`emit to ${participant.socketId}`);
            socket.to(participant.socketId).emit("conn-prepare", {
                connUserSocketId: participantDetails.socketId,
            });
        }
    });

    updateRooms();
};


export { roomJoinHandler };