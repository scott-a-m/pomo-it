import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <div className="form-wrapper">
      <div className="form-box">
        <p className="logo" style={{ fontSize: "3rem" }}>
          Pomo-it
          <FontAwesomeIcon icon={faSeedling} />
        </p>
        <p className="task-name">loading...</p>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
