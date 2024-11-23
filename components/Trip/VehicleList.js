import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function VehicleList({ data, onPress, isModalVisible, onClose }) {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  // Update filteredData whenever data changes
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = data.filter((item) =>
      item.VehicleNo.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSelect = (item) => {
    onPress(item);
    setSearch("");
    setFilteredData(data); // Reset search when closing modal
    onClose();
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChangeText={handleSearch}
          />

          {/* List of Items */}
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleSelect(item)}
              >
                <Text>{item.VehicleNo}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default VehicleList;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "50%",
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
    padding: 10,
    backgroundColor: "tomato",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
