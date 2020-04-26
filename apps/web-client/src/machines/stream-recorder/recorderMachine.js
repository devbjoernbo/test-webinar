import { Machine, assign } from "xstate";
import { v4 as uuidv4 } from "uuid";

export const recorderMachine = Machine({
  id: "recorder",
  initial: "inactive",

  context: {
    isRecording: false,
    recordedVideos: []
  },

  states: {
    inactive: {
      on: {
        ACTIVATE: {
          target: "active",
          actions: assign({
            isRecording: true
          })
        }
      }
    },
    active: {
      on: {
        IN_ACTIVATE: {
          target: "inactive",
          actions: assign({
            isRecording: false,
            recordedVideos: (context, event) => {
              const videosClone = context.recordedVideos.slice(0);

              console.log({ event });
              videosClone.unshift({ url: event.videoURL, UUID: uuidv4() });

              return videosClone;
            }
          })
        }
      }
    }
  }
});
