import { Keyboard, View } from "react-native";
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
                        title: "Home",
                        headerShown: false,
                        drawerIcon: true,
                    }}
                />
                <Stack.Screen
                    name="ElictricPrice"
                    component={ElictricPrice}
                    options={{
                        title: "ElictricPrice",
                        headerShown: true,
                        drawerIcon: true,
                    }}
                />
                <Stack.Screen
                    name="WorkingMode"
                    component={WorkingMode}
                    options={{
                        title: "WorkingMode",
                        headerShown: true,
                        drawerIcon: true,
                    }}
                />
                <Stack.Screen
                    name="WorkPlan"
                    component={WorkPlan}
                    options={{
                        title: "WorkPlan",
                        headerShown: true,
                        drawerIcon: true,
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
                    options={{ headerShown: true, title: "My Ecomaint" }}
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
                            {/* <Stack.Screen
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
                                options={{ headerShown: true }}
                            />
                            <Stack.Screen
                                name="DetailsEngineState"
                                component={DetailsEngineState}
                                options={{ headerShown: true }}
                            />
                            <Stack.Screen
                                name="DetailsOEE"
                                component={DetailsOEE}
                                options={{ headerShown: true }}
                            /> */}
                            <Stack.Screen
                                name="WorkRealtime"
                                component={WorkRealtime}
                                options={{ headerShown: true }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                    <ModalUser />
                    <Overlay />
                    <Toast />
                </View>
            </ConTextProvider>
        </Provider>
    );
}
