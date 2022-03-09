import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const DeleteTask = ({
  taskData,
  getAllTasks,
  taskId,
  setItemId,
  itemId,
  showMessage,
  message,
  setMessage,
  cat,
  setCat,
}) => {
  const [btnStatus, setbtnStatus] = useState({
    text: "DELETE",
    disabled: false,
  });

  const deleteTask = async (taskId) => {
    setbtnStatus({
      text: "DELETE",
      disabled: true,
    });
    try {
      await axios.delete(`/api/v1/tasks/delete-task/${taskId}`);
      getAllTasks();
      setItemId("");
      setCat(null);
    } catch (error) {
      console.log(error);
      showMessage("error-msg", "Oops an error occured. Please try again", 5000);
    }
    setbtnStatus({
      text: "DELETE",
      disabled: false,
    });
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    setItemId("");
  };

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      hidden={itemId === taskId && cat === "delete" ? false : true}
      className="delete-task-block"
    >
      <h3 className="sub-head">Delete Task</h3>
      {message && message}
      <div className="error-msg">
        <p style={{ fontSize: "1.2rem" }}>
          Are you sure you want to delete Task:
        </p>
        <p className="delete-task-name">{taskData.task}</p>
      </div>
      <div className="btn-task">
        <button
          className="edit-btn"
          disabled={btnStatus.disabled}
          onClick={() => deleteTask(taskId)}
        >
          {btnStatus.text}
        </button>
        <button
          className="edit-btn"
          onClick={cancelDelete}
          style={{ color: "black" }}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default DeleteTask;
