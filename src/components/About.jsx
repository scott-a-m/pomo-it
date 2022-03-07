import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFreeCodeCamp,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

class About extends React.Component {
  render() {
    return (
      <div id="about">
        <h1 id="about-title">What is Pomo-it?</h1>
        <p>
          <span id="pomo-it">Pomo-it</span> a time management app featuring a
          timer and task manager to help you practice the{" "}
          <a
            href="https://francescocirillo.com/pages/pomodoro-technique"
            target="_blank"
            rel="noreferrer"
          >
            Pomodoro® Technique
          </a>
          , an effective time-management technique developed by Francesco
          Cirillo.
        </p>
        <p>
          The main idea is that you work in 25-minute intervals known as
          pomodoros (Italian for tomato), not letting anything distract you (if
          you think of something, jot it down and address it later) and having
          short breaks between them. This ultimately helps you to be more
          productive with your limited time and work more effectively - to{" "}
          <strong>
            <i>pomo-it!</i>
          </strong>
        </p>
        <div id="contact-block">
          <p id="designer">developed by Scott Mitchell</p>
          <a
            href="https://github.com/scott-a-m"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
          <a
            href="https://twitter.com/_scott_a_m"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
          <a
            href="https://www.freecodecamp.org/scott-a-m"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faFreeCodeCamp}
              size="2x"
              border
              className="contact-icon"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default About;
