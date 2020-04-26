import React, { useCallback } from "react";
import Form from "../../reuseable-components/forms/BasicForm";

const RecorededVideoContainer = ({ children }) => {
  const handleOnSubmit = useCallback(submittedValues => {
    console.log(submittedValues);
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Form
        inputs={[
          { labelName: "Titel", type: "text", name: "title", value: "Test" }
        ]}
        handleOnSubmit={handleOnSubmit}
      />
      {children}
    </div>
  );
};

export default RecorededVideoContainer;
