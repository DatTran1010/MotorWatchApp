import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import colors from "../Common/colors";

const RadioButton = ({
  size = 22,
  label = "Chưa có label",
  selected,
  onSelected,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        activeOpacity={0.5}
        onPress={onSelected}
      >
        <View
          style={{
            width: size,
            height: size,
            borderColor: colors.primary,
            borderWidth: 1,
            borderRadius: 0.5 * size,
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selected && (
            <View
              style={{
                width: (75 / 100) * size,
                height: (75 / 100) * size,
                backgroundColor: colors.primary,
                borderRadius: (75 / 100) * size * 0.5,
              }}
            ></View>
          )}
        </View>
        <View style={styles.nameRadio}>
          <Text
            style={{ color: colors.black, fontSize: 16, fontWeight: "400" }}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  nameRadio: {
    flex: 3,
  },
});
