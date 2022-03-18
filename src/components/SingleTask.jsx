import { useEffect } from "react";
import { useState } from "react";
import EditTask from "../components/EditTask";

import { useGlobalContext } from "../context";

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
    const tempDate = new Date(date).toLocaleString();

    const dateArr = tempDate.split("/");
    const dateArr2 = dateArr[2].split(",");

    const newDate =
      dateArr2[0] +
      "-" +
      dateArr[1] +
      "-" +
      dateArr[0] +
      dateArr2[1].replace(" ", " at ").substring(0, 9);

    return newDate;
  };

  const createDateTimeString = (date) => {
    const tempDate = new Date(date).toLocaleString();

    const dateArr = tempDate.split("/");
    const dateArr2 = dateArr[2].split(",");

    const newDate =
      dateArr2[0] +
      "-" +
      dateArr[1] +
      "-" +
      dateArr[0] +
      dateArr2[1].replace(" ", "T").substring(0, 6);

    // import { DateTime } from "luxon";

    // const tempDate = new Date(date).toISOString();
    // const isoDate = tempDate.substring(0, 19);
    // const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const d = DateTime.fromISO(isoDate, { zone });
    // console.log(d.toISO());
    // console.log(d.toUTC().toISO());

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
