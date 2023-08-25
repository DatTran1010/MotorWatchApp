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
import { useDispatch } from "react-redux";
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
  requestUserPermission,
} from "../../Common/notification";

const Login = ({ navigation }) => {
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
        navigation.navigate("Home");
        Toast.show({
          type: "success",
          text1: "Thông báo",
          text2: "Đăng nhập thành công",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: response.data.message,
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Đăng nhập không thành công",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListenr();
    getTokenDevices();
  }, []);

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
        <View style={styles.container}>
          <View style={styles.textLoginView}>
            <Image
              style={{
                width: windowWidth / 1.3,
                height: windowHeight / 8,
              }}
              source={require("../../../assets/LogoMotorWatch.jpg")}
            />
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
                    <Text style={styles.textForgot}>Quên mật khẩu ?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                  <Text style={styles.textbtnLogin}>LOGIN</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.moreLogin}>
              <Text style={styles.textMoreLogin}>
                Or Login with social account
              </Text>
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
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Login;

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
    fontSize: 16,
    color: colors.black,
  },

  btnLogin: {
    width: "100%",
    height: 50,
    backgroundColor: colors.buttoncolor,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  textbtnLogin: {
    color: colors.white,
    fontWeight: "400",
    fontSize: 16,
  },
  moreLogin: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textMoreLogin: {
    fontSize: 16,
    fontWeight: "300",
    color: colors.black,
  },

  social: {
    flexDirection: "row",
  },
  iconSoial: {
    padding: 20,
  },
});
