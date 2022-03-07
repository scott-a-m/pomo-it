import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import FormRow from "../components/FormRow";
import FormHeader from "../components/FormHeader";

const ForgotPassword = ({ setMessage, message, showMessage, userData }) => {
  const [email, setEmail] = useState("");

  const [btnStatus, setbtnStatus] = useState({
    text: "Submit",
    disabled: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));
    console.log(email);

    try {
      await axios.post(`/api/v1/auth/forgot-password`, { email });
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Submitted",
        disabled: true,
      }));
      setEmail("");
      showMessage(
        "success-msg",
        "Success: Please check your email for reset password link."
      );
    } catch (err) {
      setbtnStatus((btnData) => ({
        text: "Submit",
        disabled: false,
      }));
      setEmail("");
      if (err.response.data.msg)
        return showMessage("error-msg", err.response.data.msg, 5000);

      showMessage("error-msg", "Error: Please try again", 5000);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (message) {
      setMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <FormHeader userData={userData} />
      <div className="form-wrapper">
        <div className="form-box">
          <h1 className="">Forgot Password</h1>
          {message && message}
          <form onSubmit={handleSubmit}>
            <FormRow
              name="email"
              type="email"
              value={email}
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

export default ForgotPassword;
