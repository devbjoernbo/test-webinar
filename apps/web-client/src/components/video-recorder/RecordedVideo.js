import React from "react";
import RecorededVideoContainer from "./RecordedVideoContainer";

const RecorededVideo = ({ recordedVideo }) => {
  return (
    <RecorededVideoContainer>
      <video
        src={recordedVideo}
        style={{ width: "400px", height: "400px" }}
        controls
      >
        {"Testing video stream"}
      </video>
    </RecorededVideoContainer>
  );
};

export default RecorededVideo;
