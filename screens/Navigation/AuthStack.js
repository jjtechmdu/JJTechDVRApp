import { createNativeStackNavigator } from "@react-navigation/native-stack";
import appConfig from "../../app.json";

import LoginScreen from "../LoginScreen";
import { Colors } from "../../constants/styles";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Daily Entry App",
          headerRight: ({ tintColor }) => {
            return (
              <Text style={{ color: tintColor }}>
                ver {appConfig.expo.version}
              </Text>
            );
          },
        }}
      />
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
}
export default AuthStack;
