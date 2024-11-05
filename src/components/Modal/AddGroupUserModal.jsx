import React, { useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { handleApiCall } from "../../utility/apiCall";
import UserListBox from "./userList";
import RemoteUserListBox from "./RemoteUserModal";

const AddGroupUserModal = ({ userList = [],handleSubmit }) => {
  const [users, setUsers] = useState(new Set([]));

  const handleChange = (id) => {
    const newUserSet = new Set(users);

    newUserSet.has(id) ? newUserSet.delete(id) : newUserSet.add(id);

    setUsers(newUserSet);
  };

  const createGroup = () => {
    //  const name = ref.current.value;
     const selectedUsers = [...users];
     console.log(selectedUsers,userList);
     const newUsers = selectedUsers.filter(item=>!userList.some(it=>it._id===item));
     console.log(newUsers)
     handleSubmit(newUsers)
  }



  return (
    <div>
      <div className="group-modal-container">
        <h3>Add participants</h3>
        {/* <UserListBox userlist={userList}/> */}
        <RemoteUserListBox users={users} handleChange={handleChange} userlist={userList}/>
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

export default ModalWrapper(AddGroupUserModal);
