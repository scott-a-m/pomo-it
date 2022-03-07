import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import FormHeader from "../components/FormHeader";

const Login = ({ getUser, userData, showMessage, setMessage, message }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [btnStatus, setbtnStatus] = useState({
    text: "Login",
    disabled: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));

    try {
      await axios.post(`/api/v1/auth/login`, loginData);
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Loading",
        disabled: true,
      }));
      setLoginData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      showMessage("success-msg", "Login successful. Loading...", 10000);
      getUser();
    } catch (err) {
      setbtnStatus((btnData) => ({
        text: "login",
        disabled: false,
      }));
      setLoginData(() => ({
        name: "",
        email: "",
        password: "",
      }));

      if (err.response.data.msg)
        return showMessage("error-msg", err.response.data.msg, 5000);

      return showMessage(
        "error-msg",
        "Ooops, an error occured, please try again",
        5000
      );
    }
  };

  const handleChange = (e) => {
    setLoginData((regData) => ({
      ...regData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div>
      <FormHeader userData={userData} />
      <div className="form-wrapper">
        <div className="form-box">
          <h1 className="">Login</h1>
          {message && message}
          <form onSubmit={handleLogin}>
            <FormRow
              name="email"
              type="email"
              value={loginData.email}
              onChangeFunc={handleChange}
            />
            <FormRow
              name="password"
              type="password"
              value={loginData.password}
              onChangeFunc={handleChange}
            />
            <button className="form-btn" disabled={btnStatus.disabled}>
              {btnStatus.text}
            </button>
            <p>
              Don't have an account, please <Link to="/register">register</Link>
              .
              <br />
              Forgot your password, please{" "}
              <Link to="/user/forgot-password">reset password</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
