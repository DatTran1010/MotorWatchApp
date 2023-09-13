import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

import colors from "../Common/colors";
import { windowHeight } from "../Common/dimentions";
import { memo } from "react";
import theme from "../Common/theme";

const DropDown = ({
  data = [],
  value = "",
  placeholder,
  labelField,
  handleValue,
  valueField,
  multiselected = false,
  onSubmitSelected,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  const renderLabel = () => {
    if (value != "") {
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
            {
              color:
                item["color"] !== undefined && item["color"] !== null
                  ? item["color"]
                  : colors.black,
            },
          ]}
        >
          {item[labelField]}
        </Text>
      </View>
    );
  };

  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedText, setSelectedText] = useState("");

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
          onBlur={() => {
            setFocus(false);
          }}
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
          placeholder={selectedText}
          searchPlaceholder="Search..."
          value={selectedValue}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            onSubmitSelected(selectedValue);
            setFocus(false);
          }}
          onChange={(item) => {
            setSelectedValue(item);

            const newData = data.filter((value) => item.includes(value.value));
            const newData2 = newData.map((textItem) => textItem.lable);
            setSelectedText(newData2.join(" , "));
          }}
          renderItem={renderItem}
          selectedStyle={{ borderRadius: 12 }}
          {...props}
        />
      )}
    </View>
  );
};

export default memo(DropDown);

const styles = StyleSheet.create({
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
    zIndex: 999,
    position: "absolute",
    backgroundColor: colors.backgroundColor,
    left: 10,
    top: -8,
    paddingHorizontal: 8,
    fontSize: theme.fontSize,
    fontFamily: theme.fontFamily,
    color: colors.black,
  },
  placeholderStyle: {
    fontSize: theme.fontSize,
  },
  selectedTextStyle: {
    fontSize: theme.fontSize,
    color: colors.black,
    fontFamily: theme.fontFamily,
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
    fontSize: theme.fontSize,
    fontFamily: theme.fontFamily,
  },
});
