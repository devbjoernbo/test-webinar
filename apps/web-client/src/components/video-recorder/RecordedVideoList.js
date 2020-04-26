import React from "react";
import RecorededVideo from "./RecordedVideo";

const RecorededVideoList = ({ recordedVideos }) => {
  return (
    <div>
      <h1>Recorded Videos</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {recordedVideos.map(recordedVideo => (
          <RecorededVideo
            key={recordedVideo.UUID}
            recordedVideo={recordedVideo.url}
          />
        ))}
      </div>
    </div>
  );
};

export default RecorededVideoList;
