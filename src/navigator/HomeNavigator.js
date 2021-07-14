/** @format */

import * as React from "react";
import { Platform, Image, Text, Dimensions } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../Constants/Colors";

import Home from "../../src/Home/Home";



import ClothesLists from "../ClothesLists/ClothesLists";

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const Stack = createStackNavigator();

const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.SKYBLUE : Colors.SKYBLUE,
  },
  headerTintColor: Platform.OS === "android" ? Colors.BLACK : Colors.BLACK,

  headerTitleStyle: {
    fontFamily: "Muli-Bold",
  },
  headerBackTitleVisible: false,
  headerBackTitleStyle: {
    fontFamily: "Muli",
  },
  headerTitle: (props) => <LogoTitle {...props} />,
  headerRight: (props) => <RightImage {...props} />,
};

function LogoTitle() {
  return (
    <Text
      style={{ color: Colors.TEALBLUE, fontSize: 3 * vh, textAlign: "left" }}
    >
      Clothes App
    </Text>
  );
}

function RightImage() {
  return (
    <Image
      style={{
        width: 5 * vh,
        height: 5 * vh,
        borderRadius: 2.5 * vh,
        marginRight: 3 * vw,
        marginBottom: 0.5 * vh,
      }}
      source={require("../../assets/icon.png")}
      resizeMode="cover"
    />
  );
}

const App = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultNavOptions}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />



        <Stack.Screen
          name="ClothesLists"
          component={ClothesLists}
          options={{ headerShown: true }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
