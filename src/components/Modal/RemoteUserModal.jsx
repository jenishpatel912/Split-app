import React, { useEffect, useState } from "react";
import { debounceFunc, useDebounce } from "../../hooks/useDebounce";
import HighlightText from "../HighlightText";
import { handleApiCall } from "../../utility/apiCall";

const RemoteUserListBox = ({ userlist, handleChange, title, users, selectall }) => {
  const [userListData, setUserListData] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const [debounceText] = useDebounce(searchVal);

  useEffect(()=>{
    if(debounceText.trim()){
        handleApiCall(
            `users/list?text=${debounceText.trim()}`,
            "get",
            null,
            ()=>{},
            (data, err) => {
              if (err) return;
              setUserListData(data.userList || []);
            }
          );
    }else{
        setUserListData([])
    }
  },[debounceText])

  return (
    <>
      <div className="sub-header">{title}</div>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search user by name"
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
      <div
        // style={{ textAlign: "left", marginBottom: "10px" }}
        className="user-list"
      >
        {userListData.map((item) => (
          <div
            key={item._id}
            className="user-box"
            onClick={() => handleChange(item._id)}
          >
            <div className="user-info">
              <span className="user-name">
                {HighlightText(item.name, debounceText)}
              </span>
              {item.email && <span className="user-email">{item.email}</span>}
            </div>
            <input type="checkbox" readOnly checked={users.has(item._id)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default RemoteUserListBox;
