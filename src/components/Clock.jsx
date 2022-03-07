import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faPlay,
  faPause,
  faSeedling,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      play: false,
      timerInterval: "",
      timerType: "Session",
      initiate: false,
      matches: window.matchMedia("(min-width: 650px)").matches,
    };

    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.reset = this.reset.bind(this);
    this.countdown = this.countdown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.switchTimerCheck = this.switchTimerCheck.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.createClock = this.createClock.bind(this);
    this.checkWidth = this.checkWidth.bind(this);
  }

  componentDidMount() {
    window
      .matchMedia("(min-width: 650px)")
      .addEventListener("change", this.checkWidth);
  }

  componentWillUnmount() {
    window
      .matchMedia("(min-width: 650px)")
      .removeEventListener("change", this.checkWidth);
  }

  checkWidth(event) {
    this.setState({ matches: event.matches });
  }

  incrementBreak() {
    if (this.state.play) {
      return;
    } else {
      if (this.state.timerInterval) {
        this.setState({
          sessionLength: this.state.sessionLength,
          timeLeft: this.state.sessionLength * 60,
          timerInterval: clearInterval(this.state.timerInterval),
          timerType: "Session",
          initiate: false,
        });
      }

      if (this.state.breakLength === 60) {
        return;
      } else {
        this.setState({ breakLength: this.state.breakLength + 1 });
      }
    }
  }

  decrementBreak() {
    if (this.state.play) {
      return;
    } else {
      if (this.state.timerInterval) {
        this.setState({
          sessionLength: this.state.sessionLength,
          timeLeft: this.state.sessionLength * 60,
          timerInterval: clearInterval(this.state.timerInterval),
          timerType: "Session",
          initiate: false,
        });
      }

      if (this.state.breakLength === 1) {
        return;
      } else {
        this.setState({ breakLength: this.state.breakLength - 1 });
      }
    }
  }

  incrementSession() {
    if (this.state.play) {
      return;
    } else {
      if (this.state.timerInterval) {
        this.setState({
          timerInterval: clearInterval(this.state.timerInterval),
          timerType: "Session",
          initiate: false,
        });
      }

      if (this.state.sessionLength === 60) {
        return;
      } else {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          timeLeft: (this.state.sessionLength + 1) * 60,
        });
      }
    }
  }

  decrementSession() {
    if (this.state.play) {
      return;
    } else {
      if (this.state.timerInterval) {
        this.setState({
          timerInterval: clearInterval(this.state.timerInterval),
          timerType: "Session",
          initiate: false,
        });
      }

      if (this.state.sessionLength === 1) {
        return;
      } else {
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          timeLeft: (this.state.sessionLength - 1) * 60,
        });
      }
    }
  }

  countdown() {
    if (this.state.play) {
      this.setState({ play: false });
    }

    if (!this.state.play) {
      this.setState({ play: true });
    }

    if (!this.state.initiate) {
      this.setState({
        timerInterval: setInterval(() => {
          this.decrementTimer();
          this.switchTimerCheck();
          this.createClock();
        }, 1000),
      });
    }

    this.setState({ initiate: true });
  }

  decrementTimer() {
    if (!this.state.play) {
      return;
    } else {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
    }
  }

  switchTimerCheck() {
    let timer = this.state.timeLeft;

    if (timer < 0) {
      if (this.state.timerInterval) {
        clearInterval(this.state.timerInterval);
        const sound = document.getElementById("beep");
        sound.play();
        sound.currentTime = 0;
      }
      if (this.state.timerType === "Session") {
        this.setState({ initiate: false });
        this.switchTimer(this.state.breakLength * 60, "Break");
        this.countdown();
      } else {
        this.setState({ initiate: false });
        this.switchTimer(this.state.sessionLength * 60, "Session");
        this.countdown();
      }
    }
  }

  switchTimer(num, str) {
    this.setState({
      timeLeft: num,
      timerType: str,
    });
  }

  createClock() {
    let duration = this.state.timeLeft;
    let min = parseInt(duration / 60, 10);
    let sec = parseInt(duration % 60, 10);

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let time = min + ":" + sec;

    return time;
  }

  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      play: false,
      timerInterval: clearInterval(this.state.timerInterval),
      timerType: "Session",
      initiate: false,
    });

    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }

  render() {
    return (
      <div>
        <div>
          {this.state.matches && (
            <div id="frame">
              <div className="container-fluid">
                <div id="control-wrapper" className="row">
                  <div id="timer-title" className="col-12">
                    Pomo-it <FontAwesomeIcon icon={faSeedling} />
                  </div>
                  <div id="controls" className="col-4">
                    <label id="break-label">Break Length</label>
                    <br />
                    <button id="break-increment" onClick={this.incrementBreak}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button id="break-decrement" onClick={this.decrementBreak}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span id="break-length">{this.state.breakLength}</span>
                    <label id="session-label">Session Length</label>
                    <br />
                    <button
                      id="session-increment"
                      onClick={this.incrementSession}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      id="session-decrement"
                      onClick={this.decrementSession}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span id="session-length">{this.state.sessionLength}</span>
                  </div>
                  <div id="display" className="col-7">
                    <label id="timer-label">{this.state.timerType}</label>
                    <p id="time-left">{this.createClock()}</p>
                  </div>
                  <div id="buttons" className="col-1">
                    <button id="start_stop" onClick={this.countdown}>
                      <FontAwesomeIcon icon={faPlay} />

                      <FontAwesomeIcon icon={faPause} />
                    </button>
                    <button id="reset" onClick={this.reset}>
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <audio
                  src="https://www.fesliyanstudios.com/play-mp3/6732"
                  id="beep"
                ></audio>
              </div>
            </div>
          )}
          {!this.state.matches && (
            <div id="frame">
              <div className="container-fluid">
                <div id="control-wrapper" className="row">
                  <div id="timer-title" className="col-12">
                    Pomo-it <FontAwesomeIcon icon={faSeedling} />
                  </div>
                  <div id="controls" className="col-12">
                    <label id="break-label">Break Length</label>
                    <br />
                    <button id="break-increment" onClick={this.incrementBreak}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button id="break-decrement" onClick={this.decrementBreak}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span id="break-length">{this.state.breakLength}</span>
                    <label id="session-label">Session Length</label>
                    <br />
                    <button
                      id="session-increment"
                      onClick={this.incrementSession}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      id="session-decrement"
                      onClick={this.decrementSession}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span id="session-length">{this.state.sessionLength}</span>
                  </div>
                  <div id="display" className="col-12">
                    <label id="timer-label">{this.state.timerType}</label>
                    <p id="time-left">{this.createClock()}</p>
                  </div>
                  <div id="buttons" className="col-12">
                    <button id="start_stop" onClick={this.countdown}>
                      <FontAwesomeIcon icon={faPlay} />
                      <FontAwesomeIcon icon={faPause} />
                    </button>
                    <button id="reset" onClick={this.reset}>
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <audio
                  src="https://www.fesliyanstudios.com/play-mp3/6732"
                  id="beep"
                ></audio>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Clock;
