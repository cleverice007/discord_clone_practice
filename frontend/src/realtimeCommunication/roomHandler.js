import { setOpenRoom, setIsUserJoinedOnlyWithAudio } from "../slices/roomSlice";
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




  export { createNewRoom}