import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import messaging from "@react-native-firebase/messaging";

import colors from "../../Common/colors";
import globalstyle from "../../Common/globalstyle";
import TextInput from "../../components/TextInput.js";
import Checkbox from "../../components/Checkbox";
import {
  windowWidth,
  windowHeight,
  heightTextInput,
} from "../../Common/dimentions";
import callApi from ".././../ConText/api.js";
import { MainConText } from "../../ConText/MainContext";
import {
  getToken,
  notificationListenr,
  onDisplayNotification,
  requestUserPermission,
} from "../../Common/notification";
import theme from "../../Common/theme";
import IconButton from "../../components/IconButton";
import FormButton from "../../components/button";
import Animated, { FadeIn } from "react-native-reanimated";

const LoginScreen = ({ navigation }) => {
  const { token, setToken } = useContext(MainConText);
  const [checkSavePassword, setCheckSavePassword] = useState(0);

  const [tokenDevies, setTokenDevies] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassWord] = useState("");

  const handleCheckedSavePassword = () => {
    setCheckSavePassword(!checkSavePassword);
  };

  const dispatch = useDispatch();

  const getTokenDevices = async () => {
    const newTokenDevies = await getToken();
    setTokenDevies(newTokenDevies);
  };

  const handleLogin = async () => {
    console.log(username, password, "token ===== " + tokenDevies);
    const endpoint = "/api/account/login";
    const method = "POST";
    const data = {
      employeeCode: username,
      password: password,
      token: tokenDevies,
    };

    const response = await callApi(dispatch, endpoint, method, data);

    console.log(response.data);
    try {
      if (response && response.data.statusCode == 200) {
        setToken(response.data.responseData.token);

        // save user info
        const userInfo = {
          EMAIL: response.data.responseData.email,
          HO_TEN: response.data.responseData.hO_TEN,
          MS_CN: response.data.responseData.mS_CONG_NHAN,
          MS_TO: response.data.responseData.mS_TO,
          NHOM_USER: response.data.responseData.nhoM_USER,
          SO_DTDD: response.data.responseData.sO_DTDD,
          TEN_DV: response.data.responseData.teN_DON_VI,
          TEN_TO: response.data.responseData.teN_TO,
          USER_NAME: response.data.responseData.userName,
          TOKEN: response.data.responseData.token,
          MS_DV: response.data.responseData.mS_DON_VI,
        };
        dispatch({ type: "SET_USER_INFO", payload: userInfo });

        navigation.navigate("Home");
        // Toast.show({
        //   type: "success",
        //   text1: "Thông báo",
        //   text2: "Đăng nhập thành công",
        // });

        dispatch({
          type: "SET_SHOW_TOAST",
          payload: {
            showToast: true,
            title: "Thông báo",
            body: "Đăng nhập thành công",
            type: "success",
          },
        });
      } else {
        dispatch({
          type: "SET_SHOW_TOAST",
          payload: {
            showToast: true,
            title: "Thông báo",
            body: response.data.message,
            type: "error",
          },
        });
      }
    } catch {
      dispatch({
        type: "SET_SHOW_TOAST",
        payload: {
          showToast: true,
          title: "Thông báo",
          body: "Đăng nhập không thành công",
          type: "error",
        },
      });
    }
  };

  //#region  Notification

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));

      onDisplayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListenr();
    getTokenDevices();
  }, []);

  //#endregion

  //#region  xử lý sự kiện handle

  const handleShowCamera = () => {
    dispatch({ type: "SET_SHOW_CAMERA", payload: true });
  };
  //#endregion

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={35}
    >
      <SafeAreaView
        style={globalstyle.droidSafeArea}
        onStartShouldSetResponder={() => {
          //   Keyboard.dismiss();
        }}
      >
        <Animated.View style={styles.container} entering={FadeIn}>
          <View
            style={{
              right: 5,
              top: -20,
              alignItems: "flex-end",
            }}
          >
            <IconButton
              nameicon={"scan-sharp"}
              border={false}
              size={30}
              onPress={handleShowCamera}
            />
          </View>
          <View style={styles.textLoginView}>
            <Image
              style={{
                width: windowWidth / 1.3,
                height: windowHeight / 8,
              }}
              source={require("../../../assets/LogoApp.png")}
            />

            {/* <SvgUri
              width="500"
              height="500"
              source={require("../../../assets/MotorWatch.svg")}
            /> */}
          </View>
          <View style={styles.containerLogin}>
            <View style={styles.loginCenter}>
              <View style={{ paddingHorizontal: 10 }}>
                <TextInput
                  placeholder={"Email"}
                  keyboardType="email-address"
                  value={username}
                  height={heightTextInput}
                  onChangeText={(value) => {
                    setUsername(value);
                  }}
                />
                <TextInput
                  placeholder={"Password"}
                  secureTextEntry
                  height={heightTextInput}
                  onChangeText={(value) => {
                    setPassWord(value);
                  }}
                  value={password}
                />
                <View style={styles.forgotPassword}>
                  <Checkbox
                    label="Lưu mật khẩu"
                    value={checkSavePassword}
                    onPress={handleCheckedSavePassword}
                  />
                  <TouchableOpacity>
                    <Text style={theme.font}>Quên mật khẩu ?</Text>
                  </TouchableOpacity>
                </View>

                <FormButton
                  buttonTitle={"ĐĂNG NHẬP"}
                  onPress={handleLogin}
                  activeOpacity={0.5}
                />
                {/* <TouchableOpacity onPress={handleLogin} activeOpacity={0.5}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 2, y: 0 }}
                    colors={colors.colorButton}
                    style={styles.btnLogin}
                  >
                    <Text style={styles.textbtnLogin}>ĐĂNG NHẬP</Text>
                  </LinearGradient>
                </TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.moreLogin}>
              <Text style={theme.font}>Or Login with social account</Text>
              <View style={styles.social}>
                <TouchableOpacity style={styles.iconSoial}>
                  <Ionicons name="logo-google" size={40} color="#de4d41" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconSoial}>
                  <Ionicons name="logo-facebook" size={40} color="#4867aa" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  areaStyle: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    width: window,
  },
  textLoginView: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  textLogin: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 100,
  },
  containerLogin: {
    flex: 8,
  },

  loginCenter: {
    flex: 1,
  },
  forgotPassword: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 40,
    flexDirection: "row",
  },

  textForgot: {
    fontWeight: "300",
    fontSize: 14,
    color: colors.black,
    fontFamily: theme.fontFamily,
  },

  textbtnLogin: {
    color: colors.white,
    fontWeight: "400",
    fontSize: 16,
    fontFamily: theme.fontFamily,
  },
  moreLogin: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  social: {
    flexDirection: "row",
  },
  iconSoial: {
    padding: 20,
  },
});
