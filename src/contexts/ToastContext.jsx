import {
  createContext,
  useContext,
  useState,
  memo,
  useRef,
  useEffect,
} from "react";
import ToastComponent from "./ToastComponent";
import MemoizedContainer from "./MemoizedContainer";

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [message, showToast] = useState();

  return (
    <ToastContext.Provider value={{ message, showToast }}>
      <ToastComponent toast={message} />
      <MemoizedContainer> 
      {children}
     </MemoizedContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { showToast } = useContext(ToastContext);
  return showToast;
};
