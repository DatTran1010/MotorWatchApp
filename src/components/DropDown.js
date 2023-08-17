import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

import colors from "../Common/colors";
import { windowHeight } from "../Common/dimentions";

const DropDown = ({
  data,
  placeholder,
  labelField,
  handleValue,
  valueField,
  multiselected = false,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("-1");

  const renderLabel = () => {
    if (value != "" || focus) {
      return (
        <Text style={[styles.label, focus && { color: colors.primary }]}>
          {placeholder}
        </Text>
      );
    }
    return null;
  };

  const renderItem = (item, index) => {
    return (
      <View style={styles.item}>
        <Text
          style={[
            styles.textItem,
            { color: item[valueField] % 2 === 1 ? "red" : "blue" },
          ]}
        >
          {item[labelField]}
        </Text>
      </View>
    );
  };

  const [selected, setSelected] = useState([]);

  return (
    <View style={styles.container}>
      {renderLabel()}
      {!multiselected ? (
        <Dropdown
          style={[
            styles.dropdown,
            { borderColor: focus ? colors.primary : colors.border },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField={labelField}
          valueField={valueField}
          placeholder={!focus && placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(item, index) => handleValue(item)}
          renderItem={renderItem}
          {...props}
        />
      ) : (
        <MultiSelect
          style={[
            styles.dropdown,
            { borderColor: focus ? colors.primary : colors.border },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField={labelField}
          valueField={valueField}
          placeholder={""}
          searchPlaceholder="Search..."
          value={selected}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(item) => {
            setSelected(item);
          }}
          renderItem={renderItem}
          selectedStyle={{ borderRadius: 12 }}
          {...props}
        />
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  // dropdownStyle: {
  //     paddingHorizontal: 10,
  //     marginBottom: windowHeight / 60,
  //     height: windowHeight / 18,
  //     borderRadius: 5,
  //     shadowColor: "gray",
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 3.85,
  //     elevation: 5,
  // },
  // placeholderDropDown: {
  //     fontSize: 16,
  //     marginHorizontal: 15,
  //     fontWeight: "400",
  // },
  // selectedDropDown: { fontSize: 16 },
  // label: {
  //     position: "absolute",
  //     backgroundColor: "white",
  //     left: 22,
  //     top: 8,
  //     zIndex: 999,
  //     paddingHorizontal: 8,
  //     fontSize: 14,
  // },
  container: {},
  dropdown: {
    paddingHorizontal: 10,
    marginBottom: windowHeight / 60,
    height: windowHeight / 18,
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    backgroundColor: colors.backgroundColor,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: colors.backgroundColor,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
