import React, { useEffect, useState, useRef } from "react";
import "./toast.css";

const colorObj = {
  success: "#20ca20",
  error: "red",
};

const Toaster = ({ data, setNewMessages }) => {
  const [message, setMessage] = useState("");

  const ref = useRef();

  const removeToaster = () => {
    setTimeout(
      () =>
        setNewMessages((prev) => prev.filter((item) => item.key !== data.key)),
      500
    );
  };

  useEffect(() => {
    setTimeout(() => setMessage(data.message), 50);
    ref.current = setTimeout(() => {
      setMessage("");
      removeToaster();
    }, 3000);
  }, [data]);

  const handleClose = () => {
    clearTimeout(ref.current);
    removeToaster();
    setMessage("");
  };

  return (
    <div className={`cursor-pointer toaster ${message ? "active" : ""}`} style={{ background: colorObj[data.type] || "#20ca20" }} onClick={handleClose}>
      <span className="toaster-message">{message}</span>
      <span>&#x2715;</span>
      <span
        className="timer"
        style={{ background: "white" }}
      ></span>
    </div>
  );
};

export default Toaster;
