import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import UserListBox from "./userList";

const CreateEntryModal = ({ userList = [], createEntry, showToast }) => {
  const [users, setUsers] = useState(new Set([]));
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState("");
  const [isUserSelected, setIsUserSelected] = useState(false);
  // const ref = useRef();

  const handleChange = (id) => {
    if (id === "all") {
      const userSet =
        users?.size !== userList.length ? userList.map((item) => item._id) : [];
      setUsers(new Set(userSet));
      return;
    }
    const newUserSet = new Set(users);

    newUserSet.has(id) ? newUserSet.delete(id) : newUserSet.add(id);

    setUsers(newUserSet);
  };
  const makeNewEntry = () => {
    const selectedUsers = [...users];
    if (isUserSelected) {
      if (amount <= 0) {
        showToast({ message: "value must be positive number", type: "error" });
        return;
      }
      createEntry(selectedUsers, Number(amount), remark);

      return;
    }

    if (selectedUsers.length) {
      setIsUserSelected(true);
      return;
    }

    showToast({ message: "Select atleast one user", type: "error" });
  };

  return (
    <div>
      <div className="group-modal-container">
        <h3>Create Entry</h3>
        <div style={{ minHeight: "300px" }}>
          {isUserSelected ? (
            <div>
              <div className="amount-box p-0">
                <label>Amount</label>
                <div>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="group-name-input"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    name="amount"
                    //   onKeyDown={(e) => e.keyCode === 13 && addNewUser()}
                  />
                </div>
              </div>
              <div className="amount-box p-0">
                <label>Remarks</label>
                <div>
                  <input
                    type="text"
                    onChange={(e) => setRemark(e.target.value)}
                    name="remarks"
                    value={remark}
                    placeholder="Enter remarks"
                    className="group-name-input"
                    //   onKeyDown={(e) => e.keyCode === 13 && addNewUser()}
                  />
                </div>
              </div>
            </div>
          ) : (
            <UserListBox
              users={users}
              handleChange={handleChange}
              userlist={userList}
              title="Select Participants"
              selectall
            />
          )}
        </div>
        <div className="create-group-footer">
          {isUserSelected ? (
            <button
              type="button"
              className="mx-1 submit-button p-1"
              onClick={() => setIsUserSelected(false)}
            >
              &#x276E;&nbsp;Back
            </button>
          ) : null}
          <button
            type="button"
            className="mx-1 submit-button p-1"
            onClick={makeNewEntry}
          >
            {isUserSelected ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper(CreateEntryModal);
