import React, { useCallback, useContext, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // For down arrow icon

import {
  getTodayTripData,
  getVehicleList,
  PreviousTripClosedCheck,
} from "../util/sqlite/tripDetailsSqlite";
import { useFocusEffect } from "@react-navigation/native";
import { formatDate, GetCurrentDate, getformatedCurDate } from "../util/helper";
import { AuthContext } from "../store/auth-context";
import VehicleList from "../components/Trip/VehicleList";
import { getTodayDVRDataCheck } from "../util/sqlite/DVRDetailsSqlite";
import { getTodayOtherVisitDataCheck } from "../util/sqlite/otherVisitDetailsSqlite";

function TripOpenScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const authCtx = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true; // Guard against unmounted component
      async function getVehicleNoList() {
        try {
          const DeviceDate = GetCurrentDate();
          const ServerDate = formatDate(authCtx.lastPulledOn);
          if (DeviceDate !== ServerDate) {
            Alert.alert(
              "Message",
              "No Data found. Please Pull Data from Server.. Otherwise Device Date is wrong. Please set the correct date.."
            );
            navigation.navigate("Home");
            return;
          }
          const ValidPrevTripClosed = await PreviousTripClosedCheck(
            authCtx.userData.Accode
          );
          if (ValidPrevTripClosed) {
            Alert.alert(
              "Message",
              "Previous Trip not closed.. Please Close the Previous Trip.."
            );
            navigation.navigate("Home");
            return;
          }
          const TodayTripData = await getTodayTripData(authCtx.userData.Accode);
          if (TodayTripData) {
            if (TodayTripData.OpeningImageUpload === "Y") {
              Alert.alert(
                "Message",
                "Open Km image Uploaded to Server... You Can't Open Trip.."
              );
              navigation.navigate("Home");
              return;
            }
            if (TodayTripData.TripClose === "Y") {
              Alert.alert(
                "Message",
                "Trip Already Closed... You Can't Open the Trip twice a day.."
              );
              navigation.navigate("Home");
              return;
            }
          }
          const isDVRDataCheck = await getTodayDVRDataCheck(
            authCtx.userData.Accode
          );
          if (isDVRDataCheck) {
            Alert.alert(
              "Message",
              "Daily Entry Placed. So you can't modify KM.."
            );
            navigation.navigate("Home");
            return;
          }
          const isOtherVisitDataCheck = await getTodayOtherVisitDataCheck(
            authCtx.userData.Accode
          );
          if (isDVRDataCheck) {
            Alert.alert(
              "Message",
              "Other Visit Entry Placed. So you can't modify KM.."
            );
            navigation.navigate("Home");
            return;
          }

          if (isMounted) {
            const vehicleList = await getVehicleList();
            //console.log(vehicleList);
            setData(vehicleList);
            const CurrentDate = getformatedCurDate();
            console.log(CurrentDate);
          }
        } catch (error) {
          Alert.alert("Error", error);
        }
      }
      getVehicleNoList();

      return () => {
        isMounted = false; // Cleanup
      };
    }, [])
  );

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* TextInput with Down Arrow */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={selectedItem.VehicleNo}
            placeholder="Select Vehicle No"
            editable={false} // Disable typing
          />
          <AntDesign name="down" size={20} color="gray" />
        </View>
      </TouchableOpacity>

      <VehicleList
        data={data}
        onPress={handleSelect}
        isModalVisible={modalVisible}
        onClose={handleClose}
      />
    </View>
  );
}

export default TripOpenScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});
