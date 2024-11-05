import React, { useEffect, useState } from "react";
import { handleApiCall } from "../../utility/apiCall";
import Modal from "../models/ModalContent";

import "./splitsvilla.css";
import CreategroupModal from "../Modal/CreategroupModal";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate, useParams } from "react-router-dom";
import CreateEntryModal from "../Modal/CreateEntryModal";
import { useAuth } from "../../contexts/AuthContext";
import { getDepthRecord, updateRecords } from "./calulate";
import Loader from "../Loader/Loader";
import AddGroupUserModal from "../Modal/AddGroupUserModal";

const GroupDetails = () => {
  const [groupData, setGroupData] = useState({});
  const [isentryModal, setIsEntryModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isLoading,setLoading] = useState(false)
  const [records, setRecords] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isAddModal,setIsAddmodal] = useState(false);

  const { userData } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const showToast = useToast();

  const { groupInfo, groupRecords = [] } = groupData;

  const fetchGroupDetails = () => {
    handleApiCall(
      `group/fetch/${params.groupId}`,
      "get",
      null,
      setLoading,
      (data, err) => {
        if (err) return;
        setGroupData(data);
        setUserList(
          data.groupRecords
            .filter((item) => item.userId._id !== userData.user._id)
            .map(({ userId }) => ({
              name: userId.name,
              _id: userId._id,
            }))
        );
        setCurrentUser({ id: userData.user._id, name: userData.user.name });
        if (data?.groupRecords?.length) {
          const recordList = data.groupRecords.map((item) => ({
            amount: item.expense,
            id: item?.userId?._id,
            ...item.userId,
          }));
          const record = getDepthRecord(recordList);
          setRecords(record);
        }
      }
    );
  };

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  // useEffect(() => {
  //   if (groupRecords?.length) {
  //     const recordList = groupRecords.map((item) => ({
  //       amount: item.expense,
  //       id: item?.userId?._id,
  //       ...item.userId,
  //     }));
  //     const record = getDepthRecord(recordList);
  //     setRecords(record);
  //   }
  // }, [groupRecords]);

  const createEntry = (selectedUsers, total, remark) => {
    if (!selectedUsers?.length) return;
    handleApiCall(
      "entry/create",
      "post",
      {
        users: [...selectedUsers, userData.user._id],
        remark,
        groupId: groupInfo._id,
        total,
      },
      null,
      (data, err) => {
        if (err) return;
        fetchGroupDetails();
        setIsEntryModal(false);
        showToast({ message: "New entry created successfully" });
      }
    );
  };

  const handleUserChanges = (user) => {
    setCurrentUser({ id: user.userId?._id, name: user.userId?.name });
  };

  const settleRecord = (record) => {
    console.log(record, record.to, currentUser);
    const amount = Math.abs(record.cost);
    const receiverId = record.to?.id;
    const payerId = currentUser.id;

    const calcAmount = (exp, amt) => {
      let finalAmt = exp + amt;
      finalAmt =
        Number(Math.abs(finalAmt.toFixed(2))) < 0.1 ? 0 : Number(finalAmt);
      return finalAmt;
    };

    const updateGroupRecord = (item) => {
      if (item?.userId?._id === receiverId) {
        item.expense = calcAmount(item.expense, -amount);
      } else if (item?.userId?._id === payerId) {
        item.expense = calcAmount(item.expense, amount);
      }
      return item;
    };

    handleApiCall(
      "entry/settle",
      "post",
      {
         receiverId,
         payerId,
        groupId: groupInfo._id,
        amount
      },
      null,
      (data, err) => {
        if (err) return;
        setGroupData((prev) => {
          prev.groupRecords = groupRecords.map(updateGroupRecord);
          return { ...prev };
        });
        const updatedRecords = updateRecords(records, record.to, currentUser);
        setRecords(updatedRecords);
        showToast({ message: "Record settled" });
      }
    );

  };

  const addParticipants = (newUsers) => {
    if(!newUsers.length) return;
    handleApiCall(
      `group/update`,
      "post",
      {
        newUsers,
        groupId:groupInfo._id
      },
      setLoading,
      (data, err) => {
        if (err) return;
        setIsAddmodal(!isAddModal)
        fetchGroupDetails();
      }
    );
  }

  console.log(records);


  if(isLoading) return <Loader/>

  return (
    <div>
      <div className="text-white mx-2 header-bar">
        <div className="header-button-container">
          <span
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            &#x276E;&nbsp;back
          </span>
        </div>
        <h2>Total Expense : {groupInfo?.expense || 0}</h2>
      </div>
      <div className="text-white mx-2 header-bar">
        <h3>{groupInfo?.name}</h3>
        <div className="header-button-container">
        <button
            className="cursor-pointer"
            onClick={() => setIsAddmodal(!isAddModal)}
          >
            Add participants
          </button>
          <button
            className="cursor-pointer"
            onClick={() => setIsEntryModal(!isentryModal)}
          >
            Create Entry
          </button>
        </div>
      </div>
      <div className="items-wrapper">
        <div className="user-box-container">
          {groupRecords?.map((item) => (
            <div key={item._id} className="item-container cursor-pointer">
              <div
                className={
                  "user-box-item" +
                  (item.userId._id === currentUser?.id ? " active-item" : "")
                }
                onClick={() => handleUserChanges(item)}
              >
                <h3>{item.userId?.name}</h3>
                <h2 style={{ color: item.expense < 0 ? "red" : "green" }}>
                  {item.expense.toFixed(2)}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentUser ? (
        <div className="record-box">
          <h3>Records</h3>
          {records[currentUser.id]?.length
            ? records[currentUser.id].map((rcd) => (
                <div key={rcd.to?.id || rcd.from?.id} className="list-item">
                  {rcd.to ? (
                    <div className="depth-record">
                      <div>
                        You debt{" "}
                        <span className="depth-amount">
                          {Math.abs(rcd.cost.toFixed(2))}
                        </span>{" "}
                        to <span>{rcd.to.name}</span>{" "}
                      </div>
                      <div>
                        {/* <button
                            type="button"
                            className="mx-1"
                            onClick={() => {
                              setPartialPay(rcd);
                              setTimeout(() => {
                                window.scrollTo({
                                  left: 0,
                                  top: document.body.scrollHeight,
                                  behavior: "smooth",
                                });
                              }, 10);
                            }}
                          >
                            Pay
                          </button> */}
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => settleRecord(rcd)}
                        >
                          Settle
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      You own{" "}
                      <span className="own-amount">
                        {Math.abs(rcd.cost.toFixed(2))}
                      </span>{" "}
                      from <span>{rcd.from.name}</span>{" "}
                    </div>
                  )}
                </div>
              ))
            : "All Settled"}
        </div>
      ) : null}

      {isentryModal && (
        <CreateEntryModal
          userList={userList}
          onClose={() => setIsEntryModal(!isentryModal)}
          createEntry={createEntry}
          showToast={showToast}
        />
      )}

      {isAddModal && <AddGroupUserModal
          onClose={() => setIsAddmodal(!isAddModal)}
          userList={userList}
          handleSubmit={addParticipants}
        />}

      {/* frontroll testing */}
    </div>
  );
};

export default GroupDetails;
