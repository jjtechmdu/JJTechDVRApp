import { useCallback, useContext, useEffect, useLayoutEffect } from "react";
import { Text, BackHandler, Alert } from "react-native";
import * as Network from "expo-network";
import { useFocusEffect } from "@react-navigation/native";

import LoadingOverlay from "../ui/LoadingOverlay";
import { AuthContext } from "../../store/auth-context";
import {
  deleteUserDataFromSqlite,
  validateUserData,
} from "../../util/sqlite/userDetailSqliteDB";
import { userCheck } from "../../util/database/auth";
import {
  dropAndCreateTables,
  FlushData,
} from "../../util/sqlite/initializeSqliteDB";
import {
  getBatchData,
  getItemData,
  getReasonData,
  getServerDateData,
  getVehicleData,
} from "../../util/database/getServerData";
import {
  getLastPulledOn,
  insertBatchDataToSqlite,
  insertItemDataToSqlite,
  insertReasonDataToSqlite,
  insertServerDateDataToSqlite,
  insertVehicleDataToSqlite,
} from "../../util/sqlite/serverDatatoSqliteDB";

function GetServerData({ navigation }) {
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    const onBackPress = () => true; // Disable back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("Screen is focused");
      async function checkInternetConnection() {
        try {
          await FlushData();
          const uniqueId = authCtx.uniqueId;
          console.log(uniqueId);
          const { isInternetReachable } = await Network.getNetworkStateAsync();
          if (!isInternetReachable) {
            Alert.alert("Network error", "Check Your Internet Connection...");
            return;
          }
          const userData = await userCheck(uniqueId);
          if (userData.IsValidApp === "N") {
            Alert.alert(
              "Invalid Version",
              `This version is outdatad. Update latest version ${userData.AppCurVersion}`
            );
            return;
          }
          if (userData.IsValidUser === "N") {
            Alert.alert(
              "Register",
              `This mobile user details modified / deleted. Contact your admin with following ID ${uniqueId}`
            );
            await deleteUserDataFromSqlite();
            return;
          }
          if (userData.IsValidUser === "M") {
            Alert.alert(
              "Register",
              `Multiple users Registered with this mobile ID ${uniqueId}. Contact your admin`
            );
            return;
          }
          const userDataValid = await validateUserData(userData);
          if (!userDataValid) {
            Alert.alert(
              "Register",
              `This User account is modified. Please click create user or change user..`
            );
            await deleteUserDataFromSqlite();
            return;
          }
          await dropAndCreateTables();
          const BatchData = await getBatchData(userData.BranchOid);
          //console.log(BatchData);
          const result = await insertBatchDataToSqlite(BatchData);
          const ReasonData = await getReasonData();
          await insertReasonDataToSqlite(ReasonData);
          const ItemData = await getItemData(userData.BranchOid);
          await insertItemDataToSqlite(ItemData);
          const VehicleData = await getVehicleData(userData.BranchOid);
          await insertVehicleDataToSqlite(VehicleData);
          const ServerDateData = await getServerDateData();
          await insertServerDateDataToSqlite(ServerDateData);
          const LastPulledDate = await getLastPulledOn();
          authCtx.saveLastPulledOn(LastPulledDate);
          console.log(result);
          console.log("sucess");
          Alert.alert("Sucess", "Data Pulled from server successfully...");
        } catch (error) {
          console.log(error);
          Alert.alert(
            "Error",
            `An unexpected error occurred ${error}. Please try again.`
          );
        } finally {
          navigation.navigate("Home");
        }
      }
      checkInternetConnection();
      return () => {
        console.log("Screen is unfocused");
      }; // Optional cleanup when the screen is unfocused
    }, [authCtx.uniqueId, navigation])
  );

  return <LoadingOverlay message="Fetching Data From Server... Please wait!" />;
}

export default GetServerData;
