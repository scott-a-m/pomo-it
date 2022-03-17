import React from "react";
import FormHeader from "../components/FormHeader";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const NotFound = () => {
  const { setUserData, userData } = useGlobalContext();
  return (
    <div>
      <FormHeader userData={userData} setUserData={setUserData} />
      <div className="form-wrapper">
        <div className="form-box">
          <h1 className="">404 Page Not Found</h1>
          <p>
            This page does not exist. Back to <Link to="/">homepage</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
