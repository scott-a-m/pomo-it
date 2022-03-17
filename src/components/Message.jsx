import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const Message = () => {
  const { showMessage, message } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      showMessage();
    }, 4000);
    return () => clearTimeout(timeout);
  });

  return <div className={message.type}>{message.msg}</div>;
};

export default Message;
