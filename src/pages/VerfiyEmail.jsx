import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FormHeader from "../components/FormHeader";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = new URLSearchParams(useLocation().search);

  const verifyUserToken = async () => {
    setLoading(true);
    try {
      console.log(query.get("token"), query.get("email"));
      await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      return verifyUserToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="form-wrapper">
        <FormHeader />
        <div className="form-box">
          <h1 className="">Verify Email</h1>
          <p className="">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-wrapper">
        <FormHeader />
        <div className="form-box">
          <h1 className="">Verify Email</h1>
          <p className="">Ooops, an error occured, please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <FormHeader />
      <div className="form-box">
        <h1 className="">Verify Email</h1>
        <p className="">Account Verified!</p>
        <Link to="/login" className="text-md">
          Please login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
