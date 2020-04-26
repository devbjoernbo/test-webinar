import React from "react";

import useRecordManager from "../../managers/useRecordManager";
import RecorededVideoList from "./RecordedVideoList";

const VideoRecorder = React.forwardRef(({}, currentStreamRef) => {
  const {
    isRecording,
    recordedVideos,
    handleStartRecording,
    handleStopRecording
  } = useRecordManager(currentStreamRef);

  return (
    <div>
      <button onClick={() => handleStartRecording()}>Start recordion</button>
      <button onClick={() => handleStopRecording()}>Stop recording</button>
      {isRecording ? "Recording" : null}
      {recordedVideos.length > 0 ? (
        <RecorededVideoList recordedVideos={recordedVideos} />
      ) : null}
    </div>
  );
});

export default VideoRecorder;
