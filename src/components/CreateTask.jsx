import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useGlobalContext } from "../context";
import Message from "./Message";

const CreateTask = ({ setCreateTaskWindow }) => {
  const { showMessage, message, getAllTasks } = useGlobalContext();

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

    return () =>
      window
        .matchMedia("(min-width: 650px)")
        .removeEventListener("change", checkWidth);
  });

  const createTask = async (e) => {
    e.preventDefault();

    // first check whether task deadline is at least 5 minutes after the current time

    const fiveMinutes = 1000 * 60 * 5;
    const deadlineMilliseconds = new Date(taskData.due).getTime();

    if (deadlineMilliseconds < Date.now() + fiveMinutes) {
      showMessage(
        true,
        "error-msg",
        "please choose due time at least five minutes after current time"
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

      getAllTasks();
      setCreateTaskWindow(false);
    } catch (err) {
      showMessage(
        true,
        "error-msg",
        "Ooops, an error occured, please try again"
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
    }
  };

  const handleChange = (e) => {
    setTaskData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  if (match)
    return (
      <div className="tasks-list">
        <form onSubmit={createTask}>
          <h3 className="sub-head">Create Task</h3>
          {message.show && <Message />}
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
              type="submit"
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
          {message.show && <Message />}
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
              type="submit"
            >
              {btnStatus.text}
            </button>
          </div>
        </form>
      </div>
    );
};

export default CreateTask;
