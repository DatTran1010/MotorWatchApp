import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../Common/colors";
import theme from "../Common/theme";

const Checkbox = ({
  value = false,
  size = 20,
  label = "name checkbox",
  isBackgroundColor = true,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
        activeOpacity={0.7}
        {...props}
      >
        <View
          style={[
            styles.checkboxStyle,
            {
              width: size,
              height: size,
              backgroundColor: isBackgroundColor
                ? value
                  ? colors.primary
                  : colors.white
                : colors.white,
            },
          ]}
        >
          <Ionicons
            name="checkmark-outline"
            size={size - 5}
            color={
              !isBackgroundColor
                ? value
                  ? colors.primary
                  : colors.white
                : colors.white
            }
          />
        </View>
        <View style={{ marginLeft: 10, flexShrink: 1 }}>
          <Text style={theme.font}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Checkbox;
const styles = StyleSheet.create({
  container: {},
  checkboxStyle: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
