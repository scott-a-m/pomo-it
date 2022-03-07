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

const Home = ({ userData, setUserData }) => {
  const [tasks, setTasks] = useState();
  const [createTaskWindow, setCreateTaskWindow] = useState(false);
  const [taskData, setTaskData] = useState({
    task: "",
    info: "",
    due: "",
  });
  const [itemId, setItemId] = useState(null);
  const [displayItems, setDisplayItems] = useState(3);

  const displayDateTimeString = (date) => {
    const offset = new Date().getTimezoneOffset() * 1000 * 60;
    const offsetDate = new Date(date).valueOf() - offset;
    const finalDate = new Date(offsetDate).toISOString();
    return finalDate.substring(0, 16).replace("T", " at ");
  };

  const createDateTimeString = (date) => {
    const offset = new Date().getTimezoneOffset() * 1000 * 60;
    const offsetDate = new Date(date).valueOf() - offset;
    const finalDate = new Date(offsetDate).toISOString();
    return finalDate.substring(0, 16);
  };

  const loadMore = () => {
    setDisplayItems(displayItems + 3);
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

  const polishName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1) + "'s";
  };

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get("/api/v1/tasks/my-tasks");
      setTasks(data);
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

  return (
    <div>
      <HomeHeader
        setUserData={setUserData}
        userData={userData}
        setTasks={setTasks}
        setCreateTaskWindow={setCreateTaskWindow}
      />

      <div id="pomo-grid">
        <div id="timer-block">
          <Clock />
          <About />
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
              />
            )}

            <div>
              {tasks &&
                tasks
                  .slice(0)
                  .reverse()
                  .map((item, index) => (
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
                        <p>
                          <strong>Due:</strong>
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
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
