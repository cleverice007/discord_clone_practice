import { setOpenRoom, setIsUserJoinedOnlyWithAudio,setRoomDetails,setActiveRooms } from "../slices/roomSlice";
import { createNewRoom as createNewRoomSocket, joinRoom as joinRoomSocket } from "./socketConnection.js";
import store from "../store";

 const createNewRoom = (onlyAudio, setLocalStream) => {
  const onlyAudioConstraints = {
    audio: true,
    video: false,
  };

  const defaultConstraints = {
    video: true,
    audio: true,
  };

  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    setLocalStream(stream);
    store.dispatch(setOpenRoom({ isUserRoomCreator: true, isUserInRoom: true }));
    store.dispatch(setIsUserJoinedOnlyWithAudio(onlyAudio));
    createNewRoomSocket();
  })
  .catch(err => {
    console.error("Cannot get an access to local stream", err);
  });
};
  
  const newRoomCreated = (data) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails));
  };
  const joinRoom = (roomId, onlyAudio, setLocalStream) => {
    const onlyAudioConstraints = { audio: true, video: false };
    const defaultConstraints = { video: true, audio: true };
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
    console.log("Joining room with ID:", roomId);

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        console.log("Successfully got local stream, now joining room with ID:", roomId);
        setLocalStream(stream);
        store.dispatch(setOpenRoom({ isUserRoomCreator: false, isUserInRoom: true }));
        store.dispatch(setIsUserJoinedOnlyWithAudio(onlyAudio));
        joinRoomSocket({roomId});
      })
      .catch(err => {
        console.error("Cannot get an access to local stream", err);
      });
};

 const updateActiveRooms = (data) => {
    const { activeRooms } = data;
    console.log('activeRooms',activeRooms)
    const friends = store.getState().friends.friends;
    const rooms = [];
    const userId = store.getState().auth.userDetails?.id;
  
    activeRooms.forEach((room) => {
      const isRoomCreatedByMe = room.roomCreator.userId === userId;
  
      if (isRoomCreatedByMe) {
        rooms.push({ ...room, creatorUsername: "Me" });
      } else {
        friends.forEach((f) => {
          if (f.id === room.roomCreator.userId) {
            rooms.push({ ...room, creatorUsername: f.username });
          }
        });
      }
    });
  
    store.dispatch(setActiveRooms({activeRooms: rooms}));
  };

  export { createNewRoom, newRoomCreated, joinRoom,updateActiveRooms}