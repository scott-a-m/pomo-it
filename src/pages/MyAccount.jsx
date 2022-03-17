import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountFormRow from "../components/AccountFormRow";
import FormHeader from "../components/FormHeader";
import { useGlobalContext } from "../context";
import Message from "../components/Message";

const MyAccount = () => {
  const { showMessage, message, setUserData, userData, getUser, polishName } =
    useGlobalContext();

  const [passwordData, setPasswordData] = useState({
    old: "",
    new: "",
  });
  const [newName, setNewName] = useState("");
  const [updateNameWindow, setUpdateNameWindow] = useState(false);
  const [updatePasswordWindow, setUpdatePasswordWindow] = useState(false);
  const [hideWindow, setHideWindow] = useState(false);

  const [btnStatus, setbtnStatus] = useState({
    text: "Submit",
    disabled: false,
  });

  const [match, setMatch] = useState(
    window.matchMedia("(min-width: 650px)").matches
  );

  const navigate = useNavigate();

  const checkWidth = (event) => {
    setMatch(event.matches);
  };
  useEffect(() => {
    window
      .matchMedia("(min-width: 650px)")
      .addEventListener("change", checkWidth);
  });

  const updateName = async (e) => {
    e.preventDefault();
    setbtnStatus((btnData) => ({
      ...btnData,
      text: "saving",
      disabled: true,
    }));

    if (newName.length < 3) {
      showMessage(
        true,
        "error-msg",
        "please make sure name has three or more characters"
      );
      setbtnStatus((btnData) => ({
        text: "save",
        disabled: false,
      }));
      return;
    }

    try {
      await axios.patch(`/api/v1/users/updateUser`, { name: newName });
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Done",
        disabled: true,
      }));
      setNewName("");
      showMessage(true, "success-msg", "Success: Username updated.");
      getUser();
      closeWindow("name");
    } catch (err) {
      showMessage(true, "error-msg", "Error: Please try again");

      setNewName("");
      console.log("error has occured");
      console.log(err.message);
    }
    setbtnStatus((btnData) => ({
      text: "save",
      disabled: false,
    }));
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "saving",
      disabled: true,
    }));

    if (passwordData.old.length < 6 || passwordData.new.length < 6) {
      showMessage(
        true,
        "error-msg",
        "please make sure both old and new passwords have six or more characters"
      );
      setbtnStatus((btnData) => ({
        text: "save",
        disabled: false,
      }));
      return;
    }

    try {
      await axios.patch(`/api/v1/users/updateUserPassword`, {
        oldPassword: passwordData.old,
        newPassword: passwordData.new,
      });
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "done",
        disabled: true,
      }));
      setPasswordData({
        old: "",
        new: "",
      });
      showMessage(true, "success-msg", "Success: Password Updated.");
      closeWindow("password");
      getUser();
    } catch (err) {
      setbtnStatus((btnData) => ({
        text: "Submit",
        disabled: false,
      }));
      setPasswordData({
        old: "",
        new: "",
      });
      if (err.response.data.msg)
        return showMessage(true, "error-msg", err.response.data.msg);

      showMessage(true, "error-msg", "Error: Please try again");
    }
    setbtnStatus((btnData) => ({
      text: "Submit",
      disabled: false,
    }));
  };

  const handleChange = (e) => {
    if (e.target.name === "name") return setNewName(e.target.value);

    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    showMessage();
  }, [showMessage]);

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [navigate, userData]);

  const closeWindow = (cat) => {
    if (cat === "name") {
      setNewName("");
      setUpdateNameWindow(false);
      setHideWindow(false);
      return;
    }
    setPasswordData({
      old: "",
      new: "",
    });
    setUpdatePasswordWindow(false);
    setHideWindow(false);
  };

  if (match)
    return (
      <div>
        <FormHeader userData={userData} setUserData={setUserData} />
        <div className="form-wrapper">
          <div className="form-box">
            {userData && (
              <div>
                <h1 style={{ marginBottom: "1rem" }}>
                  {polishName(userData.user.name)} Account
                </h1>
                {message.show && <Message />}
                {!hideWindow && (
                  <div style={{ fontSize: "1.2rem" }}>
                    <p>
                      <strong>User Id: </strong>
                      {userData.user.userId}.
                    </p>

                    <button
                      className="account-form-btn"
                      onClick={() => {
                        setUpdateNameWindow(true);
                        setHideWindow(true);
                        showMessage();
                      }}
                    >
                      Update Username
                    </button>
                    <button
                      className="account-form-btn"
                      onClick={() => {
                        setUpdatePasswordWindow(true);
                        setHideWindow(true);
                        showMessage();
                      }}
                    >
                      Update Password
                    </button>
                  </div>
                )}
              </div>
            )}
            {updateNameWindow && (
              <form onSubmit={updateName}>
                <h3 className="sub-head">Update Username</h3>
                <AccountFormRow
                  name="name"
                  type="text"
                  value={newName}
                  onChangeFunc={handleChange}
                />
                <br />
                <div className="btn-task">
                  <button className="edit-btn" disabled={btnStatus.disabled}>
                    {btnStatus.text}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => closeWindow("name")}
                    type="submit"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {updatePasswordWindow && (
              <form onSubmit={updatePassword}>
                <h3 className="sub-head">Update Password</h3>

                <AccountFormRow
                  name="old"
                  type="password"
                  value={passwordData.old}
                  onChangeFunc={handleChange}
                />
                <AccountFormRow
                  name="new"
                  type="password"
                  value={passwordData.new}
                  onChangeFunc={handleChange}
                />
                <br />
                <div className="btn-task">
                  <button
                    className="edit-btn"
                    disabled={btnStatus.disabled}
                    type="submit"
                  >
                    {btnStatus.text}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => closeWindow("pass")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div>
        <FormHeader userData={userData} setUserData={setUserData} />
        <div className="form-wrapper">
          <div className="form-box">
            {userData && (
              <div>
                <h2 style={{ marginBottom: "1rem" }}>
                  {polishName(userData.user.name)}
                  <br />
                  Account
                </h2>
                {!hideWindow && (
                  <div style={{ fontSize: "1.2rem" }}>
                    <p>
                      <strong>User Id: </strong>
                      {userData.user.userId}.
                    </p>

                    <button
                      className="account-form-btn"
                      onClick={() => {
                        setUpdateNameWindow(true);
                        setHideWindow(true);
                      }}
                      style={{ margin: "0.5rem" }}
                    >
                      Update Username
                    </button>
                    <button
                      className="account-form-btn"
                      onClick={() => {
                        setUpdatePasswordWindow(true);
                        setHideWindow(true);
                      }}
                      style={{ margin: "0.5rem" }}
                    >
                      Update Password
                    </button>
                  </div>
                )}
              </div>
            )}
            {updateNameWindow && (
              <form onSubmit={updateName}>
                <h3 className="sub-head">Update Username</h3>
                {message && message}

                <AccountFormRow
                  name="name"
                  type="text"
                  value={newName}
                  onChangeFunc={handleChange}
                />
                <br />
                <div className="btn-task">
                  <button
                    className="edit-btn"
                    disabled={btnStatus.disabled}
                    type="submit"
                  >
                    {btnStatus.text}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => closeWindow("name")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {updatePasswordWindow && (
              <form onSubmit={updatePassword}>
                <h3 className="sub-head">Update Password</h3>
                {message && message}

                <AccountFormRow
                  name="old"
                  type="password"
                  value={passwordData.old}
                  onChangeFunc={handleChange}
                />
                <AccountFormRow
                  name="new"
                  type="password"
                  value={passwordData.new}
                  onChangeFunc={handleChange}
                />
                <br />
                <div className="btn-task">
                  <button
                    className="edit-btn"
                    disabled={btnStatus.disabled}
                    type="submit"
                  >
                    {btnStatus.text}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => closeWindow("pass")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
};

export default MyAccount;
