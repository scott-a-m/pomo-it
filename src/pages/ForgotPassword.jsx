import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import FormRow from "../components/FormRow";
import FormHeader from "../components/FormHeader";
import Message from "../components/Message";
import { useGlobalContext } from "../context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { showMessage, message, userData, setUserData } = useGlobalContext();

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

    try {
      await axios.post(`/api/v1/auth/forgot-password`, { email });
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Submitted",
        disabled: true,
      }));
      setEmail("");
      showMessage(
        true,
        "success-msg",
        "Submitted. Please check your email for reset password link."
      );
    } catch (err) {
      setbtnStatus((btnData) => ({
        text: "Submit",
        disabled: false,
      }));
      setEmail("");
      if (err.response.data.msg)
        return showMessage(true, "error-msg", err.response.data.msg);

      showMessage(true, "error-msg", "Error: Please try again");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    showMessage();
  }, [showMessage]);

  return (
    <div>
      <FormHeader userData={userData} setUserData={setUserData} />
      <div className="form-wrapper">
        <div className="form-box">
          <h1 className="">Forgot Password</h1>
          {message.show && <Message />}
          <form onSubmit={handleSubmit}>
            <FormRow
              name="email"
              type="email"
              value={email}
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

export default ForgotPassword;
