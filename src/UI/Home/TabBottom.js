import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../Common/colors";
import { windowHeight, windowWidth } from "../../Common/dimentions";
import MyMotorWatch from "./MyMotorWatch";
const TabBottom = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const Dashboard = () => {
    return <View></View>;
  };

  const Task = () => {
    return <View></View>;
  };

  const Expand = () => {
    return <View></View>;
  };

  const HomeTemp = () => {
    return <View style={{ backgroundColor: "red" }}></View>;
  };

  const Search = () => {
    return <View></View>;
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          padding: 8,
          elevation: 5,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: windowHeight / 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashbord"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "aperture" : "aperture-outline"}
              size={30}
              color={colors.primary}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Task"
        component={Task}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "reader" : "reader-outline"}
              size={30}
              color={colors.primary}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Home"
        component={MyMotorWatch}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              resizeMode="contain"
              style={[styles.homeBottom]}
              source={require("../../../assets/iconLogo.png")}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="expand"
        component={Expand}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "expand" : "expand-outline"}
              size={30}
              color={colors.primary}
            />
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={30}
                color={colors.primary}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default memo(TabBottom);

const styles = StyleSheet.create({
  homeBottom: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -20,
    backgroundColor: colors.backgroundColor,
    borderRadius: 35,
  },
});
