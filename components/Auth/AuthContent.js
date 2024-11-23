import { useState, useContext } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Network from "expo-network";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import { userCheck } from "../../util/database/auth";
import { insertUserDataToSqlite } from "../../util/sqlite/userDetailSqliteDB";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../ui/LoadingOverlay";

function AuthContent({ isLogin, onAuthenticate }) {
  const [regProgress, setRegProgress] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    userName: false,
    password: false,
    confirmPassword: false,
  });

  async function registerNewUserHandler() {
    try {
      setRegProgress(true);
      let uniqueId = authCtx.uniqueId;
      const { isInternetReachable, type } =
        await Network.getNetworkStateAsync();
      if (!isInternetReachable) {
        Alert.alert("Network error", "Check Your Internet Connection...");
        setRegProgress(false);
        return;
      }
      const userData = await userCheck(uniqueId);
      //Alert.alert("Message", JSON.stringify(userData));
      if (userData.IsValidApp === "N") {
        Alert.alert(
          "Invalid Version",
          `This version is outdatad. Update latest version ${userData.AppCurVersion}`
        );
        setRegProgress(false);
        return;
      }
      if (userData.IsValidUser === "N") {
        //  console.log(typeof userData.IsValidUser);
        // console.log(uniqueId);
        Alert.alert(
          "Register",
          `No user match for this mobile. Register with following ID ${uniqueId}`
        );
        setRegProgress(false);
        return;
      }
      if (userData.IsValidUser === "M") {
        //uniqueId = uuidv4(); // Generate new UUID
        Alert.alert(
          "Register",
          `Multiple users Registered with this mobile ID ${uniqueId}. Contact your admin`
        );
        setRegProgress(false);
        return;
      }
      const result = await insertUserDataToSqlite(userData);
      Alert.alert("Success", result);
      setRegProgress(false);
    } catch (error) {
      // console.warn(error);
      Alert.alert("Error", error.message || JSON.stringify(error));
      setRegProgress(false);
    }
  }

  function submitHandler(credentials) {
    let { userName, password, confirmPassword } = credentials;

    userName = userName.trim();
    password = password.trim();

    const userNameIsValid = userName.length !== 0;
    const passwordIsValid = password.length !== 0;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !userNameIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        userName: !userNameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ userName, password });
  }

  if (regProgress) {
    return <LoadingOverlay message="Registration in progress..." />;
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={styles.authContent}>
          <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsInvalid={credentialsInvalid}
          />
          <View style={styles.buttons}>
            <FlatButton onPress={registerNewUserHandler}>
              {isLogin
                ? "To register this mobile click here"
                : "Log in instead"}
            </FlatButton>
          </View>
          <Text style={styles.footer}>J.J.Tech Mobile Application (DVR)</Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  footer: {
    color: "grey",
    textAlign: "center",
    fontSize: 10,
  },
});
