import React, { useEffect } from "react";
import WelcomeVideo from "../../assets/WelcomeVideo.mp4";

const VideoWelcome = () => {
  useEffect(() => {
    const videoElement = document.getElementById("welcome-video");

    const handleVideoEnded = () => {
      window.location.href = "/";
    };

    videoElement.addEventListener("ended", handleVideoEnded);

    return () => {
      videoElement.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  return (
    <div className="video-container-welcome">
      <video id="welcome-video" autoPlay controls>
        <source src={WelcomeVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoWelcome;
