//import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  userData: "",
  isAuthenticated: false,
  uniqueId: "",
  lastPulledOn: null,
  authenticate: (userData) => {},
  saveUniqueId: (uniqueId) => {},
  saveLastPulledOn: (lastPulledOn) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authUserData, setAuthUserData] = useState();
  const [authUniqueId, setAuthUniqueId] = useState();
  const [lastPulledOn, setLastPulledOn] = useState();

  function authenticate(userData) {
    setAuthUserData(userData);
    // AsyncStorage.setItem("userData", userData);
  }

  function saveUniqueId(uniqueId) {
    setAuthUniqueId(uniqueId);
  }

  function saveLastPulledOn(LastPulledDate) {
    setLastPulledOn(LastPulledDate);
  }

  function logout() {
    setAuthUserData(null);
    //  setAuthUniqueId(null);
    // AsyncStorage.removeItem("userData");
  }

  const value = {
    userData: authUserData,
    uniqueId: authUniqueId,
    lastPulledOn: lastPulledOn,
    isAuthenticated: !!authUserData,
    authenticate: authenticate,
    saveUniqueId: saveUniqueId,
    saveLastPulledOn: saveLastPulledOn,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
