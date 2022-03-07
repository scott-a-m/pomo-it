import React from "react";

const AccountFormRow = ({ name, type, value, onChangeFunc }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
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

export default AccountFormRow;
