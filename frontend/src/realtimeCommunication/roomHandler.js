import { setOpenRoom, setIsUserJoinedOnlyWithAudio,setRoomDetails } from "../slices/roomSlice";
import { createNewRoom as createNewRoomSocket } from "./socketConnection";
import store from "../store";
import {getLocalStreamPreview} from "./webRTCHandler";

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



  export { createNewRoom, newRoomCreated}