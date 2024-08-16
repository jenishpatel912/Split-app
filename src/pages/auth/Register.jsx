import React, { useRef, useState } from "react";
import "./auth.css";
import { handleApiCall } from "../../utility/apiCall";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { email, password, name } = values;

    handleApiCall(
      "users/create",
      "post",
      { email, password, name },
      setLoading,
      () => {
       navigate("/login")
      }
    );
  };

  //   if(loading) return <Loader/>

  return (
    <div className="mx-2">
      <div className="auth-box" id="auth">
        <h2 className="mt-2">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="font-sm" htmlFor="email">
              Email
            </label>
            <div>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                className="input-field"
              />
            </div>
          </div>
          <div className="input-container">
            <label className="font-sm" htmlFor="name">
              Username
            </label>
            <div>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Enter username"
                className="input-field"
              />
            </div>
          </div>
          <div className="input-container">
            <label className="font-sm" htmlFor="password">
              Password
            </label>
            <div>
              <input
                required
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                className="input-field"
              />
            </div>
          </div>
          <div className="my-1">
            <button type="submit" className="login-button" disabled={loading}>
              Register
            </button>
            <div className="my-1 font-sm">
              <span>Already have an account? </span>{" "}
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
