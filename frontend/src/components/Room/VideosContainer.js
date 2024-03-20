import React from "react";
import { useSelector } from "react-redux";
import Video from "./Video";

const VideosContainer = () => {
  const { localStream, remoteStreams, screenSharingStream } = useSelector((state) => state.room);

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
