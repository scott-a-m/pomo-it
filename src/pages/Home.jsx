import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import About from "../components/About";
import Clock from "../components/Clock";
import CreateTask from "../components/CreateTask";
import EditTask from "../components/EditTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import HomeHeader from "../components/HomeHeader";
import Welcome from "../components/Welcome";

const Home = ({
  userData,
  setUserData,
  polishName,
  showMessage,
  message,
  setMessage,
}) => {
  const [tasks, setTasks] = useState();
  const [createTaskWindow, setCreateTaskWindow] = useState(false);
  const [loadMoreDisplay, setLoadMoreDisplay] = useState(false);
  const [taskData, setTaskData] = useState({
    task: "",
    info: "",
    due: "",
  });
  const [itemId, setItemId] = useState(null);
  const [displayItems, setDisplayItems] = useState(3);

  const displayDateTimeString = (date) => {
    const tempDate = new Date(date);
    const finalDate = tempDate.toLocaleString();
    const dateOne = finalDate.substring(0, 10);
    const dateTwo = finalDate.substring(11, 17);
    return "at " + dateTwo + " on " + dateOne;
  };

  const createDateTimeString = (date) => {
    const tempDate = new Date(date);

    const tempLocaleDate = tempDate.toLocaleString();
    const dateA = tempLocaleDate.split("/");
    const dateB = dateA[2].split(",");
    const finalLocaleDate =
      dateB[0] + "-" + dateA[1] + "-" + dateA[0] + dateB[1].replace(" ", "T");

    return finalLocaleDate;
  };

  const loadMore = () => {
    setDisplayItems(displayItems + 5);
  };

  const openEditTaskWindow = (item) => {
    setTaskData({
      task: item.task,
      info: item.info,
      due: item.due,
      complete: item.complete,
    });

    setItemId(item._id);
  };

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get("/api/v1/tasks/my-tasks");
      const newData = [];
      data.map((item) => newData.unshift(item));
      console.log(newData);
      setTasks(newData);
      setLoadMoreDisplay(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/v1/tasks/delete-task/${taskId}`);
      getAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) {
      getAllTasks();
    }
  }, [userData]);

  useEffect(() => {
    if (tasks) {
      if (displayItems >= tasks.length) {
        setLoadMoreDisplay(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore]);

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HomeHeader
        setUserData={setUserData}
        userData={userData}
        setTasks={setTasks}
        setCreateTaskWindow={setCreateTaskWindow}
      />
      <Welcome />

      <div>
        <div id="clock-block">
          <Clock />
        </div>
        <div id="task-block">
          <div id="task-wrapper">
            {userData ? (
              <h1>{polishName(userData.user.name)} Tasks</h1>
            ) : (
              <h1>Tasks</h1>
            )}
            {userData ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {createTaskWindow ? (
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    onClick={() => setCreateTaskWindow(!createTaskWindow)}
                    size="2x"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    onClick={() => setCreateTaskWindow(!createTaskWindow)}
                    size="2x"
                  />
                )}
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <p>
                  Please{" "}
                  <Link to="/login" className="link">
                    login
                  </Link>{" "}
                  to load the task manager.
                </p>
                <p>
                  Haven't got an account? Please{" "}
                  <Link to="/register" className="link">
                    register
                  </Link>
                  .
                </p>
              </div>
            )}

            {createTaskWindow && (
              <CreateTask
                setCreateTaskWindow={setCreateTaskWindow}
                getAllTasks={getAllTasks}
                showMessage={showMessage}
                message={message}
                setMessage={setMessage}
              />
            )}

            <div>
              {tasks &&
                tasks.slice(0, displayItems).map((item, index) => (
                  <div key={index} className="tasks-list">
                    <div hidden={item._id === itemId ? true : false}>
                      <div className="btn-task">
                        <h3 className="task-name">{item.task}</h3>
                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                      <p>{item.info}</p>
                      <p className="date">
                        <strong>Start: </strong>
                        {displayDateTimeString(item.createdAt)}
                        <br />
                        <strong>Finish: </strong>
                        {displayDateTimeString(item.due)}
                      </p>
                      <div className="btn-task">
                        {item.complete === false ? (
                          <p className="status-incomplete">
                            Incomplete &#128528;
                          </p>
                        ) : (
                          <p className="status-complete">Done &#128515;</p>
                        )}
                        <button
                          className="edit-btn"
                          onClick={() => openEditTaskWindow(item)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div>
                      <EditTask
                        getAllTasks={getAllTasks}
                        taskData={taskData}
                        setTaskData={setTaskData}
                        taskId={item._id}
                        itemId={itemId}
                        setItemId={setItemId}
                        createDateTimeString={createDateTimeString}
                        showMessage={showMessage}
                        message={message}
                        setMessage={setMessage}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {loadMoreDisplay && (
            <div id="load-more">
              <button id="load-more-btn" onClick={loadMore}>
                Load More
              </button>
            </div>
          )}
        </div>
        <div id="about-block">
          <About />
        </div>
      </div>
    </div>
  );
};

export default Home;
