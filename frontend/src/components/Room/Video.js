import React, { useEffect, useRef } from "react";

const Video = ({ stream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
      };
    }
  }, [stream]);

  return (
    <div className="h-1/2 w-1/2 bg-black rounded-lg">
      <video
        ref={videoRef}
        autoPlay
        muted={isLocalStream}
        className="w-full h-full"
      />
    </div>
  );
};

export default Video;
