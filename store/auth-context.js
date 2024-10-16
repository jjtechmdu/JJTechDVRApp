//import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  userData: "",
  isAuthenticated: false,
  uniqueId: "",
  authenticate: (userData) => {},
  saveUniqueId: (uniqueId) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authUserData, setAuthUserData] = useState();
  const [authUniqueId, setAuthUniqueId] = useState();

  function authenticate(userData) {
    setAuthUserData(userData);
    // AsyncStorage.setItem("userData", userData);
  }

  function saveUniqueId(uniqueId) {
    setAuthUniqueId(uniqueId);
  }

  function logout() {
    setAuthUserData(null);
    setAuthUniqueId(null);
    // AsyncStorage.removeItem("userData");
  }

  const value = {
    userData: authUserData,
    uniqueId: authUniqueId,
    isAuthenticated: !!authUserData,
    authenticate: authenticate,
    saveUniqueId: saveUniqueId,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
