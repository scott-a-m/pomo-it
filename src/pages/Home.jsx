import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import About from "../components/About";
import Clock from "../components/Clock";
import CreateTask from "../components/CreateTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import HomeHeader from "../components/HomeHeader";
import Welcome from "../components/Welcome";
import { useGlobalContext } from "../context";
import SingleTask from "../components/SingleTask";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from "axios";

const Home = () => {
  const {
    showMessage,
    message,
    userData,
    polishName,
    loading,
    tasks,
    deleteSingleTask,
    setDeleteWindow,
    getAllTasks,
  } = useGlobalContext();

  const [createTaskWindow, setCreateTaskWindow] = useState(false);
  const [loadMoreDisplay, setLoadMoreDisplay] = useState(false);
  const [displayItems, setDisplayItems] = useState(7);

  const [btnStatus, setbtnStatus] = useState({
    text: "Delete",
    disabled: false,
  });

  const deleteTask = async (id) => {
    setbtnStatus({
      text: "Deleting",
      disabled: true,
    });
    try {
      await axios.delete(`/api/v1/tasks/delete-task/${id}`);
      getAllTasks();
      setDeleteWindow();
    } catch (error) {
      showMessage(true, "error-msg", "Oops an error occured. Please try again");
    }
    setbtnStatus({
      text: "Delete",
      disabled: false,
    });
  };

  const loadMore = useCallback(() => {
    if (tasks.length >= displayItems + 7)
      return setDisplayItems(displayItems + 7);

    return setDisplayItems(displayItems + (tasks.length - displayItems));
  }, [displayItems, tasks]);

  useEffect(() => {
    if (tasks) {
      if (displayItems >= tasks.length) {
        return setLoadMoreDisplay(false);
      }
      return setLoadMoreDisplay(true);
    }
  }, [displayItems, loadMore, tasks]);

  return (
    <div>
      <HomeHeader />
      <Welcome />

      <div>
        <div id="clock-block">
          <Clock />
        </div>
        {loading && <Loader />}

        {!loading && (
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
                      onClick={() => {
                        setCreateTaskWindow(!createTaskWindow);
                        showMessage();
                      }}
                      size="2x"
                      className="create-task-icon"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      onClick={() => {
                        setCreateTaskWindow(!createTaskWindow);
                        showMessage();
                      }}
                      size="2x"
                      className="create-task-icon"
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

              {createTaskWindow && userData && (
                <CreateTask setCreateTaskWindow={setCreateTaskWindow} />
              )}
              {deleteSingleTask.open && (
                <div
                  className="delete-task-block"
                  style={{ marginTop: "2rem", marginBottom: "2rem" }}
                >
                  <h3 className="sub-head">Delete Task</h3>
                  {message.show && <Message />}
                  <div className="error-msg">
                    <p>Are you sure you want to delete Task:</p>
                    <p className="delete-task-name">{deleteSingleTask.task}</p>
                  </div>
                  <div className="btn-task">
                    <button
                      className="edit-btn"
                      disabled={btnStatus.disabled}
                      onClick={() => deleteTask(deleteSingleTask.id)}
                    >
                      {btnStatus.text}
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => setDeleteWindow()}
                      style={{ color: "black" }}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}

              <div>
                {tasks &&
                  !deleteSingleTask.open &&
                  tasks
                    .slice(0, displayItems)
                    .map((item, index) => <SingleTask key={index} {...item} />)}
              </div>
            </div>
            {loadMoreDisplay && tasks && (
              <div id="load-more">
                <button id="load-more-btn" onClick={loadMore}>
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
        <div id="about-block">
          <About />
        </div>
      </div>
    </div>
  );
};

export default Home;
