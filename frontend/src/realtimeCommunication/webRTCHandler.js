import store from "../store";
import { setLocalStream } from "../slices/roomSlice";

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        store.dispatch(setLocalStream(stream));
        callbackFunc();
      })
      .catch((err) => {
        console.log(err);
        console.log("Cannot get an access to local stream");
      });
  };