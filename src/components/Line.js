import {View, Text} from 'react-native';
import React from 'react';
import colors from '../Common/colors';
const Line = () => {
  return (
    <View
      style={{
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        marginVertical: 8,
      }}></View>
  );
};

export default Line;
