import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import FormRow from "../components/FormRow";
import FormHeader from "../components/FormHeader";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";
import Message from "../components/Message";

const ResetPassword = () => {
  const { showMessage, message, userData, setUserData } = useGlobalContext();

  const query = new URLSearchParams(useLocation().search);

  const [newPassword, setNewPassword] = useState("");

  const [btnStatus, setbtnStatus] = useState({
    text: "Submit",
    disabled: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPasswordData = {
      password: newPassword,
      token: query.get("token"),
      email: query.get("email"),
    };

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));

    if (newPassword.length < 6) {
      showMessage(
        true,
        "error-msg",
        "please make sure password has six or more characters"
      );
      setbtnStatus((btnData) => ({
        text: "Submit",
        disabled: false,
      }));
      setNewPassword("");
      return;
    }
    try {
      await axios.post(`/api/v1/auth/reset-password`, newPasswordData);
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Updated",
        disabled: true,
      }));
      setNewPassword("");
      showMessage(
        true,
        "success-msg",
        <p>
          Password updated! Please{" "}
          <Link to="/login" className="success-link">
            Login
          </Link>
          .
        </p>
      );
    } catch (err) {
      setNewPassword("");

      if (err.response.data.msg) {
        showMessage(true, "error-msg", err.response.data.msg);
        setbtnStatus((btnData) => ({
          text: "Submit",
          disabled: false,
        }));
        return;
      }
      showMessage(true, "error-msg", "Error: Please try again");
    }
  };

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  useEffect(() => {
    showMessage();
  }, [showMessage]);

  return (
    <div>
      <FormHeader userData={userData} setUserData={setUserData} />
      <div className="form-wrapper">
        <div className="form-box">
          <h1 className="">New Password</h1>
          {message.show && <Message />}
          <form onSubmit={handleSubmit}>
            <FormRow
              name="password"
              type="password"
              value={newPassword}
              onChangeFunc={handleChange}
            />

            <button
              className="form-btn"
              disabled={btnStatus.disabled}
              type="submit"
            >
              {btnStatus.text}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
