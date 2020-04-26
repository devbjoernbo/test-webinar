import React, { useCallback, useEffect, useRef, useMemo } from "react";

import { useMachine } from "@xstate/react";
import { recorderMachine } from "../machines/stream-recorder/recorderMachine";

const useRecordManager = currentStreamRef => {
  // Memoize machine
  const machine = useMemo(() => recorderMachine, []);

  const [
    {
      context: { isRecording, recordedVideos }
    },
    send
  ] = useMachine(machine);
  let currentRecordedVideo = useRef([]);
  let mediaRecorder = useRef(null);

  useEffect(() => {
    if (currentStreamRef.current) {
      mediaRecorder.current = new MediaRecorder(
        currentStreamRef.current.captureStream(25)
      );
      mediaRecorder.current.ondataavailable = event => {
        console.log("test");
        currentRecordedVideo.current.push(event.data);
      };
      console.log(mediaRecorder.current);

      mediaRecorder.current.onstop = event => {
        let blob = new Blob(currentRecordedVideo.current, {
          type: "flv"
        });
        let videoURL = window.URL.createObjectURL(blob);
        send("IN_ACTIVATE", { videoURL });
        currentRecordedVideo.current = [];
      };
    }
  }, [recordedVideos]);

  const handleStartRecording = useCallback(() => {
    mediaRecorder.current.start();
    send("ACTIVATE");
  }, [send]);

  const handleStopRecording = useCallback(() => {
    mediaRecorder.current.stop();
  }, []);

  return {
    isRecording,
    recordedVideos,
    handleStartRecording,
    handleStopRecording
  };
};

export default useRecordManager;
