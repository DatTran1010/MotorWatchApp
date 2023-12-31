import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Drawer,
  TouchableRipple,
  Switch,
  Avatar,
  Title,
  Caption,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

import colors from "../../Common/colors";
import theme from "../../Common/theme";

const DrawerContent = (props) => {
  const userInfo = useSelector((state) => state.app.userInfo);

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const hanldeDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <DrawerContentScrollView {...props}>
            </DrawerContentScrollView> */}

      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <Image
          source={require("../../../assets/LogoMotorWatch.jpg")}
          style={{ width: "100%", height: 100 }}
        />
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSelection}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
              }}
            >
              {/* <Avatar.Image
                source={{
                  uri: "https://farm5.static.flickr.com/4029/35667852906_6ffb006961.jpg",
                }}
                size={50}
              /> */}
              <View style={{ marginLeft: 5 }}>
                <Title style={styles.title}>{userInfo.HO_TEN}</Title>
                <Caption style={styles.caption}>{userInfo.NHOM_USER}</Caption>
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
                style={{ marginRight: -10 }}
              />
            )}
            label="My MotorWatch"
            labelStyle={theme.font}
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          {/* <DrawerItem
                        icon={(color, size) => (
                            <Ionicons
                                name="move-outline"
                                size={25}
                                color={colors.primary}
                                style={{ marginRight: -10 }}
                            />
                        )}
                        label="Đơn giá điện"
                        labelStyle={theme.font}
                        onPress={() => {
                            props.navigation.navigate("ElictricPrice");
                        }}
                    /> */}
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="receipt-outline"
                size={25}
                color={colors.primary}
                style={{ marginRight: -10 }}
              />
            )}
            label="Chế độ làm việc"
            labelStyle={theme.font}
            onPress={() => {
              props.navigation.navigate("WorkingMode");
            }}
          />
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="timer-outline"
                size={25}
                color={colors.primary}
                style={{ marginRight: -10 }}
              />
            )}
            label="Kế hoạch làm việc"
            labelStyle={theme.font}
            onPress={() => {
              props.navigation.navigate("WorkPlan");
            }}
          />
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="git-pull-request-outline"
                size={25}
                color={colors.primary}
                style={{ marginRight: -10 }}
              />
            )}
            label="Dữ liệu thời gian thực"
            labelStyle={theme.font}
            onPress={() => {
              props.navigation.navigate("WorkRealtime");
            }}
          />
          <DrawerItem
            icon={(color, size) => (
              <Ionicons
                name="mail-outline"
                size={25}
                color={colors.primary}
                style={{ marginRight: -10 }}
              />
            )}
            label="Yêu cầu gửi báo cáo"
            labelStyle={theme.font}
            onPress={() => {
              props.navigation.navigate("RequestReport");
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <TouchableRipple onPress={hanldeDarkTheme}>
            <View style={styles.preference}>
              <Text style={theme.font}>Dark Theme</Text>
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
              style={{ marginRight: 15 }}
            />
          )}
          label="Đăng xuất"
          labelStyle={theme.font}
          onPress={() => {
            props.navigation.navigate("Login");
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
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  selection: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSelection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  bottomDrawerSelection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
