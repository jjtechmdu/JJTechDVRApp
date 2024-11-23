import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../../store/auth-context";
import IconButton from "../../components/ui/IconButton";
import WelcomeScreen from "../WelcomeScreen";
import { Colors } from "../../constants/styles";
import GetServerData from "../../components/serverutils/GetServerData";
import SendToServer from "../../components/serverutils/SendToServer";
import TripOpenScreen from "../TripOpenScreen";
import TripCloseScreen from "../TripCloseScreen";
import CustomDrawerContent from "../../components/Navigation/CustomDrawerContent";
import ScanScreen from "../ScanScreen";
import TripReopen from "../TripReopen";
import FeedTransferScreen from "../FeedTransferScreen";
import ReportScreen from "../ReportScreen";
import OtherVisit from "../OtherVisit";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: Colors.primary100 },
        drawerInactiveTintColor: "black",
        drawerActiveTintColor: Colors.primary800,
        drawerActiveBackgroundColor: Colors.primary300,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={authCtx.logout}
          />
        ),
        headerTitle: () => (
          <View>
            <Text style={styles.title}>{route.name}</Text>
            <Text style={styles.Brtitle}>{authCtx.userData.BranchName}</Text>
          </View>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={WelcomeScreen}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Get From Server"
        options={{
          headerTitle: "Home",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="download" color={color} size={size} />
          ),
        }}
        component={GetServerData}
      />
      <Drawer.Screen
        name="Send To Server"
        options={{
          headerTitle: "Home",
          drawerIcon: ({ color, size }) => (
            <AntDesign name="upload" color={color} size={size} />
          ),
        }}
        component={SendToServer}
      />
    </Drawer.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
        headerTitle: () => (
          <View>
            <Text style={styles.title}>{route.name}</Text>
            <Text style={styles.Brtitle}>{authCtx.userData.BranchName}</Text>
          </View>
        ),
      })}
    >
      <Stack.Screen
        name="Drawer"
        options={{
          headerShown: false,
        }}
        component={DrawerNavigator}
      />
      <Stack.Screen name="Trip Open" component={TripOpenScreen} />
      <Stack.Screen name="Trip Close" component={TripCloseScreen} />
      <Stack.Screen name="Trip Reopen" component={TripReopen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Feed Transfer" component={FeedTransferScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Other Visit" component={OtherVisit} />
    </Stack.Navigator>
  );
}

export default AuthenticatedStack;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
    color: Colors.primaryWh800,
  },
  Brtitle: {
    fontSize: 14,
    marginBottom: 4,
    color: Colors.primaryWh800,
  },
});
