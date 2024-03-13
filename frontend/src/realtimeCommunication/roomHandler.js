import { setOpenRoom, setIsUserJoinedOnlyWithAudio,setRoomDetails } from "../slices/roomSlice";
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
  


  export { createNewRoom, newRoomCreated, joinRoom}