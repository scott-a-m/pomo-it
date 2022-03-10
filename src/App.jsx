import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import VerifyEmail from "./pages/VerfiyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState(null);

  const showMessage = (type, message, time = false) => {
    setMessage(<div className={type}>{message}</div>);

    if (time) {
      setTimeout(() => {
        setMessage(null);
      }, time);
    }
  };

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setUserData={setUserData}
              userData={userData}
              polishName={polishName}
              showMessage={showMessage}
              message={message}
              setMessage={setMessage}
            />
          }
          exact
        />
        <Route
          path="/user/account"
          element={
            <MyAccount
              userData={userData}
              setUserData={setUserData}
              polishName={polishName}
              getUser={getUser}
              showMessage={showMessage}
              message={message}
              setMessage={setMessage}
            />
          }
          exact
        />
        <Route path="/tasks" element={<Tasks />} exact />
        <Route
          path="/login"
          element={
            <Login
              userData={userData}
              getUser={getUser}
              showMessage={showMessage}
              message={message}
              setMessage={setMessage}
            />
          }
          exact
        />
        <Route
          path="/register"
          element={
            <Register
              userData={userData}
              showMessage={showMessage}
              message={message}
              setMessage={setMessage}
            />
          }
          exact
        />
        <Route
          path="/user/verify-email"
          element={<VerifyEmail userData={userData} />}
          exact
        />
        <Route
          path="/user/reset-password"
          element={
            <ResetPassword
              setUserData={setUserData}
              showMessage={showMessage}
              message={message}
              setMessage={setMessage}
              userData={userData}
            />
          }
          exact
        />
        <Route
          path="/user/forgot-password"
          element={
            <ForgotPassword
              showMessage={showMessage}
              message={message}
              setMessage={setMessage}
              userData={userData}
              setUserData={setUserData}
            />
          }
          exact
        />
        <Route
          path="*"
          element={<NotFound userData={userData} setUserData={setUserData} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
