import React, { useEffect, useMemo, useRef, useState } from "react";
import { data } from "./dummyData";
import {
  getDepthRecord,
  updateRecords,
  partiallyUpdateRecord,
} from "./calulate";

import "./splitsvilla.css";

const SplitsVillaV2 = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || data
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [selctedUsers, setSelectedUsers] = useState([]);
  const [openEntry, setOpenEntryBox] = useState(false);
  const [totalExpense, setTotalExpense] = useState(
    +localStorage.getItem("total") || 0
  );
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("records")) || {}
  );

  const [partialPay, setPartialPay] = useState(null);

  const ref = useRef();
  const payAmountref = useRef();
  const remarkRef = useRef();

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("records", JSON.stringify(records));
    localStorage.setItem("total", totalExpense);
  }, [userData, currentUser, records, totalExpense]);

  const handleChange = (user) => {
    if (!user) {
      if (selctedUsers.length === userData.length - 1) setSelectedUsers([]);
      else
        setSelectedUsers(
          userData?.filter((item) => item.id !== currentUser.id)
        );
      return;
    }
    if (selctedUsers.some((item) => item.id === user.id)) {
      setSelectedUsers((prev) => prev.filter((item) => item.id !== user.id));
      return;
    }
    setSelectedUsers((prev) => [...prev, user]);
  };
  const handleUserChanges = (item) => {
    setCurrentUser(item);
    setSelectedUsers([]);
  };
  const createEntry = () => {
    const value = ref.current.value;
    const remark = remarkRef.current.value || "no remark";
    if (value <= 0) {
      alert("value must be positive number");
      return;
    }
    const length = selctedUsers.length;
    if (length === 0) {
      alert("Select atleast one user");
      return;
    }
    const averageAmount = value / (length + 1);
    const uniqueId = Date.now();
    const newUserList = userData.map((item) =>
      selctedUsers.some((usr) => usr.id === item.id)
        ? {
            ...item,
            amount: item.amount - averageAmount,
            history: [
              ...item.history,
              {
                entryBy: { id: currentUser.id, name: currentUser.name },
                amount: averageAmount,
                total: value,
                users: selctedUsers,
                id: uniqueId,
                remark,
              },
            ],
          }
        : item.id === currentUser.id
        ? {
            ...item,
            amount: item.amount + length * averageAmount,
            history: [
              ...item.history,
              {
                entryBy: { id: currentUser.id, name: currentUser.name },
                amount: averageAmount,
                total: value,
                users: selctedUsers,
                id: uniqueId,
                remark,
              },
            ],
          }
        : item
    );
    setUserData(newUserList);
    setOpenEntryBox(false);
    setTotalExpense(totalExpense + Number(value));
    setCurrentUser((item) => ({
      ...item,
      amount: item.amount + length * averageAmount,
      history: [
        ...item.history,
        {
          entryBy: { id: currentUser.id, name: currentUser.name },
          amount: averageAmount,
          total: value,
          users: selctedUsers,
          id: uniqueId,
          remark,
        },
      ],
    }));
    setRecords(getDepthRecord(newUserList));
    setSelectedUsers([]);
  };

  const settleRecord = (record, isPartial) => {
    if (!record.to) return;
    const value = +payAmountref?.current?.value;
    if (isPartial === "partial") {
      if (value <= 0) {
        alert("value must be positive number");
        return;
      }
      if (value > Math.abs(record.cost)) {
        alert("value must be less than settle amount");
        return;
      }
    }
    const ownUser = record.to;
    const cost =
      isPartial === "partial"
        ? +payAmountref?.current?.value
        : Math.abs(record.cost).toFixed(2);
    const newUserList = userData.map((item) =>
      item.id === ownUser.id || item.id === currentUser.id
        ? {
            ...item,
            amount: Number(
              item.amount.toFixed(2) - (item.id === ownUser.id ? +cost : -cost)
            ),
            history: [
              ...item.history,
              {
                settledBy: {
                  id: currentUser.id,
                  name: currentUser.name,
                  with: ownUser.name,
                },
                amount: cost,
                id: Date.now(),
              },
            ],
          }
        : item
    );
    let updatedRecords;
    if (isPartial === "partial") {
      updatedRecords = partiallyUpdateRecord(
        records,
        ownUser,
        currentUser,
        value
      );
      setPartialPay(null)
    } else updatedRecords = updateRecords(records, ownUser, currentUser);
    setRecords(updatedRecords);
    setCurrentUser((item) => ({
      ...item,
      amount: Number(item.amount.toFixed(2) + cost),
      history: [
        ...item.history,
        {
          settledBy: {
            id: currentUser.id,
            name: currentUser.name,
            with: ownUser.name,
          },
          amount: cost,
          id: Date.now(),
        },
      ],
    }));
    setUserData(newUserList);
  };
  const handleKeyChange = (e) => {
    if (e.keyCode === 13) createEntry();
  };

  const handleClear = () => {
    setUserData([...data]);
    setRecords({});
    setTotalExpense(0);
    setCurrentUser(null);
  };

  const addNewUser = () => {
    const newUser = {
      name: `User${userData.length + 1}`,
      amount: 0,
      id: Date.now(),
      history: [],
    };
    setUserData((prev) => [...prev, newUser]);
  };
  const openCloseEntryBox = () => {
    setOpenEntryBox((prev) => !prev);
  };
  return (
    <div>
      <div className="text-white mx-2 p-1 header-bar">
        <div className="header-button-container">
          <button onClick={addNewUser}>Add New User</button>
          <button onClick={handleClear}>Clear All</button>
        </div>
        <h2>Total Expense : {totalExpense}</h2>
      </div>
      <div className="items-wrapper">
        <div className="user-box-container">
          {userData?.map((item) => (
            <div key={item.name} className="item-container">
              <div
                className={
                  "user-box-item" +
                  (item.id === currentUser?.id ? " active-item" : "")
                }
                onClick={() => handleUserChanges(item)}
              >
                <h3>{item.name}</h3>
                <h2 style={{ color: item.amount < 0 ? "red" : "green" }}>
                  {item.amount}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentUser && (
        <div>
          <div className="add-entry-box">
            <h2 style={{ color: "#FFF" }}>{currentUser.name}</h2>
            <button type="button" onClick={openCloseEntryBox}>
              {openEntry ? "Cancel Entry" : "Create New Entry"}
            </button>
          </div>
          {openEntry && (
            <div className="new-entry-box">
              <h3>Add Entry</h3>
              <div className="select-box">
                <h4 className="select-item">Select Users</h4>
                <div className="select-item">
                  <input
                    type="checkbox"
                    onChange={() => handleChange()}
                    checked={selctedUsers.length === userData.length - 1}
                  />
                  <span>Select All</span>
                </div>
                {userData
                  ?.filter((item) => item.id !== currentUser.id)
                  .map((item) => (
                    <div key={item.id} className="select-item">
                      <input
                        type="checkbox"
                        onChange={() => handleChange(item)}
                        checked={selctedUsers.some((usr) => usr.id === item.id)}
                      />{" "}
                      <span>{item.name}</span>
                    </div>
                  ))}
              </div>
              <div className="amount-box">
                <label>Enter Amount</label>
                <div>
                  <input
                    type="number"
                    ref={ref}
                    className="input-amount"
                    onKeyDown={handleKeyChange}
                  />
                </div>
              </div>
              <div className="amount-box">
                <label>Remarks</label>
                <div>
                  <input
                    type="text"
                    ref={remarkRef}
                    className="input-amount"
                    onKeyDown={handleKeyChange}
                  />
                </div>
              </div>
              <div>
                <button type="button" onClick={createEntry}>
                  Create
                </button>
              </div>
            </div>
          )}
          <div className="history-box">
            <h3>History</h3>
            {currentUser.history?.length
              ? currentUser.history?.map((item) => (
                  <div key={item.id} className="list-item">
                    {item.settledBy ? (
                      <>
                        <span className="own-amount">{item.amount}</span>
                        {` settled by ${
                          currentUser.id === item.settledBy.id
                            ? "you"
                            : item.settledBy.name
                        } with ${
                          currentUser.id !== item.settledBy.id
                            ? "you"
                            : item.settledBy.with
                        }`}
                      </>
                    ) : item.entryBy.id === currentUser.id ? (
                      `You created entry of ${item.total} , ${item.amount}`
                    ) : (
                      `${item.entryBy.name} created entry of ${item.total} , ${item.amount}`
                    )}
                    {item.entryBy &&
                      ` each (${item.users.map((usr) =>
                        usr.id === currentUser.id ? "you" : usr.name
                      )}) - (${item.remark})`}
                  </div>
                ))
              : "No History Data Yet."}
          </div>
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
                            {Math.abs(rcd.cost)}
                          </span>{" "}
                          to <span>{rcd.to.name}</span>{" "}
                        </div>
                        <div>
                          <button
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
                          </button>
                          <button
                            type="button"
                            onClick={() => settleRecord(rcd)}
                          >
                            Settle
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        You own{" "}
                        <span className="own-amount">{Math.abs(rcd.cost)}</span>{" "}
                        from <span>{rcd.from.name}</span>{" "}
                      </div>
                    )}
                  </div>
                ))
              : "All Settled"}
          </div>
          <div>
            {!!partialPay && (
              <div className="new-entry-box">
                <h3>Add Amount</h3>
                <div className="amount-box">
                  <label>Enter Amount</label>
                  <div>
                    <input
                      type="number"
                      ref={payAmountref}
                      className="input-amount"
                      // onKeyDown={handleKeyChange}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="mx-1"
                    onClick={() => settleRecord(partialPay, "partial")}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancle-button"
                    onClick={() => setPartialPay(null)}
                  >
                    Cancle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitsVillaV2;
