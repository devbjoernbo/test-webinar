import React, { useEffect, useRef } from "react";
import flvjs from "flv.js";

const VideoStreamer = ({ client }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    let flvPlayer;
    if (flvjs.isSupported()) {
      if (isMounted) {
        flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: `http://localhost:8000/live/${client.UUID}.flv`
        });

        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();
        flvPlayer.play();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [client]);

  return (
    <video ref={videoRef} style={{ width: "250px", height: "250px" }} controls>
      {"Testing video stream"}
    </video>
  );
};

// const VideoStreamer = React.forwardRef(
//   ({ stream, sendIsStreamStarted }, videoRef) => {
//     useEffect(() => {
//       if (flvjs.isSupported()) {
//         let flvPlayer = flvjs.createPlayer({
//           type: "flv",
//           url: `http://localhost:8000/live/${stream.ID}.flv`
//         });

//         flvPlayer.attachMediaElement(videoRef.current);
//         flvPlayer.load();
//         flvPlayer.play();
//         sendIsStreamStarted("ACTIVATE");
//       }
//     }, []);

//     return (
//       <video ref={videoRef} style={{ width: "100%", height: "100%" }} controls>
//         {"Testing video stream"}
//       </video>
//     );
//   }
// );

export default VideoStreamer;
