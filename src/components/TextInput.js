import React, { memo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";

import colors from "../Common/colors";
import { heightTextInput } from "../Common/dimentions";
import theme from "../Common/theme";

const CustomTextInput = ({
  placeholder,
  height = heightTextInput,
  value = "",
  onChangeText,
  ...props
}) => {
  const [focus, setFocus] = useState(0);
  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor: focus ? colors.primary : colors.border,
            height: height,
          },
        ]}
      >
        {value !== "" ? (
          <Text
            style={[
              styles.label,
              { color: focus ? colors.primary : colors.black },
            ]}
          >
            {placeholder}
          </Text>
        ) : (
          <></>
        )}

        <TextInput
          placeholder={placeholder}
          style={styles.text}
          placeholderTextColor="gray"
          {...props}
          onFocus={() => {
            setFocus(1);
          }}
          onBlur={() => {
            setFocus(0);
          }}
          onChangeText={(value) => onChangeText(value)}
          value={value}
        />
      </View>
    </>
  );
};

export default memo(CustomTextInput);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: "100%",
    borderRadius: 5,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    marginBottom: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },

  text: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
    padding: 5,
    fontFamily: theme.fontFamily,
  },
  label: {
    position: "absolute",
    backgroundColor: colors.backgroundColor,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: theme.fontFamily,
  },
});
