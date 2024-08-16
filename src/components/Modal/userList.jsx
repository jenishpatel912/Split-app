import React, { useEffect, useState } from "react";
import { debounceFunc, useDebounce } from "../../hooks/useDebounce";
import HighlightText from "../HighlightText";

const UserListBox = ({ userlist, handleChange, title, users, selectall }) => {
  const [userListData, setUserListData] = useState(userlist || []);
  const [searchVal, setSearchVal] = useState("");

  const [debounceText] = useDebounce(searchVal);

  useEffect(() => {
    if (userlist?.length) {
      setUserListData(userlist);
    }
  }, [userlist]);

  useEffect(() => {
    const searchUsers = userlist.filter((item) => item.name?.includes(debounceText));
    setUserListData(searchUsers);
  }, [debounceText]);

  // const handleSearch = (e) => {
  //   const { value } = e.target;
  //   debounceFunc(value, () => {
  //     const searchUsers = userlist.filter((item) => item.name?.includes(value));
  //     setUserListData(searchUsers);
  //   });
  // };

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
        {selectall && userListData?.length > 1 && (
          <div
            key="select-all"
            className="user-box"
            onClick={() => handleChange("all")}
          >
            <div className="user-info">
              <span className="user-name">Select all</span>
              <span className="user-email"></span>
            </div>
            <input
              type="checkbox"
              readOnly
              checked={users?.size === userlist.length}
            />
          </div>
        )}
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

export default UserListBox;
