import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Drawer,
  TouchableRipple,
  Switch,
  Avatar,
  Title,
  Caption,
} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../Common/colors';

const DrawerContent = props => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const hanldeDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View style={{flex: 1}}>
      {/* <DrawerContentScrollView {...props}>
            </DrawerContentScrollView> */}

      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <Image
          source={require('../../../assets/Logo.png')}
          style={{width: '100%', height: 100}}
        />
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSelection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
              }}>
              <Avatar.Image
                source={{
                  uri: 'https://farm5.static.flickr.com/4029/35667852906_6ffb006961.jpg',
                }}
                size={50}
              />
              <View style={{marginLeft: 5}}>
                <Title style={styles.title}>Tấn Đạt</Title>
                <Caption style={styles.caption}>@vietsoft</Caption>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSelection}>
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="home-outline"
                size={25}
                color={colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="My Ecomaint"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="move-outline"
                size={25}
                color={colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Di chyển thiết bị"
          />
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="receipt-outline"
                size={25}
                color={colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Nghiệm thu phiếu bảo trì"
          />
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="timer-outline"
                size={25}
                color={colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Lịch sử phiếu bảo trì"
          />
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="git-pull-request-outline"
                size={25}
                color={colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Theo dõi yêu cầu bảo trì"
          />
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="construct-outline"
                size={25}
                color={colors.primary}
                style={{marginRight: -10}}
              />
            )}
            label="Dashboard"
          />
        </Drawer.Section>
        <Drawer.Section>
          <TouchableRipple onPress={hanldeDarkTheme}>
            <View style={styles.preference}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textColor,
                  fontWeight: 'bold',
                }}>
                Dark Theme
              </Text>
              <Switch color={colors.primary} value={isDarkTheme} />
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSelection}>
        <DrawerItem
          icon={(color, size) => (
            <Ionicons
              name="exit-outline"
              size={25}
              color={colors.primary}
              style={{marginRight: 15}}
            />
          )}
          label="Sing Out"
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginVertical: 5,
  },
  userInfoSelection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 14,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSelection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  bottomDrawerSelection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
