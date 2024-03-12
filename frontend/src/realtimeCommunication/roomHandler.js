import { setOpenRoom, setIsUserJoinedOnlyWithAudio } from "../slices/roomSlice";


const createNewRoom = () => {
    const successCalbackFunc = () => {
      store.dispatch(setOpenRoom(true, true));
  
      const audioOnly = store.getState().room.audioOnly;
      store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
      socketConnection.createNewRoom();
    };
  
    const audioOnly = store.getState().room.audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
  };




  export { createNewRoom}