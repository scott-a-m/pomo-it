import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import FormRow from "../components/FormRow";
import FormHeader from "../components/FormHeader";
import { useLocation } from "react-router-dom";

const ResetPassword = ({ userData, setMessage, message, showMessage }) => {
  const query = new URLSearchParams(useLocation().search);

  const [newPassword, setNewPassword] = useState("");

  const [btnStatus, setbtnStatus] = useState({
    text: "Submit",
    disabled: false,
  });

  const newPasswordData = {
    password: newPassword,
    token: query.get("token"),
    email: query.get("email"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));

    if (newPassword.length < 3) {
      showMessage(
        "error-msg",
        "please make sure password has six or more characters",
        5000
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
        "success-msg",
        `Success: Please <Link to="/login">Login</Link>`
      );
    } catch (err) {
      showMessage("error-msg", "Error: Please try again", 5000);
      setbtnStatus((btnData) => ({
        text: "Submit",
        disabled: false,
      }));
      setNewPassword("");
      console.log("error has occured");
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
  }, []);

  return (
    <div>
      <FormHeader userData={userData} />
      <div className="form-wrapper">
        <div className="form-box">
          <h1 className="">New Password</h1>
          {message && message}
          <form onSubmit={handleSubmit}>
            <FormRow
              name="password"
              type="password"
              value={newPassword}
              onChangeFunc={handleChange}
            />

            <button className="form-btn" disabled={btnStatus.disabled}>
              {btnStatus.text}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
