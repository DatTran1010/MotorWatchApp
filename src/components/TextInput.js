import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import colors from '../Common/colors';
import {windowHeight} from '../Common/dimentions';

const CustomTextInput = ({placeholder, height, ...props}) => {
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
        ]}>
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
        />
      </View>
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
    marginBottom: 10,
    borderColor: colors.primary,
    borderWidth: 1,
  },

  text: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    color: colors.black,
  },
});
