import React, { useRef, useState } from "react";
import "./auth.css";
import { handleApiCall } from "../../utility/apiCall";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const { userData, setUserData } = useAuth();
  const  showToast = useToast();

  const [loading, setLoading] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { email, password } = values;

    handleApiCall(
      "users/login",
      "post",
      { name: email, password },
      setLoading,
      (data,err) => {
        if(err){
          showToast({message:err,type:'error'})
          return
        }
        setUserData(data);
        localStorage.setItem('userinfo',JSON.stringify(data));
        showToast({message:'Logged in successfully'})
      }
    );
  };

  if(loading) return <Loader/>

  return (
    <div className="mx-2">
      <div className="auth-box" id="auth">
        <h2 className="mt-2">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="font-sm" htmlFor="email">
              Username or email
            </label>
            <div>
              <input
                required
                name="email"
                id="email"
                placeholder="Enter username or email"
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
              Login
            </button>
            <div className="my-1 font-sm">
               <span>Don't have an account? </span> <Link to="/register" className="nav-link">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
