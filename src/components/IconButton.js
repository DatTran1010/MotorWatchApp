import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useState, memo } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../Common/colors";
import theme from "../Common/theme";

const IconButton = ({
  label,
  nameicon,
  size,
  colorIcon = colors.primarySecond,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLongPressIcon = () => {
    setShowTooltip(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handlePressOut = () => {
    setShowTooltip(false);
  };
  return (
    <View>
      <TouchableOpacity
        onPressOut={handlePressOut}
        onLongPress={handleLongPressIcon}
        style={[styles.iconStyle]}
        {...props}
      >
        <Ionicons name={nameicon} size={size} color={colorIcon} />
      </TouchableOpacity>
      {showTooltip && (
        <Animated.View style={styles.toltipContainer}>
          <Text style={theme.font}>{label}</Text>
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

    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    marginHorizontal: 5,
  },
});
