import React, { createContext, useContext, useState } from 'react';

const StreamContext = createContext();

export const useStream = () => useContext(StreamContext);

export const StreamProvider = ({ children }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  return (
    <StreamContext.Provider value={{ localStream, setLocalStream, remoteStreams, setRemoteStreams, screenSharingStream, setScreenSharingStream }}>
      {children}
    </StreamContext.Provider>
  );
};
