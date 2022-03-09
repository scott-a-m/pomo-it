import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const EditTask = ({
  taskData,
  setTaskData,
  getAllTasks,
  taskId,
  setItemId,
  itemId,
  createDateTimeString,
  showMessage,
  message,
  setMessage,
}) => {
  const [btnStatus, setbtnStatus] = useState({
    text: "Save",
    disabled: false,
  });

  const editTask = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Saving",
      disabled: true,
    }));

    const tempDate = new Date(taskData.due).toISOString();
    const isoDate = tempDate.substring(0, 19);

    try {
      await axios.patch(`/api/v1/tasks/edit-task/${taskId}`, {
        task: taskData.task,
        info: taskData.info,
        due: isoDate,
        complete: taskData.complete,
      });
      getAllTasks();
      setItemId("");
    } catch (error) {
      showMessage(
        "error-msg",
        "Ooops, an error occured, please try again",
        5000
      );
    }
    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Save",
      disabled: false,
    }));
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setItemId("");
  };

  const handleChange = (e) => {
    setTaskData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (itemId) {
      setTaskData((data) => ({
        ...data,
        due: createDateTimeString(taskData.due),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return (
    <form hidden={itemId === taskId ? false : true} onSubmit={editTask}>
      <h3 className="sub-head">Edit Task</h3>
      {message && message}

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
        <button className="edit-btn" disabled={btnStatus.disabled}>
          {btnStatus.text}
        </button>
        <button className="edit-btn" onClick={cancelEdit}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTask;
