import store from "../store";
import { setLocalStream,setRemoteStreams } from "../slices/roomSlice";


const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};


const onlyAudioConstraints = {
    audio: true,
    video: false,
  };
  
  const defaultConstraints = {
    video: true,
    audio: true,
  };
  

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



  const addNewRemoteStream = (remoteStream) => {
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];
  
    store.dispatch(setRemoteStreams(newRemoteStreams));
  };