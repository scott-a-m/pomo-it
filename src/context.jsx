import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

// https://pomoit-server.herokuapp.com/

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const [deleteSingleTask, setDeleteSingleTask] = useState({
    open: false,
    id: "",
    task: "",
  });

  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState();

  const setDeleteWindow = (open = false, id = "", task = "") => {
    setDeleteSingleTask({ open, id, task });
  };

  const polishName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1) + "'s";
  };

  const showMessage = useCallback((show = false, type = "", msg = "") => {
    console.log(show, type, msg);
    console.log("component rendered");
    setMessage({ show, type, msg });
  }, []);

  const getUser = async () => {
    try {
      console.log("getting user");
      setLoading(true);
      const { data } = await axios.get("/api/v1/users/showMe");
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.log("error");
      console.log(error);
      setLoading(false);
    }
  };

  const getAllTasks = async () => {
    console.log("getting tasks");
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/tasks/my-tasks");
      const newData = [];
      data.map((item) => newData.unshift(item));
      console.log(newData);
      setTasks(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      getAllTasks();
    }
  }, [userData]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showMessage,
        message,
        userData,
        setUserData,
        getUser,
        polishName,
        loading,
        setLoading,
        tasks,
        setTasks,
        getAllTasks,
        deleteSingleTask,
        setDeleteWindow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
