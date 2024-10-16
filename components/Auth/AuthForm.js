import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    userName: userNameIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "userName":
        setEnteredUserName(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      userName: enteredUserName,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/Logoimages/logo.png")}
        />
        <Input
          label="User Name"
          onUpdateValue={updateInputValueHandler.bind(this, "userName")}
          value={enteredUserName}
          isInvalid={userNameIsInvalid}
        />
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Register"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  image: {
    width: "100%",
    resizeMode: "center",
  },
});
