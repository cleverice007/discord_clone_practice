import React from "react";
import Video from "./Video";
import { useSelector } from "react-redux";

const VideosContainer = () => {
  //const { localStream, remoteStreams, screenSharingStream } = useStream();
  const localStream = useSelector((state) => state.room.localStream);
  const remoteStreams = useSelector((state) => state.room.remoteStreams);
  const screenSharingStream = useSelector((state) => state.room.screenSharingStream);
console.log('screenSharingStream',screenSharingStream)

  return (
    <div className="h-5/6 w-full flex flex-wrap">
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
    </div>
  );
};

export default VideosContainer;
