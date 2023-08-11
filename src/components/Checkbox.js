import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../Common/colors';

const Checkbox = ({
  value = false,
  size = 20,
  label = 'name checkbox',
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}
        activeOpacity={0.7}
        {...props}>
        <View
          style={[
            styles.checkboxStyle,
            {
              backgroundColor: value ? colors.primary : colors.white,
              width: size,
              height: size,
            },
          ]}>
          <Ionicons
            name="checkmark-outline"
            size={size - 5}
            color={colors.white}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{fontSize: 14, fontWeight: '400', color: colors.black}}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Checkbox;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxStyle: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
