import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const CreateTask = ({
  setCreateTaskWindow,
  getAllTasks,
  showMessage,
  message,
  setMessage,
}) => {
  const [taskData, setTaskData] = useState({
    task: "",
    info: "",
    due: "",
  });

  const [btnStatus, setbtnStatus] = useState({
    text: "Create",
    disabled: false,
  });

  const [match, setMatch] = useState(
    window.matchMedia("(min-width: 650px)").matches
  );

  const checkWidth = (event) => {
    setMatch(event.matches);
  };
  useEffect(() => {
    window
      .matchMedia("(min-width: 650px)")
      .addEventListener("change", checkWidth);
  });

  const createTask = async (e) => {
    e.preventDefault();

    // first check whether task deadline is at least 5 minutes after the current time

    const fiveMinutes = 1000 * 60 * 5;
    const deadlineMilliseconds = new Date(taskData.due).getTime();

    if (deadlineMilliseconds < Date.now() + fiveMinutes) {
      showMessage(
        "error-msg",
        "please choose due time at least five minutes after current time",
        5000
      );

      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Create",
        disabled: false,
      }));
      return;
    }

    const tempDate = new Date(taskData.due).toISOString();

    const isoDate = tempDate.substring(0, 19);

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Loading",
      disabled: true,
    }));

    try {
      await axios.post(`/api/v1/tasks/create-task`, {
        task: taskData.task,
        info: taskData.info,
        due: isoDate,
      });
      setTaskData(() => ({
        task: "",
        info: "",
        due: "",
      }));
      setbtnStatus((btnData) => ({
        text: "Create",
        disabled: false,
      }));

      setCreateTaskWindow(false);
      getAllTasks();
    } catch (err) {
      showMessage(
        "error-msg",
        "Ooops, an error occured, please try again",
        5000
      );
      setTaskData(() => ({
        task: "",
        info: "",
        due: "",
      }));
      setbtnStatus((btnData) => ({
        text: "Create",
        disabled: false,
      }));
      console.log("error has occured");
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setTaskData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (match)
    return (
      <div className="tasks-list">
        <form onSubmit={createTask}>
          <h3 className="sub-head">Create Task</h3>
          {message && message}
          <div className="create-task-block">
            <div className="label-block">
              <label htmlFor="task" className="create-task-label">
                Task
              </label>
              <label htmlFor="info" className="create-task-label">
                Info
              </label>
              <label htmlFor="due" className="create-task-label">
                Due
              </label>
            </div>
            <div className="input-block">
              <input
                type="text"
                value={taskData.task}
                name="task"
                onChange={handleChange}
                className="form-input"
                required={true}
              />
              <input
                type="text"
                value={taskData.info}
                name="info"
                onChange={handleChange}
                className="form-input"
                required={true}
              />
              <input
                type="datetime-local"
                value={taskData.due}
                name="due"
                onChange={handleChange}
                className="form-input"
                required={true}
              />
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              className="edit-btn"
              disabled={btnStatus.disabled}
              style={{ margin: "1rem" }}
            >
              {btnStatus.text}
            </button>
          </div>
        </form>
      </div>
    );
  else
    return (
      <div className="tasks-list">
        <form onSubmit={createTask} style={{ textAlign: "center" }}>
          <h3 className="sub-head">Create Task</h3>
          {message && message}
          <label htmlFor="task">Task</label>
          <input
            type="text"
            value={taskData.task}
            name="task"
            onChange={handleChange}
            className="form-input"
            required={true}
          />
          <label htmlFor="info">Info</label>
          <input
            type="text"
            value={taskData.info}
            name="info"
            onChange={handleChange}
            className="form-input"
            required={true}
          />
          <label htmlFor="due">Due</label>
          <input
            type="datetime-local"
            value={taskData.due}
            name="due"
            onChange={handleChange}
            className="form-input"
            required={true}
          />
          <div style={{ textAlign: "center" }}>
            <button
              className="edit-btn"
              disabled={btnStatus.disabled}
              style={{ margin: "1rem" }}
            >
              {btnStatus.text}
            </button>
          </div>
        </form>
      </div>
    );
};

export default CreateTask;
