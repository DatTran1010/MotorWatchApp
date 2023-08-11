import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import colors from '../Common/colors';
import {windowHeight} from '../Common/dimentions';

const DropDown = ({
  data,
  placeholder,
  labelField,
  handleValue,
  valueField,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('-1');

  const renderLabel = () => {
    if (value != '' || focus) {
      return (
        <Text style={[styles.label, focus && {color: colors.primary}]}>
          {placeholder}
        </Text>
      );
    }
    return null;
  };

  return (
    // <View style={{ flex: 1 }}>
    //     {renderLabel()}
    //     <Dropdown
    //         style={[
    //             styles.dropdownStyle,
    //             {
    //                 borderColor: focus ? colors.primary : colors.border,
    //                 borderWidth: 1,
    //                 backgroundColor: colors.white,
    //             },
    //         ]}
    //         data={data}
    //         placeholderStyle={styles.placeholderDropDown}
    //         selectedTextStyle={styles.selectedDropDown}
    //         inputSearchStyle={styles.inputSearchStyle}
    //         iconStyle={styles.iconDropDownStyle}
    //         search
    //         maxHeight={300}
    //         labelField={labelField}
    //         valueField={valueField}
    //         placeholder={placeholder}
    //         searchPlaceholder="Search..."
    //         value={"-1"}
    //         onFocus={() => {
    //             setFocus(true);
    //         }}
    //         onBlur={() => {
    //             setFocus(false);
    //         }}
    //         onChange={() => {}}
    //     />
    // </View>
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          {borderColor: focus ? colors.primary : colors.border},
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
        onChange={item => handleValue(item)}
        {...props}
      />
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
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    backgroundColor: colors.backgroundColor,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.backgroundColor,
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: colors.black,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.black,
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
});
