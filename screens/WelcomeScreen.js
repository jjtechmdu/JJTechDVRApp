import { useContext } from "react";
import { FlatList } from "react-native";
import { AuthContext } from "../store/auth-context";
import { SCREENLIST } from "../constants/global";
import ScreenGridTitle from "../components/ui/ScreenGridTiltle";

function WelcomeScreen({ navigation }) {
  const autCtx = useContext(AuthContext);

  function renderScreenItem(itemData) {
    function pressHandler() {
      const screenName = itemData.item.screenName || "WelcomeScreen";
      navigation.navigate(screenName, {
        screenId: itemData.item.id,
      });
    }

    return (
      <ScreenGridTitle
        title={itemData.item.title}
        color={itemData.item.color}
        icon={itemData.item.icon}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={SCREENLIST}
      keyExtractor={(item) => item.id}
      renderItem={renderScreenItem}
      numColumns={3}
    />
  );
}

export default WelcomeScreen;
