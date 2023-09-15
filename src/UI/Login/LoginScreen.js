import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
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
import * as asyncStorageItem from "../../Common/asyncStorageItem";
import {
  setNotiferApp,
  setShowCamera,
  setShowToast,
  setUserInfo,
} from "../../Redux/appSlice";
import * as authenServices from "../../apiServices/authenServices";

const LoginScreen = ({ navigation }) => {
  const dataSaveUser = useSelector((state) => state.app.dataSaveUser);

  const { token, setToken } = useContext(MainConText);
  const [checkSavePassword, setCheckSavePassword] = useState(
    dataSaveUser[0].check
  );

  const [tokenDevies, setTokenDevies] = useState("");
  const [username, setUsername] = useState(dataSaveUser[0].username);
  const [password, setPassWord] = useState(dataSaveUser[0].password);

  const handleCheckedSavePassword = () => {
    setCheckSavePassword(!checkSavePassword);
  };

  const dispatch = useDispatch();

  const getTokenDevices = async () => {
    const newTokenDevies = await getToken();
    setTokenDevies(newTokenDevies);
  };

  //#region  Notification
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));

      //data notification hiện tại
      const dataNotification = [
        {
          date: Date.now(),
          titile: remoteMessage.notification.title,
          body: remoteMessage.notification.body
            .toString()
            .replace("<br>", "\n"),
          seen: false,
        },
      ];

      // lấy data notification cũ ra
      const resultDataNotification = await asyncStorageItem.getItem(
        "DATA_NOTIFICATION"
      );

      if (resultDataNotification != "") {
        //lấy dữ liệu hiện có trên storegate
        // convert JSON -> ARAY
        const reslut = JSON.parse(resultDataNotification);
        if (reslut.length > 9) {
          reslut.pop();
        }
        // tạo ra 1 clone
        const newData = [...reslut];

        // push giá trị vào data vừa nhận
        newData.unshift(dataNotification[0]);
        dispatch(setNotiferApp(newData));
        //convert giá trị về json
        // convert ARAY -> JSON
        const dataNotifi = JSON.stringify(newData);

        // set lại data lên storegate
        // console.log("DATA NOTIFICATION", dataNotifi);
        await asyncStorageItem.setItem("DATA_NOTIFICATION", dataNotifi);
        // const res = await asyncStorageItem.deleteItem("DATA_NOTIFICATION");
        //  if (reslut.length > 10) {
        //    const res = await asyncStorageItem.deleteItem("DATA_NOTIFICATION");
        //    if (res === 1) {
        //      console.log("Xóa thành công");
        //    }
        //  }

        // NẾU CHƯA CÓ THÔNG BÁO NÀO HOẶC (MỚI CÀI APP)
      } else {
        dispatch(setNotiferApp(dataNotification));

        const dataNotifi = JSON.stringify(dataNotification);

        console.log("DATA NOTIFICATION", dataNotifi);
        await asyncStorageItem.setItem("DATA_NOTIFICATION", dataNotifi);
      }

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
    dispatch(setShowCamera(true));
  };

  const handleLogin = async () => {
    const baseURL = await asyncStorageItem.baseURL();
    if (baseURL === "") {
      dispatch(
        setShowToast({
          showToast: true,
          title: "Chưa có URL",
          body: "Chưa có mã URL. Vui lòng nhập mã URL để đăng nhập",
          type: "warning",
        })
      );
    } else {
      console.log(username, password, "token ===== " + tokenDevies);

      const response = await authenServices.login(
        dispatch,
        username,
        password,
        tokenDevies
      );

      console.log(response.responseData);
      try {
        if (response && response.statusCode == 200) {
          setToken(response.responseData.token);

          // save user info
          const userInfo = {
            EMAIL: response.responseData.email,
            HO_TEN: response.responseData.hO_TEN,
            MS_CN: response.responseData.mS_CONG_NHAN,
            MS_TO: response.responseData.mS_TO,
            NHOM_USER: response.responseData.nhoM_USER,
            SO_DTDD: response.responseData.sO_DTDD,
            TEN_DV: response.responseData.teN_DON_VI,
            TEN_TO: response.responseData.teN_TO,
            USER_NAME: response.responseData.userName,
            TOKEN: response.responseData.token,
            MS_DV: response.responseData.mS_DON_VI,
          };
          dispatch(setUserInfo(userInfo));

          // NẾU ĐĂNG NHẬP THÀNH CÔNG VÀ CÓ CHECK LƯU MẬT KHẨU
          if (checkSavePassword) {
            const dataSavePassword = [
              { check: true, username: username, password: password },
            ];
            const JData = JSON.stringify(dataSavePassword);
            await asyncStorageItem.setItem("SAVE_USER", JData);
          }

          navigation.navigate("Home");

          // dispatch(
          //   setShowToast({
          //     showToast: true,
          //     title: "Thông báo",
          //     body: "Đăng nhập thành công",
          //     type: "success",
          //   })
          // );
        } else {
          dispatch(
            setShowToast({
              showToast: true,
              title: "Thông báo",
              body: response.data.message,
              type: "error",
            })
          );
        }
      } catch {
        dispatch(
          setShowToast({
            showToast: true,
            title: "Thông báo",
            body: "Đăng nhập không thành công",
            type: "error",
          })
        );
      }
    }
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
              alignItems: "flex-end",
              flex: 1,
            }}
          >
            {/* <Ionicons name="scan-outline" size={40} color="#4867aa" /> */}
            <IconButton
              nameicon={"scan-outline"}
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
          </View>
          <View style={styles.containerLogin}>
            <View style={styles.loginCenter}>
              <View style={{ paddingHorizontal: 10, flex: 2 }}>
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
                <FormButton buttonTitle={"ĐĂNG NHẬP"} onPress={handleLogin} />
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
