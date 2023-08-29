import { Keyboard, View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

import Login from "./src/UI/Login";
import Home from "./src/UI/Home";
import DrawerContent from "./src/UI/Home/DrawerContent.js";
import ConTextProvider from "./src/ConText/MainContext";
import ModalUser from "./src/Common/ModalUser";
import Overlay from "./src/Common/Overlay";
import store from "./src/Redux/store";
import DetailsConsumtion from "./src/UI/Home/TieuHao/DetailsConsumtion";
import DetailsEngineState from "./src/UI/Home/EngineState/DetailsEngineState";
import DetailsOEE from "./src/UI/Home/OEE/DetailsOEE";
import ElictricPrice from "./src/UI/Work/ElectricPrice";
import WorkingMode from "./src/UI/Work/WorkingMode/WorkingMode";
import WorkPlan from "./src/UI/Work/WorkPlan/WorkPlan";
import WorkRealtime from "./src/UI/Work/WorkRealtime/WorkRealtime";
import colors from "./src/Common/colors";
import theme from "./src/Common/theme";
import Camerakit from "./src/UI/CMRKit";
import CameraComponent from "./src/components/CameraComponent";

export default function App() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  //Draw chung cho tất cả
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator drawerContent={(props) => DrawerContent(props)}>
        <Stack.Screen
          name="Home"
          component={StackNavigator}
          options={{
            headerShown: false,
            drawerIcon: true,
            headerTintColor: colors.white,
            title: "Home",
          }}
        />
        <Stack.Screen
          name="ElictricPrice"
          component={ElictricPrice}
          options={{
            headerShown: true,
            drawerIcon: true,
            headerTintColor: colors.white,
            headerTitle: () => (
              <Text style={theme.fontTitle}>ĐƠN GIÁ ĐIỆN</Text>
            ),
          }}
        />
        <Stack.Screen
          name="WorkingMode"
          component={WorkingMode}
          options={{
            title: "WorkingMode",
            headerShown: true,
            drawerIcon: true,
            headerTintColor: colors.white,
            headerTitle: () => (
              <Text style={theme.fontTitle}>CHẾ ĐỘ LÀM VIỆC</Text>
            ),
          }}
        />
        <Stack.Screen
          name="WorkPlan"
          component={WorkPlan}
          options={{
            title: "WorkPlan",
            headerShown: true,
            drawerIcon: true,
            headerTintColor: colors.white,
            headerTitle: () => (
              <Text style={theme.fontTitle}>KẾ HOẠCH LÀM VIỆC</Text>
            ),
          }}
        />
        <Stack.Screen
          name="WorkRealtime"
          component={WorkRealtime}
          options={{
            title: "WorkRealtime",
            headerShown: true,
            drawerIcon: true,
            headerTintColor: colors.white,
            headerTitle: () => (
              <Text style={theme.fontTitle}>DỮ LIỆU THỜI GIAN THỰC</Text>
            ),
          }}
        />
      </Drawer.Navigator>
    );
  };

  function StackNavigator() {
    return (
      <Stack.Navigator defaultScreenOptions={Home}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerTintColor: colors.white,
            headerTitle: () => (
              <Text style={theme.fontTitle}>My MotorWatch</Text>
            ),
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <ConTextProvider>
        <View
          style={{
            flex: 1,
          }}
          // onStartShouldSetResponder={() => {
          //     Keyboard.dismiss();
          // }}
        >
          <NavigationContainer>
            <Stack.Navigator defaultScreenOptions={Home}>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                  title: "Login",
                }}
              />
              <Stack.Screen
                name="Home"
                component={DrawerNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DetailsConsumtion"
                component={DetailsConsumtion}
                options={{ headerShown: true, headerTintColor: colors.white }}
              />
              <Stack.Screen
                name="DetailsEngineState"
                component={DetailsEngineState}
                options={{ headerShown: true, headerTintColor: colors.white }}
              />
              <Stack.Screen
                name="DetailsOEE"
                component={DetailsOEE}
                options={{ headerShown: true, headerTintColor: colors.white }}
              />

              <Stack.Screen
                name="Camerakit"
                component={Camerakit}
                options={{ headerShown: true, headerTintColor: colors.white }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <ModalUser />
          <Overlay />
          <Toast />
          <CameraComponent />
        </View>
      </ConTextProvider>
    </Provider>
  );
}
