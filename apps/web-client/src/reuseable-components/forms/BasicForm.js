import React, { useCallback, useState } from "react";

const Form = ({ inputs, handleOnSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleOnChange = useCallback(
    event => {
      const { name, value } = event.target;
      setFormData(state => {
        const stateClone = { ...state };
        stateClone[name] = value;

        return stateClone;
      });
    },
    [setFormData]
  );

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        handleOnSubmit(formData);
      }}
    >
      {inputs.map(({ labelName, type, name, value }) => (
        <FormInput
          key={name}
          handleOnChange={handleOnChange}
          labelName={labelName}
          type={type}
          name={name}
          value={formData[name] || ""}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

const FormInput = ({ labelName, handleOnChange, type, name, value }) => {
  return (
    <label>
      {labelName}
      <input type={type} name={name} value={value} onChange={handleOnChange} />
    </label>
  );
};

export default Form;
