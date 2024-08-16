import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

export const ModalContainer = ({ children, onClose }) => {
  useEffect(() => {
    const element = document.createElement("div");
    element.classList.add("modal-container");

    //   ReactDOM.render(children, element);
    ReactDOM.createRoot(element).render(children);

    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");

    document.body.appendChild(element);
    document.body.appendChild(backdrop);

    const removeModal = () => {
      document.body.removeChild(element);
      document.body.removeChild(backdrop);
    };
    backdrop.addEventListener("click", onClose);
    return removeModal;
  }, []);
  return <></>;
};
