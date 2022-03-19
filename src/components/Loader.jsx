import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

const Loader = ({ loaderPosition }) => {
  return (
    <div
      className="loader-wrapper"
      style={loaderPosition && { height: loaderPosition }}
    >
      <div className="form-box">
        <p className="logo" style={{ fontSize: "3rem" }}>
          Pomo-i
          <FontAwesomeIcon icon={faSeedling} />
        </p>
        <p className="task-name">
          {loaderPosition ? "loading" : "loading task manager"}
        </p>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
