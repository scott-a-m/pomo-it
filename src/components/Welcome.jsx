import React from "react";

class Welcome extends React.Component {
  render() {
    return (
      <div id="welcome">
        <h1 id="welcome-title">Pomo-it</h1>
        <h1 id="welcome-subtitle">
          <a href="#about" className="start-link">
            Start Your Time-management Journey
          </a>
        </h1>
      </div>
    );
  }
}

export default Welcome;
