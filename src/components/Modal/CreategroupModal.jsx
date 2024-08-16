import React, { useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { handleApiCall } from "../../utility/apiCall";
import UserListBox from "./userList";

const CreategroupModal = ({ userList = [],handleSubmit }) => {
  const [users, setUsers] = useState(new Set([]));
  const ref = useRef();

  const handleChange = (id) => {
    const newUserSet = new Set(users);

    newUserSet.has(id) ? newUserSet.delete(id) : newUserSet.add(id);

    setUsers(newUserSet);
  };

  const createGroup = () => {
     const name = ref.current.value;
     const selectedUsers = [...users]
     handleSubmit(name,selectedUsers)
  }



  return (
    <div>
      <div className="group-modal-container">
        <h3>Create Group</h3>
        <div className="amount-box p-0">
          <label>Enter Group Name</label>
          <div>
            <input
              type="text"
              ref={ref}
              className="group-name-input"
              //   onKeyDown={(e) => e.keyCode === 13 && addNewUser()}
            />
          </div>
        </div>
        {/* <UserListBox userlist={userList}/> */}
        <UserListBox users={users} handleChange={handleChange} userlist={userList} title="Add Members"/>
        <div className="create-group-footer">
          <button
            type="button"
            className="cancle-button px-1"
            // onClick={() => setAddNew(false)}
          >
            Cancle
          </button>
          <button
            type="button"
            className="mx-1 submit-button px-1"
            onClick={createGroup}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper(CreategroupModal);
