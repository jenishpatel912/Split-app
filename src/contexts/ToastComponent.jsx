import React, { useEffect, useState } from "react";
import "./toast.css";
import Toaster from "./Toaster";

const ToastComponent = ({ toast }) => {
  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    if (toast) {
      setNewMessages((prev) => [{...toast,key:Date.now()},...prev]);
    }
  }, [toast]);

  //   useEffect(() => {
  //     let messageTimeout;
  //     if (toast.message) {
  //       if (!newMessage) setNewMessage(toast.message);
  //       messageTimeout = setTimeout(() => {
  //         setNewMessage("");
  //       }, 3000);
  //       if (newMessage) {
  //         setNewMessage("");
  //         setTimeout(() => {
  //           setNewMessage(toast.message);
  //         }, 500);
  //       }
  //     }

  //     return () => {
  //       clearTimeout(messageTimeout);
  //     };
  //   }, [toast]);

  //   const handleClose = () => {
  //     setNewMessage("");
  //   };

  return (
    <div className="toast-container">
      {newMessages.map((item,index) => (
        <Toaster data={item} key={item.key} setNewMessages={setNewMessages} index={index}/>
      ))}
    </div>
  );
};

export default ToastComponent;
