import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/sqlite/userDetailSqliteDB";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import { getLastPulledOn } from "../util/sqlite/serverDatatoSqliteDB";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const uniqueId = authCtx.uniqueId;
  async function loginHandler({ userName, password }) {
    setIsAuthenticating(true);
    try {
      const userData = await login(userName, password);
      //  console.log(userData);
      if (!userData) {
        Alert.alert("Invalid login!", `User Name or Password Incorrect !`);
        setIsAuthenticating(false);
        return;
      }
      authCtx.authenticate(userData);
      const LastPulledDate = await getLastPulledOn();
      authCtx.saveLastPulledOn(LastPulledDate);
    } catch (error) {
      Alert.alert("Authentication failed!", error.message);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
