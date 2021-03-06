import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useGlobalContext } from "../context";
import Message from "./Message";

const EditTask = ({ taskData, setTaskData, taskId, due, setShowEdit }) => {
  const { showMessage, message, getAllTasks } = useGlobalContext();

  const [btnStatus, setbtnStatus] = useState({
    text: "Save",
    disabled: false,
  });

  const [match, setMatch] = useState(
    window.matchMedia("(min-width: 650px)").matches
  );

  const [originalDeadline, setOriginalDeadline] = useState("");

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

  const editTask = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Saving",
      disabled: true,
    }));

    // first check whether task deadline is at least 5 minutes after the current time
    // (not the case if deadline has not been changed and user is simply changing status)

    const fiveMinutes = 1000 * 60 * 5;
    const deadlineMilliseconds = new Date(taskData.due).getTime();

    const tempDate = new Date(taskData.due).toISOString();
    const isoDate = tempDate.substring(0, 19);

    if (originalDeadline.substring(0, 19) !== isoDate) {
      if (deadlineMilliseconds < Date.now() + fiveMinutes) {
        showMessage(
          true,
          "error-msg",
          "either keep original due time or choose one at least five minutes after current time"
        );

        setbtnStatus((btnData) => ({
          ...btnData,
          text: "Save",
          disabled: false,
        }));
        return;
      }
    }

    try {
      await axios.patch(`/api/v1/tasks/edit-task/${taskId}`, {
        task: taskData.task,
        info: taskData.info,
        due: isoDate,
        complete: taskData.complete,
      });
      getAllTasks();
    } catch (error) {
      showMessage(
        true,
        "error-msg",
        "Ooops, an error occured, please try again"
      );
    }
    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Save",
      disabled: false,
    }));
  };

  const handleChange = (e) => {
    setTaskData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setOriginalDeadline(due);
  }, [due]);

  if (match)
    return (
      <form onSubmit={editTask}>
        <h3 className="sub-head">Edit Task</h3>
        {message.show && <Message />}

        <div className="edit-task-block">
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
        <div>
          <span>
            <strong>Status: --</strong>
          </span>
          <input
            type="radio"
            id="incomplete"
            name="complete"
            value={false}
            className="radio-btn"
            onChange={handleChange}
          />
          <label htmlFor="incomplete">Incomplete</label>
          <span> -- </span>
          <input
            type="radio"
            id="done"
            name="complete"
            value={true}
            className="radio-btn"
            onChange={handleChange}
          />
          <label htmlFor="done">Done</label>
        </div>
        <div className="btn-task">
          <button
            className="edit-btn"
            disabled={btnStatus.disabled}
            type="submit"
          >
            {btnStatus.text}
          </button>
          <button className="edit-btn" onClick={() => setShowEdit(false)}>
            Cancel
          </button>
        </div>
      </form>
    );
  else
    return (
      <form onSubmit={editTask} style={{ textAlign: "center" }}>
        <h3 className="sub-head">Edit Task</h3>
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
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <p>
            <strong>Status:</strong>
          </p>
          <label htmlFor="incomplete">Incomplete--</label>
          <input
            type="radio"
            id="incomplete"
            name="complete"
            value={false}
            className="radio-btn"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="done">Done--</label>
          <input
            type="radio"
            id="done"
            name="complete"
            value={true}
            className="radio-btn"
            onChange={handleChange}
          />
        </div>
        <div className="btn-task">
          <button
            className="edit-btn"
            disabled={btnStatus.disabled}
            type="submit"
          >
            {btnStatus.text}
          </button>
          <button className="edit-btn" onClick={() => setShowEdit(false)}>
            Cancel
          </button>
        </div>
      </form>
    );
};

export default EditTask;
