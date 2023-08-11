import React, {useEffect, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Modal} from 'react-native';

import colors from '../../Common/colors';
import {MainConText} from '../../ConText/MainContext';

const HeaderApp = ({navigation, title, headerLeftVisible, goBack = false}) => {
  const {setModalVisibleUser} = useContext(MainConText);
  const handleInfo = () => {
    return setModalVisibleUser(true);
  };
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      title: title,
      headerLeft: () =>
        headerLeftVisible &&
        (goBack ? (
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color={colors.black}
            style={{marginLeft: 15}}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Ionicons
            name="reorder-three"
            size={40}
            color={colors.black}
            style={{marginRight: 15}}
            onPress={() => navigation.openDrawer()}
          />
        )),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons
            name="notifications"
            size={30}
            color={colors.black}
            style={{marginRight: 15}}
            onPress={() => {}}
          />
          <Ionicons
            name="person-circle-outline"
            size={30}
            color={colors.black}
            style={{marginRight: 15}}
            onPress={handleInfo}
          />
        </View>
      ),
      headerStyle: {backgroundColor: colors.primary},
    });
  }, [navigation]);
  return null;
};

export default HeaderApp;
