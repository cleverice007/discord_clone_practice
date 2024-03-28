import store from "../store";
import Peer from "simple-peer";
import { setRemoteStreams,setLocalStream } from "../slices/roomSlice";
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
  

  export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        store.dispatch(setLocalStream({ localStream: stream }));
        callbackFunc();
      })
      .catch((err) => {
        console.log(err);
        console.log("Cannot get an access to local stream");
      });
  };
  let peers = {};

  export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
    const localStream = store.getState().room.localStream;
    console.log(`Preparing new peer connection. Initiator: ${isInitiator}, ConnUserSocketId: ${connUserSocketId}`);
    console.log(`Local stream: ${localStream}`);  
    peers[connUserSocketId] = new Peer({
      initiator: isInitiator,
      config: getConfiguration(),
      stream: localStream,
    });
    
    peers[connUserSocketId].on("signal", (data) => {
      console.log(`Signal received from peer ${connUserSocketId}`);
      const signalData = {
        signal: data,
        connUserSocketId: connUserSocketId,
      };
      signalPeerData(signalData);
    });
    
    peers[connUserSocketId].on("stream", (remoteStream) => {
      console.log(`Remote stream received from user ${connUserSocketId}`, remoteStream);
      addNewRemoteStream(remoteStream);
    });
  };


  const addNewRemoteStream = (remoteStream) => {
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];
    console.log('newRemoteStreams',newRemoteStreams)
    store.dispatch(setRemoteStreams({ remoteStreams: newRemoteStreams }));
    console.log('remoteStreams',store.getState().room.remoteStreams);
  };

  export const handleSignalingData = (data) => {
    const { connUserSocketId, signal } = data;
  
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].signal(signal);
    }
  };

  export const closeAllConnections = () => {
    Object.entries(peers).forEach((mappedObject) => {
      const connUserSocketId = mappedObject[0];
      if (peers[connUserSocketId]) {
        peers[connUserSocketId].destroy();
        delete peers[connUserSocketId];
      }
    });
  };

  export const handleParticipantLeftRoom = (data) => {
    const { connUserSocketId } = data;
  
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  
    const remoteStreams = store.getState().room.remoteStreams;
  
    const newRemoteStreams = remoteStreams.filter(
      (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
    );
  
    store.dispatch(setRemoteStreams({remoteStreams: newRemoteStreams}));
  };

  export const switchOutgoingTracks = (stream) => {
    for (let socket_id in peers) {
      for (let index in peers[socket_id].streams[0].getTracks()) {
        for (let index2 in stream.getTracks()) {
          if (
            peers[socket_id].streams[0].getTracks()[index].kind ===
            stream.getTracks()[index2].kind
          ) {
            peers[socket_id].replaceTrack(
              peers[socket_id].streams[0].getTracks()[index],
              stream.getTracks()[index2],
              peers[socket_id].streams[0]
            );
            break;
          }
        }
      }
    }
  };