import React from "react";

interface VideoProps {
  video: string; // The name of the video file without the extension
  style?: React.CSSProperties; // Optional inline styles for the video
  autoPlay?:boolean;
}

const Video: React.FC<VideoProps> = ({ video, style }) => {
  return (
    <video
      style={style}
      className="w-full object-cover"
      src={`/assets/videos/${video}.mp4`}
      autoPlay
      loop
      muted
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;