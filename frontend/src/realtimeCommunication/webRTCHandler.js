import store from "../store";
import Peer from "simple-peer";
import { setRemoteStreams } from "../slices/roomSlice";
import { signalPeerData } from "./socketConnection";


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
  

  export const getLocalStreamPreview = (onlyAudio = false, callbackFunc, setLocalStream) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setLocalStream(stream);
        callbackFunc();
      })
      .catch((err) => {
        console.log(err);
        console.log("Cannot get an access to local stream");
      });
  };
  let peers = {};

  export const prepareNewPeerConnection = (connUserSocketId, isInitiator, localStream) => {

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    // add new remote stream to server store
    console.log("remote stream came from other user");
    console.log("direct connection has been established");
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};



  const addNewRemoteStream = (remoteStream) => {
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];
  
    store.dispatch(setRemoteStreams(newRemoteStreams));
  };

  export const handleSignalingData = (data) => {
    const { connUserSocketId, signal } = data;
  
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].signal(signal);
    }
  };