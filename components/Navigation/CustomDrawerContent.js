import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";
import { formatDateTime } from "../../util/helper";

const CustomDrawerContent = (props) => {
  // SafeAreaInsets to handle padding for different screens
  const insets = useSafeAreaInsets();
  const authCtx = useContext(AuthContext);
  // Dummy user details - replace with dynamic user data
  const user = {
    name: authCtx.userData.SupervisorName,
    farms: 5,
    // profileImage: require("../../assets/avatar.png"), // Replace with actual image URL or local image
    lastUpdated: authCtx.lastPulledOn
      ? formatDateTime(authCtx.lastPulledOn)
      : "",
  };

  return (
    <View style={styles.drawer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: Colors.primary500,
        }}
      >
        {/* User Profile Section */}
        <View style={styles.userInfoSection}>
          {/* <FontAwesome6
            style={styles.profileImage}
            name="user-circle"
            size={48}
            color={Colors.primary800}
          /> */}
          <FontAwesome5
            style={styles.profileImage}
            name="user-alt"
            size={48}
            color={Colors.primary800}
          />
          {/* <Image
            source={user.profileImage} // Display user profile image
            style={styles.profileImage}
          /> */}
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userFarms}>Visited farms: {user.farms}</Text>
          <Text style={styles.lastUpdated}>
            Last pulled on: {user.lastUpdated}
          </Text>
        </View>
        {/* Drawer Items */}
        <View style={styles.drawerItem}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  userInfoSection: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primarygr100,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    textAlign: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary800,
  },
  userFarms: {
    fontSize: 14,
    color: Colors.primaryWh800,
  },
  lastUpdated: {
    fontSize: 12,
    color: Colors.primary100,
    marginTop: 5,
  },
  drawerItem: {
    backgroundColor: Colors.primaryWh800,
    flex: 1,
    paddingTop: 10,
  },
});

export default CustomDrawerContent;
