import React from "react";
import { Outlet } from "react-router-dom";

import "./header.css";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import ProfileIcon from "../../assests/profileIcon";

const Header = () => {
  const showToast = useToast();

  const { setUserData, userData } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    // showToast({message:'Logged out successfully',type:'success'})
  };

  return (
    <div>
      {userData?.token && (
        <nav className="header">
          <div className="color-white profile-box">
            <ProfileIcon />
            <div className="user-detail">
              <span>{userData.user?.name}</span>
              <span>{userData.user?.email}</span>
              </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout <span>&#10145;</span>
          </button>
        </nav>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
