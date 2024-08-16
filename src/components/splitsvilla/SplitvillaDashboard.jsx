import React, { useEffect, useState } from "react";
import { handleApiCall } from "../../utility/apiCall";
import Modal from "../models/ModalContent";

import "./splitsvilla.css";
import CreategroupModal from "../Modal/CreategroupModal";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

const SplitvillaDashboard = () => {
  const [groupList, setGroupList] = useState({});
  const [isgroupModal, setIsGroupModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const showToast = useToast();

  useEffect(() => {
    handleApiCall(
      "group/fetch",
      "get",
      null,
      () => {},
      (data, err) => {
        if (err) return;
        setGroupList(data);
      }
    );
    handleApiCall(
      "users/list",
      "get",
      null,
      () => {},
      (data, err) => {
        if (err) return;
        setUserList(data.userList || []);
      }
    );
  }, []);

  const createGroup = (name, selectedUsers) => {
    handleApiCall(
      "group/create",
      "post",
      { users: selectedUsers, name },
      null,
      (data, err) => {
        if (err) {
          showToast({ message: err, type: "error" });
          return;
        }
        const { _id: id, name, expense } = data;
        setGroupList((prev) => ({
          ...prev,
          items: [...prev.items, { id, name, expense }],
        }));
        setIsGroupModal(false);
        showToast({ message: "Group created successfully" });
      }
    );
  };

  const handleGroup = (id) => {
    navigate(`/group-detail/${id}`);
  };

  return (
    <div>
      <div className="text-white mx-2 p-1 header-bar">
        <div className="header-button-container">
          <button
            className="cursor-pointer"
            onClick={() => setIsGroupModal(!isgroupModal)}
          >
            Create Group
          </button>
        </div>
        <h2>
          Overall :{" "}
          <span style={{ color: groupList.total < 0 ? "red" : "#32be32" }}>
            {groupList.total}
          </span>
        </h2>
      </div>
      <div className="items-wrapper">
        <div className="user-box-container">
          {groupList?.items?.map((item) => (
            <div
              key={item.id}
              className="item-container cursor-pointer"
              onClick={() => handleGroup(item.id)}
            >
              <div
                className={"user-box-item"}
                // onClick={() => handleUserChanges(item)}
              >
                <h3>{item.name}</h3>
                <h2 style={{ color: item.expense < 0 ? "red" : "green" }}>
                  {item.expense.toFixed(2)}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isgroupModal && (
        <CreategroupModal
          onClose={() => setIsGroupModal(!isgroupModal)}
          userList={userList}
          showToast={showToast}
          handleSubmit={createGroup}
        />
      )}

      {/* frontroll testing */}
    </div>
  );
};

export default SplitvillaDashboard;
