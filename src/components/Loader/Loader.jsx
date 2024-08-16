import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="parent-container">
      {" "}
      <div className="loader-container ">
        <div className="loader"></div>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
