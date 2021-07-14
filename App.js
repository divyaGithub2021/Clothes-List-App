import React, { useState } from "react";
import { Dimensions } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import store from "./src/store/store";
import { Provider } from "react-redux";

import HomeNavigator from "./src/navigator/HomeNavigator";

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const fetchFonts = (props) => {
  return Font.loadAsync({
    "Muli": require("./assets/fonts/Muli-Regular.ttf"),
    "Muli-Bold": require("./assets/fonts/Muli-Bold.ttf"),
    "Muli-ExtraBold": require("./assets/fonts/Muli-ExtraBold.ttf"),
  });
};

export default function App(props) {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <HomeNavigator />
    </Provider>
  );
}
