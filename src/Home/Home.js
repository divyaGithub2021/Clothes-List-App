/** @format */

import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../Constants/Colors";

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

export default function Home(props) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={styles.background}
      >
        <View style={styles.mainView}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.logoImg}
            resizeMode="cover"
          ></Image>


          <TouchableOpacity
            style={styles.paybtn}
            onPress={() => props.navigation.navigate("ClothesLists")}
          >
            <LinearGradient
              style={styles.gradient}
              colors={["#46aeff", "#5884ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.payText}>Show Clothes List</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  payText: { color: "white", fontSize: 3 * vh, fontFamily: "Muli-Bold" },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2 * vh,
    padding: 2 * vh
  },
  paybtn: {
    marginTop: 20 * vh,

    padding: 2 * vh,
    height: 10 * vh,
    alignItems: "center",
    justifyContent: "center",
  },
  callBtn: {
    backgroundColor: "white",
    height: 8 * vh,
    width: 8 * vh,
    borderRadius: 4 * vh,
    marginHorizontal: 3 * vw,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0.3 * vh,
    },
    shadowRadius: 2 * vh,
    shadowOpacity: 0.5,
    elevation: 2 * vh,
    padding: 1.2 * vh,
  },
  contactView: {
    marginTop: 8 * vh,
    height: 20 * vh,
    width: 100 * vw,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  trackBtn: {
    borderRadius: 5 * vh,
    backgroundColor: "#3A59FF",
    width: 75 * vw,
    height: 7 * vh,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20 * vh,
  },

  logoImg: {
    marginTop: 8 * vh,
    height: 20 * vh,
    width: 20 * vh,
    borderRadius: 10 * vh,
  },
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5 * vh,
  },
  wrapper: {
    marginTop: 6 * vh,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.primaryColor
  },
  logo: {
    width: 90 * vw,
    height: 32 * vh,
    borderRadius: 2 * vh,
  },
  text: {
    color: "white",
    marginHorizontal: 1.5 * vw,
    fontSize: 3.5 * vh,
    fontFamily: "Muli-Bold",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8 * vh,
    textAlign: "center",
  },

});
