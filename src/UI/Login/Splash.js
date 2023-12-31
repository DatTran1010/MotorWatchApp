import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react-native";
import { useDispatch } from "react-redux";
import colors from "../../Common/colors";
import { setShowSplash } from "../../Redux/appSlice";
const SplashScreen = () => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.backgroundColor,
        justifyContent: "center",
      }}
    >
      <Lottie
        source={require("../../../assets/MotorWatch.json")}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          dispatch(setShowSplash(false));
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
