import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../Common/colors";

const IconButton = ({ label, nameicon, size, border = true, ...props }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLongPressIcon = () => {
    setShowTooltip(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handlePressOut = () => {
    setShowTooltip(false);
  };
  return (
    <View style={{ position: "relative", flexDirection: "row" }}>
      <TouchableOpacity
        onPressOut={handlePressOut}
        onLongPress={handleLongPressIcon}
        style={[styles.iconStyle, { borderWidth: border ? 0.5 : 0 }]}
        {...props}
      >
        <Ionicons name={nameicon} size={size} color={colors.primary} />
      </TouchableOpacity>
      {showTooltip && (
        <Animated.View style={styles.toltipContainer}>
          <Text style={{ color: colors.black }}>{label}</Text>
        </Animated.View>
      )}
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  toltipContainer: {
    position: "absolute",
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
    top: -50, // Change this value based on your design
    right: -20,
  },
  iconStyle: {
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    marginHorizontal: 5,
  },
});
