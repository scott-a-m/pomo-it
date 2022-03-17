import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/showMe");
      setUserData(data);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const polishName = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1) + "'s";
  };

  const showMessage = useCallback((show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  }, []);

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
