import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { StyleSheet, View, Alert } from "react-native";
import * as Application from "expo-application";

import { init } from "./util/sqlite/userDetailSqliteDB";
import AuthStack from "./screens/Navigation/AuthStack";
import AuthenticatedStack from "./screens/Navigation/AuthenticatedStack";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function Navigation({ onLayout }) {
  const authCtx = useContext(AuthContext);
  return (
    <View style={styles.navigtionContainer} onLayout={onLayout}>
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    </View>
  );
}

function Root() {
  const [appIsReady, setAppIsReady] = useState(false);
  const authCtx = useContext(AuthContext);
  const uniqueId = Application.getAndroidId();
  useEffect(() => {
    async function fetchInitialDb() {
      authCtx.authenticate(null);
      authCtx.saveUniqueId(uniqueId);
      try {
        const data = await init();
        if (!data) {
          Alert.alert(
            "Register",
            `No user match for this mobile. Register with following ID \n${uniqueId}`
          );
        }
      } catch (error) {
        console.error(error);
      }
      setAppIsReady(true);
    }
    fetchInitialDb();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync(); // Hide splash screen when ready
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }
  return <Navigation onLayout={onLayoutRootView} />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  navigtionContainer: {
    flex: 1,
  },
});
