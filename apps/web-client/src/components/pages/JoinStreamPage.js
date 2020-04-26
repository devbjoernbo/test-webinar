import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const JoinStreamPage = ({ handleJoinStream }) => {
  const [UUID] = useState(uuidv4());

  return (
    <div>
      <div> {"Use this key as ID on your broadcasting service"}</div>
      <p>{UUID}</p>

      <button
        onClick={() => {
          handleJoinStream(UUID);
        }}
      >
        {"Join Stream"}
      </button>
    </div>
  );
};

export default JoinStreamPage;
