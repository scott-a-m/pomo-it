import { useEffect } from "react";
import { useState } from "react";
import EditTask from "../components/EditTask";

import { useGlobalContext } from "../context";

import { DateTime } from "luxon";

const SingleTask = ({ task, info, createdAt, due, _id, complete }) => {
  const { showMessage, setDeleteWindow } = useGlobalContext();
  const [showInfo, setShowInfo] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [taskData, setTaskData] = useState({
    task,
    info,
    due,
  });

  const displayDateTimeString = (date) => {
    return DateTime.fromISO(date).toLocaleString({
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
    });
  };

  const createDateTimeString = (date) => {
    const tempDate = DateTime.fromISO(date)
      .toLocaleString(DateTime.DATETIME_SHORT)
      .split(", ");

    const d1 = tempDate[0].split("/");
    const year = d1[2] + "-" + d1[1] + "-" + d1[0];
    const newDate = year + "T" + tempDate[1];

    return newDate;
  };

  useEffect(() => {
    setTaskData({
      task,
      info,
      due: createDateTimeString(due),
      complete,
    });
  }, [due, info, task, complete]);

  useEffect(() => {
    if (!showEdit) {
      setShowInfo(true);
    }
  }, [showEdit]);

  return (
    <div className="tasks-list">
      <div>
        <div>
          <h3 className="task-name">{task}</h3>
        </div>
        {showInfo && (
          <div>
            <button
              className="delete-btn"
              onClick={() => {
                showMessage();
                setDeleteWindow(true, _id, task);
              }}
            >
              Delete
            </button>

            <p>{info}</p>
            <p className="date">
              <strong>Start: </strong>
              {displayDateTimeString(createdAt)}
              <br />
              <strong>Finish: </strong>
              {displayDateTimeString(due)}
            </p>
            <div className="btn-task">
              {complete === false ? (
                <p className="status-incomplete">Incomplete &#128528;</p>
              ) : (
                <p className="status-complete">Done &#128515;</p>
              )}
              <button
                className="edit-btn"
                onClick={() => {
                  showMessage();
                  setShowInfo(false);
                  setShowEdit(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        {showEdit && (
          <EditTask
            taskData={taskData}
            setTaskData={setTaskData}
            taskId={_id}
            setShowEdit={setShowEdit}
            due={due}
          />
        )}
      </div>
    </div>
  );
};

export default SingleTask;
