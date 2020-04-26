import React, { useCallback, useState } from "react";
import VideoStreamer from "../video-streamer/VideoStreamer";
import Form from "../../reuseable-components/forms/BasicForm";
import { v4 as uuidv4 } from "uuid";

const StreamingPage = ({ connectedClients }) => {
  if (connectedClients.length == 0) {
    return <div>...loading</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "grey",
        color: "white",
        border: "2px solid black",
        paddingBottom: "35px"
      }}
    >
      <h1 style={{ textAlign: "center" }}>Conference Streaming</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        {connectedClients.map(connectedClient => (
          <div key={connectedClient.UUID} style={{ textAlign: "center" }}>
            <h1>{connectedClient.clientName}</h1>
            <VideoStreamer client={connectedClient} />
          </div>
        ))}
      </div>
      <Comments />
    </div>
  );
};

const Comments = () => {
  const [comments, setComments] = useState([]);
  const handleOnSubmit = useCallback(
    submittedValues => {
      setComments(state => {
        const stateClone = state.slice(0);

        stateClone.push({ UUID: uuidv4(), text: submittedValues.comment });

        return stateClone;
      });
      console.log(submittedValues);
    },
    [setComments]
  );

  return (
    <>
      <div>
        <Form
          inputs={[
            {
              labelName: "Comment",
              type: "text",
              name: "comment",
              value: "Comment"
            }
          ]}
          handleOnSubmit={handleOnSubmit}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        {comments.map(comment => (
          <Comment key={comment.UUID} comment={comment} />
        ))}
      </div>
    </>
  );
};

const Comment = ({ comment }) => {
  return <div>{comment.text}</div>;
};

export default StreamingPage;
