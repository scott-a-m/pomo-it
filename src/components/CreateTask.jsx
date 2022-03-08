import axios from "axios";
import React from "react";
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

  const createTask = async (e) => {
    e.preventDefault();

    console.log("hi");
    console.log(taskData.due);

    // setTaskData((data) => ({
    //   ...data,
    //   due: ms,
    // }));

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Loading",
      disabled: true,
    }));

    try {
      await axios.post(`/api/v1/tasks/create-task`, taskData);
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
};

export default CreateTask;
