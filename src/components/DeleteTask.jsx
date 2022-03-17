import axios from "axios";
import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../context";
import Message from "./Message";

const DeleteTask = ({
  taskData,
  getAllTasks,
  taskId,
  setItemId,
  itemId,
  cat,
  setCat,
}) => {
  const { showMessage, message } = useGlobalContext();

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
      showMessage(true, "error-msg", "Oops an error occured. Please try again");
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

  return (
    <div
      hidden={itemId === taskId && cat === "delete" ? false : true}
      className="delete-task-block"
    >
      <h3 className="sub-head">Delete Task</h3>
      {message && <Message />}
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
