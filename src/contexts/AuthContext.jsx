import { useContext, createContext, useState } from "react";

const AuthenticationContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userinfo"))
  );

  return (
    <AuthenticationContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthenticationContext);
};
