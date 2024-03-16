import { setOpenRoom, setIsUserJoinedOnlyWithAudio,setRoomDetails,setActiveRooms } from "../slices/roomSlice";
import { createNewRoom as createNewRoomSocket, joinRoom as joinRoomSocket } from "./socketConnection.js";
import store from "../store";
import {getLocalStreamPreview} from "./webRTCHandler.js";

const createNewRoom = () => {
    const successCalbackFunc = () => {
      store.dispatch(setOpenRoom(true, true));
  
      const audioOnly = store.getState().room.audioOnly;
      store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
      createNewRoomSocket();    };
  
    const audioOnly = store.getState().room.audioOnly;
    getLocalStreamPreview(audioOnly, successCalbackFunc);
  };
  
  const newRoomCreated = (data) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails));
  };

 const joinRoom = (roomId) => {
    const successCalbackFunc = () => {
      store.dispatch(setRoomDetails({ roomId }));
      store.dispatch(setOpenRoom(false, true));
      const audioOnly = store.getState().room.audioOnly;
      store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
      joinRoomSocket({ roomId });
    };
  
    const audioOnly = store.getState().room.audioOnly;
    getLocalStreamPreview(audioOnly, successCalbackFunc);
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