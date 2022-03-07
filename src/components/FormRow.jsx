import React from "react";

const FormRow = ({ name, type, value, onChangeFunc }) => {
  return (
    <div className="">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChangeFunc}
        className="form-input"
        required={true}
      />
    </div>
  );
};

export default FormRow;
