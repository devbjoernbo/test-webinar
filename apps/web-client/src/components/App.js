import React, { useCallback, useState, useRef } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";

import { clientsMachine } from "../machines/stream/streamMachine";
import { useMachine } from "@xstate/react";
import StreamingPage from "./pages/StreamingPage";
import JoinStreamPage from "./pages/JoinStreamPage";

const App = ({ history }) => {
  const [
    {
      context: { connectedClients }
    },
    clientsMachineSend,
    clientsMachineService
  ] = useMachine(clientsMachine);

  clientsMachineService.start();

  const handleJoinStream = useCallback(UUID => {
    clientsMachineSend("ADD_CLIENT", {
      client: {
        UUID,
        url: `http://localhost/live/${UUID}`,
        clientName: "Nicolai"
      }
    });
    history.push("streaming-page");
  });

  console.log(connectedClients);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/join-stream">About</Link>
          </li>
          <li>
            <Link to="/streaming-page">Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/">
          <JoinStreamPage handleJoinStream={handleJoinStream} />
        </Route>

        <Route path="/streaming-page">
          <StreamingPage connectedClients={connectedClients} />
        </Route>
      </Switch>
    </div>
  );
};

// const StreamCreate = () => {
//   const handleOnSubmit = useCallback(submittedValues => {
//     console.log(submittedValues);
//   }, []);

//   return (
//     <Form
//       inputs={[
//         { labelName: "Titel", type: "text", name: "title" },
//         {
//           labelName: "Description",
//           type: "text",
//           name: "description",
//           value: ""
//         }
//       ]}
//       handleOnSubmit={handleOnSubmit}
//     />
//   );
// };

// const Main = () => {
//   const videoRef = useRef(null);

//   const [
//     {
//       context: { isStreamStarted }
//     },
//     streamMachineSend,
//     streamMachineService
//   ] = useMachine(streamMachine);

//   streamMachineService.start();

//   return (
//     <div>
//       <VideoStreamer
//         ref={videoRef}
//         sendIsStreamStarted={streamMachineSend}
//         stream={{ ID: "test" }}
//       />

//       {isStreamStarted ? <VideoRecorder ref={videoRef} /> : null}
//     </div>
//   );
// };

export default withRouter(App);
