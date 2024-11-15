import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../Common/dimentions";
import colors from "../Common/colors.js";
import theme from "../Common/theme";
import LinearGradient from "react-native-linear-gradient";
const FormButton = ({
  buttonTitle,
  colorButton = colors.colorButton,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[theme.shadow, { borderRadius: 5 }]}
      {...props}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 0 }}
        colors={colorButton}
        style={[styles.buttonContainer]}
      >
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    fontFamily: theme.fontFamily,
  },
});
