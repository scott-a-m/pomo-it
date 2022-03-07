import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import FormHeader from "../components/FormHeader";

const Register = ({ userData, showMessage, message, setMessage }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [btnStatus, setbtnStatus] = useState({
    text: "Register",
    disabled: false,
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));

    if (registerData.name.length < 3) {
      showMessage(
        "error-msg",
        "please make sure username has three or more characters",
        5000
      );
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Register",
        disabled: false,
      }));
      setRegisterData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      return;
    }

    if (registerData.password.length < 3) {
      showMessage(
        "error-msg",
        "please make sure password has six or more characters",
        5000
      );
      setbtnStatus((btnData) => ({
        text: "Register",
        disabled: false,
      }));
      setRegisterData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      return;
    }

    try {
      await axios.post(`/api/v1/auth/register`, registerData);
      showMessage(
        "success-msg",
        "Success, please check Email for verification link",
        10000
      );
      setRegisterData(() => ({
        name: "",
        email: "",
        password: "",
      }));
    } catch (err) {
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Register",
        disabled: false,
      }));
      setRegisterData(() => ({
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
    setRegisterData((regData) => ({
      ...regData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
  }, []);

  return (
    <div>
      <FormHeader />
      <div className="form-wrapper">
        <div className="form-box">
          <h1 className="">Register</h1>
          {message && message}
          <form className="" onSubmit={handleRegister}>
            <FormRow
              name="name"
              type="text"
              value={registerData.name}
              onChangeFunc={handleChange}
            />
            <FormRow
              name="email"
              type="email"
              value={registerData.email}
              onChangeFunc={handleChange}
            />
            <FormRow
              name="password"
              type="password"
              value={registerData.password}
              onChangeFunc={handleChange}
            />
            <button className="form-btn" disabled={btnStatus.disabled}>
              {btnStatus.text}
            </button>
            <p>
              Already have an account, please <Link to="/login">login</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
